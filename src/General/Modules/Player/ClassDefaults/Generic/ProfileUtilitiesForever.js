import { getTrinketValue, getTrinketParam } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketEffectFormulas"
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery, getEnemyArmor } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { STATCONVERSIONCLASSIC } from "General/Engine/STAT"
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";



// Returns the players current haste percentage. 
export const getHasteClassic = (stats, hasteBuff = 1.05) => {
    return (1 + stats.haste / 425 / 100) * hasteBuff;
}


export const hasTier = (playerData, tier) => {
    return playerData.tier.includes(tier);
}

export const splitSpellCPM = (castProfile, spellName, splitPerc) => {
    // Split a spell's CPM into two entries.
    const originalEntry = getSpellEntry(castProfile, spellName);
    const clone = JSON.parse(JSON.stringify(originalEntry));

    clone.cpm = originalEntry.cpm * (1 - splitPerc);
    originalEntry.cpm = originalEntry.cpm * splitPerc;
    
    castProfile.push(clone);
}

export const convertStatPercentages = (statProfile, hasteBuff, spec, race = "") => {
    const isTwoHander = statProfile.isTwoHanded ?? false;

    const stats = {
        spellpower: statProfile.intellect + statProfile.spellpower - 10, // The first 10 intellect points don't convert to spellpower.
        crit: 1 + getCritPercentage(statProfile, spec),
        haste: getHasteClassic({statProfile, haste: statProfile.haste}, hasteBuff),
        spirit: (statProfile.spirit),
        weaponDamage: statProfile.averageDamage / statProfile.weaponSwingSpeed * (isTwoHander ? 0.5 : (0.898882 * 0.75)),
        weaponDamageMelee: statProfile.averageDamage / statProfile.weaponSwingSpeed * (isTwoHander ? 1 : 1),
        weaponSwingSpeed: statProfile.weaponSwingSpeed,
        attackpower: (statProfile.intellect + statProfile.spellpower - 10) * 2,
        armorReduction: 0.7,

        critMultDPS: statProfile.critMultDPS,
        critMultHPS: statProfile.critMultHPS + 1, // Yes it works differently to DPS crits. 
    }

    getClassicRaceBonuses(stats, race);
    return stats;
}

const getClassicRaceBonuses = (statPerc, race) => {
    if (race === "Pandaren") {
        // Handled before raid buffs.
    }
    else if (race === "Worgen") {
        statPerc.crit += 0.01; // 1% crit
    }
    else if (race === "Orc") {
        // We probably rework this eventually to be 
        statPerc.spellpower += (282 * 1.1);
        statPerc.attackpower += (282 * 1.1 * 2);
    }
    else if (race === "Human") {
        statPerc.spirit *= 1.03; // 3% spirit
    }
}

export const runProfileSpellForever = (spellName, fullSpell, statPercentages, spec, settings, flags = {}) => {
    const throughput = {damage: 0, healing: 0};

    fullSpell.forEach(spell => {
        if (spell.spellType === "heal" || spell.buffType === "heal") {
            throughput.healing += runForeverSpell(spellName, spell, statPercentages, spec, settings, flags = {});
        }
        else if (spell.spellType === "damage" || spell.buffType === "damage") {

            throughput.damage += runForeverSpell(spellName, spell, statPercentages, spec, settings, flags = {});

        }
    })

    return throughput;
}

// Classic
export const runForeverSpell = (spellName, spell, statPercentages, spec, settings, flags = {}) => {

    const genericMult = 1;
    let targetCount = 1;
    // (getSetting(settings, "classicMetaGem") === "Burning Primal Diamond")

    //const spellpower = statProfile.intellect + statProfile.spellpower;
    let spellCritBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0; 
    let adjCritChance = ((spell.secondaries && spell.secondaries.includes("crit")) ? (statPercentages.crit + spellCritBonus) : 1)-1; 
    const isDamageSpell = spell.type === "damage" || spell.buffType === "damage";
    const critSize = isDamageSpell ? statPercentages.critMultDPS : statPercentages.critMultHPS; // 3% increased crit damage / healing;
    if (spec.includes("Discipline Priest")) adjCritChance = 0; // We'll handle Disc crits separately since they are a nightmare.
    const critMult = ((1-adjCritChance) + adjCritChance * critSize)

    //const additiveScaling = (spell.additiveScaling || 0) + 1
    
     
    let spellOutput = 0;
    if (spellName === "Melee") {
        // Melee attacks are a bit special and don't share penalties with our special melee-based spells. 
        spellOutput = (statPercentages.weaponDamageMelee + statPercentages.attackpower / 14 * statPercentages.weaponSwingSpeed)
                        * critMult * genericMult * targetCount;
    }
    else if (spell.weaponScaling) {
        // Some monk spells scale with weapon damage instead of regular spell power. We hate these.
        
        spellOutput = (statPercentages.weaponDamage + statPercentages.attackpower / 14) * spell.weaponScaling
                        * critMult * genericMult * targetCount;
    }
    else {
        // Most other spells follow a uniform formula.
        spellOutput = (spell.flat + spell.coeff * statPercentages.spellpower) * // Spell "base" healing
                            critMult * // Multiply by secondary stats & any generic multipliers. 
                            genericMult *
                            targetCount
    }

    if (spell.type === "heal" || spell.buffType === "heal") {
        spellOutput *= (1 - spell.expectedOverheal)
        targetCount = spell.targets ? spell.targets : 1;
    }
    else if (spell.type === "damage" || spell.buffType === "damage") {
        if (spell.damageType === "physical") spellOutput *= getEnemyArmor(statPercentages.armorReduction);
        
        targetCount = settings.enemyTargets ? Math.min(settings.enemyTargets, (spell.maxTargets || 1)) : (spell.targets ? spell.targets : 1);
    }

    
    spellOutput *= targetCount;

    // Handle HoT
    if (spell.spellType === "buff" && (spell.buffType === "damage" || spell.buffType === "heal")) {
      //const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (statPercentages.haste);
      let tickCount = Math.round(spell.buffDuration / spell.tickData.tickRate);

      if (spell.tickData.tickOnCast) tickCount += 1;
      if (flags["RampingHoTEffect"]) spellOutput = spellOutput * (1 + flags["RampingHoTEffect"] / 2 * (tickCount + 1));
      
      // Take care of any HoTs that don't have obvious breakpoints.
      // Examples include Lifebloom where you're always keeping 3 stacks active, or Efflorescence which is so long that breakpoints are irrelevant.
      if (spell.tickData.rolling) spellOutput = spellOutput * (spell.buffDuration / spell.tickData.tickRate);
      else spellOutput = spellOutput * tickCount;
    }

    return spellOutput;
}