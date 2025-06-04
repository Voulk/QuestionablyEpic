


// Sample ReforgeLite export:

import Item from "General/Items/Item";

// {"player":{"name":"Player","equipment":{"items":[{"id":78785,"enchant":4207,"gems":[52296,52207]},{"id":78382,"reforging":119},{"id":78835,"enchant":4199,"gems":[52207,52207],"reforging":117},{"id":77096,"enchant":4096,"gems":[52207],"reforging":119},{"id":78755,"enchant":4063,"gems":[52207,52207,52208],"reforging":119},{"id":71262,"gems":[0],"reforging":117},{"id":76157,"gems":[52207,0],"reforging":119},{"id":75117,"gems":[0],"reforging":167},{"id":78805,"enchant":4112,"gems":[52207,52207,52207],"reforging":117},{"id":77172,"enchant":4069,"gems":[52207,52208],"reforging":119},{"id":77109,"gems":[52207],"reforging":117},{"id":71211,"reforging":145},{"id":77976},{"id":72898},{"id":78485,"enchant":4084},{"id":72878,"reforging":167},{"id":77083,"gems":[52207],"reforging":117}]}}}
export const exportReforgeLite = (itemSet: Item[]) => {

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
export function exportWowheadGearList(itemSet, spec) {
  // Slot, itemID, bonusTag, source
  // [tr][td]Cloak[/td][td][item=212446 bonus=[=gv-raid]][/td][td][npc=215657][/td][/tr]
  const classColor = wowheadClassColors[spec];
  const results = ["[center][table class=grid width=900px]", "[tr]", `[td background=${classColor}][b]Slot[/b][/td]`, `[td background=${classColor}][b]Item[/b][/td]`, `[td background=${classColor}][b]Source[/b][/td]`, "[/tr]"];
  

  itemSet.forEach(item => {
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
      source = wowheadCodes[item.source.encounterId] || "";

      if (item.source.instanceId === CONSTANTS.currentRaidID) bonusTag = " bonus=[=gv-raid]";
      else if (item.source.instanceId === -1) {
        const instanceID = item.source.encounterId;
        if ([1210, 1272, 1268, 1267, 1298].includes(instanceID)) bonusTag = " bonus=[=gv-tww-dun]"; // TWW
        else if ([1012, 1178].includes(instanceID)) bonusTag = " bonus=[=gv-bfa-dun]"; // BFA
        else if (instanceID === 1187) bonusTag = " bonus=[=gv-sl-dun]"; // Shadowlands
      }
      else if (item.source.instanceId === -69) bonusTag = " bonus=[=gv-delves]"
    }
    
    if (item.id !== 228411) results.push(`[tr][td]${getTranslatedSlotName(item.slot, "en") || item.slot}[/td][td][color=q4][item=${item.id}${bonusTag}][/color][/td][td]${source}[/td][/tr]`)
  })
  results.push(`[/table][/center]`)

  const formattedArray = results.map(String).join('\n');
  console.log(formattedArray);
}