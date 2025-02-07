
import { CLASSICDRUIDSPELLDB as druidSpells, druidTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB as paladinSpells, paladinTalents  } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPaladinSpellDB";
import { CLASSICPRIESTSPELLDB as discSpells, compiledDiscTalents as discTalents, compiledHolyTalents as holyPriestTalents } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicPriestSpellDB";
import { getTalentedSpellDB, logHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicUtilities";
import { getHaste } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampBase";
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";


const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);


