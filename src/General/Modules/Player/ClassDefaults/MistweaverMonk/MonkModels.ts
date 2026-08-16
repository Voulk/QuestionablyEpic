import { scoreMonkYulonSet, scoreMonkChijiSet, scoreMonkDungeonSet } from "./MistweaverCastProfile";
import { monkDefaultSpecialQueries, monkDefaultSpellData, monkDefaultStatWeights, MONK_HERO_TREES, monkTalentStrings } from "./MonkDefaults";
import { modelChijiOnUseTrinket, chijiSpecialQueries, chijiSpellData, chijiStatWeights } from "./MonkChiji";
import { MODEL_TYPES } from "General/Engine/CONSTANTS";

// technically `any` given JS built but explicitly typed for clarity
// maybe moved into a common file for other classes to use
export interface ModelConfig {
    modelName?: string;
    heroTree: string;
    modelType: string;
    talents: string;
    runCastModel: (stats: any, playerData: any, settings?: any, reporting?: boolean) => any;
    spellData: (contentType: string) => any;
    specialQueries: (contentType: string) => any;
    statWeights: (contentType: string) => any;
    onUseTrinket?: (...args: any[]) => any;
}

export const monkModels: Record<string, ModelConfig> = {
    "Yu'lon": {
        heroTree: MONK_HERO_TREES.CONDUIT,
        modelType: MODEL_TYPES.CAST_MODEL,
        talents: monkTalentStrings["Yu'lon"],
        runCastModel: scoreMonkYulonSet,
        spellData: monkDefaultSpellData,
        specialQueries: monkDefaultSpecialQueries,
        statWeights: monkDefaultStatWeights,
    },
    "Chi-Ji": {
        heroTree: MONK_HERO_TREES.CONDUIT,
        modelType: MODEL_TYPES.CAST_MODEL,
        talents: monkTalentStrings["Chi-Ji"],
        runCastModel: scoreMonkChijiSet,
        spellData: chijiSpellData,
        specialQueries: chijiSpecialQueries,
        statWeights: chijiStatWeights,
        onUseTrinket: modelChijiOnUseTrinket,
    },
    "Dungeon Default": {
        heroTree: MONK_HERO_TREES.CONDUIT,
        modelType: MODEL_TYPES.DEFAULT,
        talents: monkTalentStrings["Dungeon Default"],
        runCastModel: scoreMonkDungeonSet,
        spellData: monkDefaultSpellData,
        specialQueries: monkDefaultSpecialQueries,
        statWeights: monkDefaultStatWeights,
    },
};
