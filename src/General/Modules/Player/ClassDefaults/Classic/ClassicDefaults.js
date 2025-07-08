
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "General/Modules/Player/ClassDefaults/Classic/Druid/ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents  } from "General/Modules/Player/ClassDefaults/Classic/Paladin/ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents, compiledHolyTalents as holyPriestTalents } from "General/Modules/Player/ClassDefaults/Classic/Priest/ClassicPriestSpellDB";
import { getTalentedSpellDB, logHeal } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";


const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);


