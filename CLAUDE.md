# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

QE Live — a healing gear/stat modelling tool for World of Warcraft (Retail + Classic), served at questionablyepic.com/live. Create React App (react-scripts 5) + TypeScript + Redux + MUI v5. Node 16.8.0 (`.tool-versions`, for mise/asdf).

## Commands

```bash
npm start                # dev server on :3000 (runs with --max_old_space_size=4096)
npm run build            # production build (needs 6GB heap; CI sets CI=false to ignore warnings)
npm run build:dev        # PTR/staging build, uses .env.ptr via env-cmd
npm run build:prod       # production build, uses .env via env-cmd
npm test                 # Jest in watch mode

# Single test file / single test
npx react-scripts test --watchAll=false --testPathPattern="EffectUtilities"
npx react-scripts test --watchAll=false --testPathPattern="DiscPriestRamps" -t "Ramp name"
```

There is no `npm run lint` script despite the eslint config; lint runs through react-scripts during `start`/`build`.

Imports are absolute from `src` (`tsconfig.json` `baseUrl: "./src"`), e.g. `import { CONSTANTS } from "General/Engine/CONSTANTS"`. Relative imports also appear throughout — both work.

## Branches & CI

- PRs to `dev` or `master` run `npm test` only (`.github/workflows/tests.yml`).
- Push to `master` → build + rsync deploy to live (`build.yml`).
- Push to `staging` → `build:dev` + rsync deploy to the PTR site (`staging.yml`).

## Architecture

### The two game types

Nearly every engine path forks on `gameType: "Retail" | "Classic"`. Retail-only logic lives in `src/Retail/`, Classic-only in `src/Classic/`, and anything shared (Player, Items, TopGear, UpgradeFinder, all UI) lives in `src/General/` with internal branching. Classic specs are named `"<Spec> Classic"` (e.g. `"Holy Priest Classic"`) — `Player` normalizes legacy `"BC"` suffixes to `"Classic"`.

### Player → CastModel → evaluation

`General/Modules/Player/Player.js` is the central mutable domain object: spec, race, `activeItems: Item[]`, `activeStats`, talents, and a list of `castModels`. `PlayerChars.ts` manages the set of saved characters and localStorage persistence.

`General/Modules/Player/CastModel.js` is the big dispatch point: given a spec + `contentType` ("Raid" | "Dungeon") + `modelID` (hero-talent build name, e.g. "Totemic", "Farseer", "Oracle", "Herald of the Sun"), it wires up the spell list, special queries, base stat weights, talents, and optionally a `runCastModel` function from that spec's `ClassDefaults/<Spec>/` folder. **Adding or changing a spec build almost always means editing CastModel.js plus that spec's ClassDefaults directory.**

Each model declares `modelType[contentType]`, one of `MODEL_TYPES` in `General/Engine/CONSTANTS.ts`, and `TopGearEngine` branches on it to pick the evaluation path:

| modelType | Path | Used by |
|---|---|---|
| `"Default"` | Pure stat weights (`scoreItem` in ItemUtilities) | most Dungeon models, Classic |
| `"CastModel"` | Runs `castModel.runCastModel(setStats, playerData, settings)` — a cast-profile simulation returning healing | Shaman, Evoker, Druid, Monk, Disc Oracle |
| `"Sequences"` | Runs a full timeline ramp sim (`evalDiscRamp`) | Discipline Priest ramps |

The cast-profile machinery is shared in `ClassDefaults/Generic/`: `ProfileUtilities.js` (`getSpellThroughput`, `completeCastProfile`, `convertStatPercentages`), `RampBase.js` (timeline state, stat scaling, RNG), `APLBase.js` (cast conditions), `BuffBase.js`, `TalentBase.ts`. Spec spell data lives in per-spec `*SpellDB.json`/`.js` files typed by `SpellData` in `src/globalTypes.d.ts`.

### Effect engine

`Retail/Engine/EffectFormulas/EffectEngine.js` `getEffectValue()` is a pure router: it takes an `ItemEffect` (`{type, name}`) plus player/castModel/contentType/itemLevel/settings and dispatches to trinket, embellishment, generic-special, set-bonus, or spec-specific formula files. Retail and Classic both route through it. Spec set bonuses go to `ClassDefaults/<Spec>/<Spec>SpecEffects.js`; trinkets to `Generic/Trinkets/`; embellishments to `Generic/Embellishments/`. Shared math helpers (PPM→uptime, diminishing returns, `getSetting`, item-level scalar tables) are in `Retail/Engine/EffectFormulas/EffectUtilities.js`.

Effects always return a `bonus_stats` object, never a score — scoring happens upstream.

### Items

`General/Items/Item.ts` is the runtime item (id, level, slot, sockets, gems, tertiary, effect, upgrade track, catalyst state, flags). Stats are computed, not stored in the DB per-ilvl: `ItemUtilities.calcStatsAtLevel()` combines `getItemAllocations()` (from `Databases/ItemDB.json`) with `Retail/Engine/RandPropPointsBylevel.ts` and `CombatMultByLevel.ts`. Items enter the app via `General/Items/GearImport/SimCImportEngine.ts` (SimC strings), `ClassicImportEngine.js`, or the Blizzard armory API.

### Top Gear

`TopGear/Engine/TopGearEngine.ts` builds every viable set (one item per slot, discarding unique/legendary clashes), then evaluates each via the modelType paths above. It runs off the main thread: `TopGearEngineShared.js` `createTopGearWorker()` spawns `TopGearWorker.js`, which dynamically imports the Retail or Classic engine. Because the player crosses a worker boundary, `setupPlayer()` reconstructs a `Player` from the stripped copy — functions do not survive postMessage, so anything the engine needs must be plain data or re-derived.

`CONSTRAINTS.ts` caps the number of selectable items (`topGearMaxItems: 32`) to keep the combinatorics tractable, and `topGearDifferentials` controls how many competitive alternatives get reported.

### State

Redux (`src/Redux/`) holds only four things: `gameType`, `contentType`, `playerSettings`, `patronStatus`, all mirrored to localStorage via `local-storage`. Everything else is component state or lives on the `Player` object. `playerSettings` entries are `{value, options, category, type, gameType}` records that auto-render in `Modules/Settings/`; read them in engines with `getSetting(settings, "key")`.

Routing is in `src/App.tsx` (react-router-dom v5) — one route per tool (`/topgear`, `/upgradefinder`, `/trinkets`, `/embellishments`, `/quickcompare`, `/spelldata`, …).

## Patch / season updates

New-season work concentrates in a few files:
- `General/Engine/CONSTANTS.ts` — `seasonalItemConversion`, `currentRaidIDs`, `currentDungeonIDs`, `fullItemLevels`, `itemLevelCaps`, `seasonID`, `tierSetIDs`.
- `Databases/ItemDB.json`, `ItemNameDB.json`, `InstanceDB.ts`, `GemDB.ts`, `EmbellishmentDB.ts`.
- `Retail/Engine/EffectFormulas/Generic/Trinkets/` for new trinket formulas; `Generic/PatchEffectItems/` for one-off patch mechanics (Cyrce's Circlet, Omnium Folio, Onyx Annulet) which usually also get a dedicated UI under `Modules/PatchEffectAnalysis/`.
- `CONSTRAINTS.ts` for item level bounds.

## Testing

Jest via react-scripts (`--env=jsdom`). Tests sit next to the code they cover. Two dominant styles:
- **Spell value tests** (`*SpellTests.test.js`) — `jest-each` tables of `spellName | expectedResult | index` checking formula output against in-game tooltip values within a small error margin.
- **Engine tests** (`TopGearEngine.test.js`, `TrinketData.test.js`, `EffectData.test.js`, `*Ramps.test.js`) — run the real engine over fixture sets.

Some tables are intentionally soft-asserted (`expect(0).toEqual(0)`) while a formula is being reworked; don't assume a passing spell test is actually asserting.

`.test.js.future` files are parked and not run.

## Conventions worth knowing

- Localization: user-facing strings go through i18next (`src/locale/`, languages en/de/fr/cn/ru). Item names are translated via `getTranslatedItemName(id, lang, effect, gameType)`, not hardcoded.
- Errors from engine code use `reportError(player, type, message, result)` from `General/SystemTools/ErrorLogging/ErrorReporting` rather than throwing — it POSTs to the QE backend in production and `console.error`s in dev/test.
- TypeScript is `strict` but on TS 3.9, and much of the engine is still `.js` — mixed TS/JS in the same directory is normal, and `.js` engine files are imported from `.ts` freely.
- Archived-but-kept code lives in `Archive/` subfolders under spec directories; it is dead code, not a fallback.
