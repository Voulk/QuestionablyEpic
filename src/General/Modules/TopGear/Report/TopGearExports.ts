


// Sample ReforgeLite export:

import Item from "General/Items/Item";
import Player from "General/Modules/Player/Player";
import { getTranslatedSlotName } from "locale/slotsLocale";

// {"player":{"name":"Player","equipment":{"items":[{"id":78785,"enchant":4207,"gems":[52296,52207]},{"id":78382,"reforging":119},{"id":78835,"enchant":4199,"gems":[52207,52207],"reforging":117},{"id":77096,"enchant":4096,"gems":[52207],"reforging":119},{"id":78755,"enchant":4063,"gems":[52207,52207,52208],"reforging":119},{"id":71262,"gems":[0],"reforging":117},{"id":76157,"gems":[52207,0],"reforging":119},{"id":75117,"gems":[0],"reforging":167},{"id":78805,"enchant":4112,"gems":[52207,52207,52207],"reforging":117},{"id":77172,"enchant":4069,"gems":[52207,52208],"reforging":119},{"id":77109,"gems":[52207],"reforging":117},{"id":71211,"reforging":145},{"id":77976},{"id":72898},{"id":78485,"enchant":4084},{"id":72878,"reforging":167},{"id":77083,"gems":[52207],"reforging":117}]}}}
export const exportReforgeLite = (player: Player, itemSet: Item[], reforges: any) => {
  console.log(itemSet);
  console.log(reforges);
  const reforgeData = {
    player: {
      name: player.name,
      equipment: {
        items: itemSet.map(item => {
          const itemData = {
            id: item.id,
            enchant: item.enchantID || 0,
            gems: item.socketedGems ? item.socketedGems : [],
          };
          if (reforges[item.id]) itemData.reforging = reforgeIDs[reforges[item.id]];
          return itemData;
        }),
      },
    },
  };

  return JSON.stringify(reforgeData, null, 2);

}
// Spirit: 6
// Haste: 36
// Crit: 32
// Mastery: 49
// Hit: 31
const reforgeIDs = {
  "Reforged: haste -> spirit": 148,
  "Reforged: crit -> spirit": 141,
  "Reforged: mastery -> spirit": 162,
  "Reforged: haste -> crit": 152,
  "Reforged: spirit -> crit": 116,
  "Reforged: mastery -> crit": 166,
  "Reforged: haste -> mastery": 154,
  "Reforged: crit -> mastery": 147,
  "Reforged: spirit -> mastery": 119,
  "Reforged: spirit -> haste": 117,
  "Reforged: mastery -> haste": 167,
  "Reforged: crit -> haste": 145,

}

const wowheadCodes = {
  2639: "[=retail-raid-tww-s2-vexie]", // Vexie and the Geargrinders.
  2640: "[=retail-raid-tww-s2-cauldron-carnage]", // Cauldron of Carnage
  2641: "[=retail-raid-tww-s2-rik-reverb]", // Rik Reverb
  2642: "[=retail-raid-tww-s2-stix-bunkjunker]", // Stix Bunkjunker
  2653: "[=retail-raid-tww-s2-sprocketmonger]", // Sprocketmonger Lockenstock
  2644: "[=retail-raid-tww-s2-one-armed-bandit]", // One Armed Bandit
  2645: "[=retail-raid-tww-s2-mugzee]", // Mug'Zee
  2646: "[=retail-raid-tww-s2-gallywix]", // Chrome King Gallywix

  // Dungeons
  1210: "[=retail-dun-darkflame-cleft]", // Darkflame Cleft
  1272: "[=retail-dun-cinderbrew-meadery]", // Cinderbrew Meadery
  1268: "[=retail-dun-rookery]", // The Rookery
  1267: "[=retail-dun-priory-sacred-flame]", // Priory
  1012: "[=retail-dun-motherlode]", // The Motherlode
  1178: "[=retail-dun-operation-mechagon-workshop]", // Workshop
  1298: "[=retail-dun-operation-floodgate]", // Operation Floodgate
  1187: "[=retail-dun-theater-pain]", // Theater of Pain

  // Classic
  // Dungeons
  303: "[icon name=achievement_greatwall][/icon][zone=5976]", // Gate of the Setting Sun
  312: '[icon name=achievement_shadowpan_hideout][/icon][zone=5918]', // "Shado-Pan Monastery"
  311: '[icon name=inv_helmet_52][/icon][zone=6052]', // "Scarlet Halls"
  316: '[icon name=spell_holy_resurrection][/icon][zone=6109]', // "Scarlet Monastery"
  246: '[icon name=spell_holy_senseundead][/icon][zone=6066]', // "Scholomance"
  324: '[icon name=achievement_dungeon_siegeofniuzaotemple][/icon][zone=6214]', // "Siege of Niuzao Temple"
  302: '[icon name=achievement_brewery][/icon][zone=5963]', // "Stormstout Brewery"
  321: '[icon name=achievement_dungeon_mogupalace][/icon][zone=6182]', // "Mogu'shan Palace"
  313: '[icon name=achievement_jadeserpent][/icon][zone=5956]', // "Temple of the Jade Serpent"

  // Raid Bosses
  // Mogushan Vaults
  679: '[icon name=achievement_moguraid_01][/icon][npc=60047] [i](Stone Guard, Mogushan Vaults)[/i]', // "Stone Guard"
  689: '[icon name=achievement_moguraid_02][/icon][npc=60009] [i](Mogushan Vaults)[/i]', // "Feng the Accursed"
  682: '[icon name=achievement_moguraid_03][/icon][npc=60143] [i](Mogushan Vaults)[/i]', // "Gara'jal the Spiritbinder"
  687: '[icon name=achievement_moguraid_04][/icon][npc=60701] [i](Spirit Kings, Mogushan Vaults)[/i]', // "Spirit Kings"
  726: '[icon name=achievement_moguraid_05][/icon][npc=60410] [i](Mogushan Vaults)[/i]', // "Elegon"
  677: '[icon name=achievement_moguraid_06][/icon][npc=60400] [i](Will of the Emperor, Mogushan Vaults)[/i]', // "Will of the Emperor"


  // Heart of Fear
  745: '[icon name=achievement_raid_mantidraid02][/icon][npc=62980] [i](Heart of Fear)[/i]', // "Imperial Vizier Zor'lok"
  744: '[icon name=achievement_raid_mantidraid03][/icon][npc=62543] [i](Heart of Fear)[/i]', // "Blade Lord Ta'yak"
  713: '[icon name=achievement_raid_mantidraid05][/icon][npc=62164] [i](Heart of Fear)[/i]', // "Garalon"
  741: '[icon name=achievement_raid_mantidraid04][/icon][npc=62397] [i](Heart of Fear)[/i]', // "Wind Lord Mel'jarak"
  737: '[icon name=achievement_raid_mantidraid06][/icon][npc=62511] [i](Heart of Fear)[/i]', // "Amber-Shaper Un'sok"
  743: '[icon name=achievement_raid_mantidraid07][/icon][npc=62837] [i](Heart of Fear)[/i]', // "Grand Empress Shek'zeer"

  // Terrace of Endless Spring
  683: '[icon name=achievement_raid_terraceofendlessspring01][/icon][npc=60583] [i](Terrace of Endless Spring)[/i]', // "Protectors of the Endless"
  742: '[icon name=achievement_raid_terraceofendlessspring02][/icon][npc=62442] [i](Terrace of Endless Spring)[/i]', // "Tsulong"
  729: '[icon name=achievement_raid_terraceofendlessspring03][/icon][npc=62983] [i](Terrace of Endless Spring)[/i]', // "Lei Shi"
  709: '[icon name=achievement_raid_terraceofendlessspring04][/icon][npc=60999] [i](Terrace of Endless Spring)[/i]', // "Sha of Fear"

  9997: '[icon name=achievement_raid_terraceofendlessspring02][/icon][npc=62442] [i](Terrace of Endless Spring)[/i][br][icon name=achievement_raid_terraceofendlessspring03][/icon][npc=62983] [i](Terrace of Endless Spring)[/i]', // Shared loot between Tsulon and Lei Shi

  // World Bosses (Pandaria)
  725: '[icon name=inv_mushanbeastmount][/icon][npc=62346] [i](World Boss)[/i]', // Saylis's Warband (Galleon)


  1: "[skill=197] [i](BoE)[/i]", // Tailoring
  2: "[skill=165] [i](BoE)[/i]", // Leatherworking
  3: "[skill=164] [i](BoE)[/i]", // Blacksmithing
  4: "[skill=202] [i](BoP)[/i]", // Engineering
  5: "[skill=773] [i](BoE)[/i]", // Inscription
  6: "[skill=171] [i](BoP)[/i]", // Alchemy
  7: "[skill=155]", // Jewelcrafting
}

const wowheadRepCodes = {
  1: "[faction=1337]", // Klaxxi
  2: "[faction=1269]", // GL
  3: "[faction=1270]", // Shado-Pan
  4: "[faction=1341]", // August Celestials
}

const wowheadRepColors = {
  1: "[color=honored]Honored[/color]",
  2: "[color=revered]Revered[/color]",
  3: "[color=exalted]Exalted[/color]",
}

const wowheadClassColors = {
  "Holy Paladin": "c2",
  "Restoration Druid": "c11", 
  "Preservation Evoker": "c13",  
  "Discipline Priest": "c5", 
  "Holy Priest": "c5", 
  "Restoration Shaman": "c7", 
  "Mistweaver Monk": "c10"
}

// It can be convenient to export our best in slot list for a range of uses including putting together gear lists. 
export function exportWowheadGearList(itemSet, spec, gameType = "Retail") {
  console.log(spec);
  // Slot, itemID, bonusTag, source
  // [tr][td]Cloak[/td][td][item=212446 bonus=[=gv-raid]][/td][td][npc=215657][/td][/tr]
  const classColor = wowheadClassColors[spec.replace(" Classic", "")];
  const results = ["[center][table class=grid width=900px]", "[tr]", `[td background=${classColor}][b]Slot[/b][/td]`, `[td background=${classColor}][b]Item[/b][/td]`, `[td background=${classColor}][b]Source[/b][/td]`, "[/tr]"];
  

  itemSet.forEach(item => {
    let colourTag = "";
    let source = "";
    let bonusTag = "";
    if (item.id === 228411) {
      results.push(`[tr][td]Ring[/td][td][=cyrce-circlet]
                    [ul]
                    [li][color=c4][item=228638][/color][/li]
                    [li][color=c8][item=228639][/color][/li]
                    [li][color=c2][item=228646][/color][/li]
                    [/ul][/td][td][url guide=27805]Siren Isle[/url][/td][/tr]`
                    )
    }
    if (item.source) {
      if (item.slot === "Waist" && item.source.instanceId === 320) source = wowheadCodes[9997] || ""
      else if (item.source.instanceId === -8) source = item.source.cost + ` [currency=3350]` // Celestial vendor
      else if (item.source.instanceId === -6) source = item.source.cost + ` [currency=396]`; // Valor vendor
      else if (item.source.instanceId === -12) source = `${wowheadRepCodes[item.source.encounterId]} ${wowheadRepColors[item.source.repRequired] || ""}`;
      else source = wowheadCodes[item.source.encounterId] || "";

      if (gameType === "Retail") {
        if (item.source.instanceId === CONSTANTS.currentRaidID) bonusTag = " bonus=[=gv-raid]";
        else if (item.source.instanceId === -1) {
          const instanceID = item.source.encounterId;
          if ([1210, 1272, 1268, 1267, 1298].includes(instanceID)) bonusTag = " bonus=[=gv-tww-dun]"; // TWW
          else if ([1012, 1178].includes(instanceID)) bonusTag = " bonus=[=gv-bfa-dun]"; // BFA
          else if (instanceID === 1187) bonusTag = " bonus=[=gv-sl-dun]"; // Shadowlands
        }
        else if (item.source.instanceId === -69) bonusTag = " bonus=[=gv-delves]"
      }

    }
    
    if (item.id !== 228411 && gameType === "Retail") results.push(`[tr][td]${getTranslatedSlotName(item.slot, "en") || item.slot}[/td][td][color=q4][item=${item.id}${bonusTag}][/color][/td][td]${source}[/td][/tr]`)
    else if (gameType === "Classic") results.push(`[tr][td]${getTranslatedSlotName(item.slot, "en") || item.slot}[/td][td][item=${item.id}${bonusTag}][/td][td]${source}[/td][/tr]`)
    })
  results.push(`[/table][/center]`)

  const formattedArray = results.map(String).join('\n');
  //console.log(formattedArray);

  return formattedArray;
}