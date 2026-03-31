# QE Live

QE Live is a healing simulator and gear analysis tool for World of Warcraft. It helps healers evaluate gear, trinkets, and stat weights across all healer specializations for both Retail and Classic.

**Live site:** [questionablyepic.com](https://questionablyepic.com)

## Features

- **Top Gear** — rank your entire bag and find the best gear combination
- **Upgrade Finder** — see what upgrades exist from current content and how much they're worth
- **Trinket Analysis** — compare trinket performance at any item level
- **Embellishment Analysis** — evaluate crafted gear and embellishments
- **Stat Weights** — calculate stat weights for your current gear and talents
- **Support for all healer specs** — Restoration Druid, Holy Paladin, Discipline Priest, Holy Priest, Mistweaver Monk, Restoration Shaman, Preservation Evoker, and all Classic healers

## Running Locally

**Requirements:** Node 16.8.0 (see `.tool-versions` for [mise](https://mise.jdx.dev/) / [asdf](https://asdf-vm.com/))

```bash
npm install
npm start
```

The app runs at `http://localhost:3000` with hot reload.

### Running Tests

```bash
npm test
```

Runs Jest in watch mode. Press `a` to run all tests, `q` to quit.

To run a specific test file:

```bash
npx react-scripts test --watchAll=false --testPathPattern="EffectUtilities"
```

## Project Structure

```
src/
├── General/                  # Shared logic across Retail and Classic
│   ├── Engine/               # Core utilities (stat conversions, item calculations)
│   │   ├── STAT.ts           # Stat conversion rates, DR breakpoints, mastery multipliers
│   │   ├── CONSTANTS.ts      # Game constants (difficulties, item level caps, tier names)
│   │   ├── SPECS.ts          # Spec definitions and identifiers
│   │   └── ItemUtilities.ts  # Item stat calculations, filtering, slot logic
│   ├── Items/                # Gear import (SimC strings, Blizzard armory)
│   ├── Modules/
│   │   ├── Player/
│   │   │   └── ClassDefaults/  # Per-spec spell data, ramp sequences, and defaults
│   │   │       ├── DisciplinePriest/
│   │   │       ├── HolyPaladin/
│   │   │       ├── HolyPriest/
│   │   │       ├── MistweaverMonk/
│   │   │       ├── PreservationEvoker/
│   │   │       ├── RestoDruid/
│   │   │       ├── RestoShaman/
│   │   │       └── Classic/
│   │   ├── TopGear/          # Top Gear engine and UI
│   │   ├── UpgradeFinder/    # Upgrade Finder engine and UI
│   │   ├── TrinketAnalysis/  # Trinket comparison tool
│   │   └── Settings/         # User settings and preferences
│   └── SystemTools/          # Error reporting, analytics helpers
│
├── Retail/                   # Retail-specific sim engine
│   └── Engine/
│       ├── EffectFormulas/   # Trinket and effect value calculations
│       │   ├── EffectUtilities.js   # Shared formula helpers (PPM, DR, stat lookups)
│       │   └── Generic/             # Generic trinket and embellishment data
│       ├── CombatMultByLevel.ts     # Stat scaling multipliers per item level
│       └── RandPropPointsBylevel.ts # Random prop point tables
│
├── Classic/                  # Classic-specific sim engine and effect data
│
├── Redux/                    # Global state (actions, reducers)
├── Databases/                # Static item and spell databases
└── locale/                   # i18n translation files (en, de, fr, cn, ru)
```

## Tech Stack

- **React 18** with TypeScript
- **Redux** for state management
- **Material UI (MUI) v5** for components
- **Recharts** for data visualization
- **Jest** + **React Testing Library** for tests
- **i18next** for internationalization
