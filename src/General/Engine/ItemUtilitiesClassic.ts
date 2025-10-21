import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

export function filterClassicItemListBySource(itemList: any[], sourceInstance: number, sourceBoss: number) {
    let temp = itemList.filter(function (item) {
      return (item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0);
    });
  
    return temp;
  } 

export const getEnchants = (playerSettings: any, professions: string[], offhandFlag: boolean, spec: string) => {
    const enchants = {};
    const enchantStats: Stats = {
        intellect: 0,
        spellpower: 0,
        spirit: 0,
        crit: 0,
        stamina: 0,
        mastery: 0,
        mp5: 0,
        haste: 0,
    };

    // Head
    // None

    // Shoulders
    if (professions.includes("Inscription")) {
        enchantStats.intellect! += 520;
        enchantStats.crit! += 100;
        enchants['Shoulder'] = "Secret Crane Wing Inscription"
    }
    else {
        enchantStats.intellect! += 200;
        enchantStats.crit! += 100;
        enchants['Shoulder'] = "Greater Crane Wing Inscription" // Lesser version available.
    }

    // Chest
    enchantStats.intellect! += 80;
    enchantStats.spirit! += 80; // ?
    enchants['Chest'] = "Glorious Stats" 

    // Back
    enchantStats.intellect! += 180;
    enchants['Back'] = "Superior Intellect"; // Tailoring version available.

    // Wrist
    if (professions.includes("Leatherworking")) {
        enchantStats.intellect! += 500;
        enchants['Wrist'] = "Fur Lining";
    }
    else {
        enchantStats.intellect! += 180;
        enchants['Wrist'] = "Super Intellect";
    }


    // Gloves
    if (getSetting(playerSettings, "gloveEnchant") === "Haste") {//player.spec === "Restoration Druid Classic" && setStats.haste < 2005 && setStats.haste >= 1955) {
        enchantStats.haste! += 170;
        enchants['Hands'] = "Greater Haste"
    }
    else { 
        enchantStats.mastery! += 170;
        enchants['Hands'] = "Superior Mastery"
    }

    // Pants
    if (spec.includes("Mistweaver Monk")) {
        enchantStats.spellpower! += 285;
        enchantStats.crit! += 165;
        enchants['Legs'] = "Greater Cerulean Spellthread"
    }
    else {
        enchantStats.spellpower! += 285;
        enchantStats.spirit! += 165;
        enchants['Legs'] = "Greater Pearlescent Spellthread"
    }


    // Boots
    enchantStats.mastery! += 140;
    enchants['Feet'] = "Pandaren's Step"

    // Rings
    if (professions.includes("Enchanting")) {
        enchantStats.intellect! += (160 * 2); // Two finger slots.
        enchants['Finger'] = "Greater Intellect"
    }

    // Weapons
    enchantStats.intellect! += 0; // 1650 int while active, 750 spirit if it procs below 25% mana. Might be RPPM, might not.
    enchants['CombinedWeapon'] = "Jade Spirit"
    enchants['1H Weapon'] = "Jade Spirit"
    enchants['2H Weapon'] = "Jade Spirit"

    // Offhand
    if (offhandFlag) {
        enchantStats.intellect! += 165;
        enchants['Offhand'] = "Major Intellect"
        enchants['Shield'] = "Major Intellect"
    }

    // Flasks and profession stuff.
    enchantStats.intellect! += 1000; // Flask
    if (professions.includes("Alchemy")) {
        enchantStats.intellect! += 320; // Alchemy
    }
    /*if (professions.includes("Skinning")) {
        enchantStats.crit += 80;
    }
    else if (professions.includes("Alchemy")) {
        enchantStats.intellect += 80;
    }*/

    return {enchants: enchants, enchantStats: enchantStats};
}