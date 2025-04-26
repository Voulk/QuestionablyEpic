import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

export function filterClassicItemListBySource(itemList: any[], sourceInstance: number, sourceBoss: number) {
    let temp = itemList.filter(function (item) {
      return (item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0);
    });
  
    return temp;
  } 

export const getEnchants = (playerSettings: any, professions: [], offhandFlag: boolean) => {
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
    enchantStats.intellect += 60;
    enchantStats.crit += 35;
    enchants['Head'] = "Arcanum of Hyjal"

    // Shoulders
    if (professions.includes("Inscription")) {
        enchantStats.intellect += 130;
        enchantStats.haste += 25;
        enchants['Shoulder'] = "Felfire Inscription"
    }
    else {
        enchantStats.intellect += 50;
        enchantStats.haste += 25;
        enchants['Shoulder'] = "Greater Inscription of Charged Lodestone" // Lesser version available.
    }

    // Chest
    enchantStats.intellect += 20;
    enchantStats.spirit += 20;
    enchants['Chest'] = "Peerless Stats" // TODO

    // Back
    enchantStats.intellect += 50;
    enchants['Back'] = "Greater Intellect"; // Tailoring version available.

    // Wrist
    if (professions.includes("Leatherworking")) {
        enchantStats.intellect += 130;
        enchants['Wrist'] = "Draconic Embossment";
    }
    else if (getSetting(playerSettings, "wristEnchant") === "Intellect (better)") {
        enchantStats.intellect += 50;
        enchants['Wrist'] = "Mighty Intellect";
    }
    else {
        enchantStats.haste += 50;
        enchants['Wrist'] = "Speed";
    }


    // Gloves
    if (getSetting(playerSettings, "gloveEnchant") === "Haste") {//player.spec === "Restoration Druid Classic" && setStats.haste < 2005 && setStats.haste >= 1955) {
        enchantStats.haste += 50;
        enchants['Hands'] = "Haste"
    }
    else { 
        enchantStats.mastery += 65;
        enchants['Hands'] = "Mastery"
    }

    // Pants
    enchantStats.spellpower += 95;
    enchantStats.spirit += 55;
    enchants['Legs'] = "Powerful Ghostly Spellthread"

    // Boots
    if (getSetting(playerSettings, "bootsEnchant") === "Lavawalker") {
        enchantStats.mastery += 35;
        enchants['Feet'] = "Lavawalker"
    }
    else if (getSetting(playerSettings, "bootsEnchant") === "Haste (cheaper)") {
        enchantStats.haste += 50;
        enchants['Feet'] = "Haste";
    }
    else {
        enchants['Feet'] = "Earthen Vitality"
    }

    // Rings
    if ("profession" === "Enchanting") {
        enchantStats.intellect += (40 * 2); // Two finger slots.
        enchants['Finger'] = "Intellect"
    }

    // Weapons
    enchantStats.spellpower += 63;
    enchants['CombinedWeapon'] = "Power Torrent"
    enchants['1H Weapon'] = "Power Torrent"
    enchants['2H Weapon'] = "Power Torrent"

    // Offhand
    if (offhandFlag) {
        enchantStats.intellect += 40;
        enchants['Offhand'] = "Superior Intellect"
        enchants['Shield'] = "Superior Intellect"
    }

    // Flasks and profession stuff.
    enchantStats.intellect += 300;
    if (professions.includes("Skinning")) {
        enchantStats.crit += 80;
    }
    else if (professions.includes("Alchemy")) {
        enchantStats.intellect += 80;
    }

    return {enchants: enchants, enchantStats: enchantStats};
}