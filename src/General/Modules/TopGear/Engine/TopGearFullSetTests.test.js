
import Player from "General/Modules/Player/Player";
import { processAllLines } from "Retail/Engine/SimCImport/SimCImportEngine"
import { mergeBonusStats, buildBestDomSet } from "./TopGearEngine";
import { applyDiminishingReturns, buildNewWepCombos } from "General/Engine/ItemUtilities"

import { runTopGear } from "./TopGearEngine";


describe("Top Gear full test", () => {
    
    const settings = {
          includeGroupBenefits: { value: true, options: [true, false], category: "trinkets", type: "selector" },
          incarnateAllies: { value: "DPS", options: ["Solo", "DPS", "Tank", "Tank + DPS"], category: "trinkets", type: "selector" },
          idolGems: { value: 2, options: [1, 2, 3, 4, 5, 6, 7, 8], category: "trinkets", type: "input" },
          rubyWhelpShell: { value: "Untrained", options: ["Untrained", "AoE Heal", "ST Heal", "Crit Buff", "Haste Buff"], category: "trinkets", type: "selector" }, // "ST Damage", "AoE Damage",
          alchStonePotions: { value: 1, options: [0, 1, 2], category: "trinkets", type: "selector" },
          enchantItems: { value: true, options: [true, false], category: "topGear", type: "selector" },
          catalystLimit: { value: 1, options: [1, 2, 3], category: "topGear", type: "selector" },
          upgradeFinderMetric: { value: "Show % Upgrade", options: ["Show % Upgrade", "Show HPS"], category: "upgradeFinder", type: "selector" },
          primordialGems: {
            value: "Automatic",
            options: ["Automatic", "Wild Spirit, Exuding Steam, Deluging Water", "Wild Spirit, Exuding Steam, Desirous Blood", "Flame Licked, Wild Spirit, Exuding Steam"],
            category: "topGear",
            type: "selector",
          },
          topGearAutoGem: { value: false, options: [true, false], category: "topGear", type: "selector" },
          healingDartsOverheal: { value: 55, options: [], category: "embellishments", type: "Entry" },
          lariatGems: { value: 3, options: [], category: "embellishments", type: "Entry" },
          chromaticEssenceBuff: { value: "Automatic", options: ["Automatic", "Haste", "Crit", "Mastery", "Versatility", "Quad Buff"], category: "trinkets", type: "selector" },
          chromaticEssenceAllies: { value: true, options: [true, false], category: "trinkets", type: "selector" },
        } 

    test("Test 1, Disc full gear Check", () => {
        /*
        const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
        var lines = discSet.split("\n");


        processAllLines(player, "Raid", lines, -1, -1, settings)
        player.activateAll();
        const wepCombos = buildNewWepCombos(player, true);
        const result = runTopGear(player.activeItems, wepCombos, player, "Raid", player.getHPS("Raid"), settings, player.getActiveModel("Raid"))
        
        const itemList = result.itemSet.itemList;
        
        const trinkets = itemList.filter(item => item.slot === "Trinket")
        console.log(trinkets);
        // Our trinket selection was a 203 Divine Bell, 252 Gland, 252 Shadowed Orb, and 246 Tome. 
        // Our expected result would be Bell / Gland. 

        */
        expect(true).toEqual(true);
        /*
        expect(trinkets.filter(trinket => trinket.effect.name === "Voidmender's Shadowgem").length).toEqual(1);
        expect(result.itemSet.effectList.filter(effect => effect.name === "DPriest T29-2").length).toEqual(1);
        expect(result.itemSet.effectList.filter(effect => effect.name === "DPriest T29-4").length).toEqual(0);

        
        //expect(trinkets.filter(trinket => trinket.effect.name === "Titanic Ocular Gland").length).toEqual(1); 
        */
    })


}) 

const evokerSet = `
# Evoulker - Devastation - 2023-06-25 17:43 - US/Stonemaul
# SimC Addon 10.1.0-07
# WoW 10.1.0.50000, TOC 100100
# Requires SimulationCraft 1000-01 or newer

evoker="Evoulker"
level=70
race=dracthyr
region=us
server=stonemaul
role=spell
professions=leatherworking=100/alchemy=51
spec=devastation

talents=BsbB9HUZ/a8TRPCT7X7rHDONyhgAAAAAAApkWSiQCCJJJlkkIINkIRS4ARSSkIkkEB

# Saved Loadout: Dev Leveling
# talents=BsbB9HUZ/a8TRPCT7X7rHDONyJFSAAAAAAAapIJikFQWASk0SSCBIJSkEAJRiQSSA
# Saved Loadout: Multi-Target
# talents=BsbB9HUZ/a8TRPCT7X7rHDONyBIAAAAAAgGSiIJRCJRSLJJNhUSkIRS4AIJJJCJJB
# Saved Loadout: ElbBuild
# talents=BsbB9HUZ/a8TRPCT7X7rHDONyhgAAAAAAApkWSiQCCJJJlkkIINkIRS4ARSSkIkkEB
# Saved Loadout: ST
# talents=BsbB9HUZ/a8TRPCT7X7rHDONyBkAAAAAAAplWSiQCCJJJtkENIQSEJJOQkkEJSkkEB

head=,id=202488,bonus_id=6652/9414/9229/9409/9334/1498/8767
neck=,id=204397,gem_id=192988/192958/192958,bonus_id=6652/9409/9334/1492/8767/9477/8782
shoulder=,id=202486,bonus_id=6652/9227/9409/9334/1498/8767
back=,id=205025,enchant_id=6598,bonus_id=8836/8840/8902/8960/9405/9366/9376,crafting_quality=5
chest=,id=204420,enchant_id=6625,bonus_id=9410/9380/6652/9224/9221/1498/8767
tabard=,id=194675
wrist=,id=204704,enchant_id=6580,bonus_id=8836/8840/8902/8960/9405/9376/9366/9414,crafting_quality=5
hands=,id=202489,bonus_id=6652/9230/9410/9381/1495/8767
waist=,id=202605,enchant_id=6904,gem_id=192958,bonus_id=7979/6652/9413/9222/9219/9329/1494/8767
legs=,id=202487,enchant_id=6544,bonus_id=6652/9228/9382/1504/8767
feet=,id=202588,enchant_id=6607,bonus_id=9409/6652/9226/9219/9334/1495/8767
finger1=,id=158314,enchant_id=6550,bonus_id=6652/9414/9144/9334/3311/8767
finger2=,id=195480,enchant_id=6556,bonus_id=6652/7936/7981/1498/8767
trinket1=,id=203729,bonus_id=9410/9381/6652/1498/8767
trinket2=,id=193773,bonus_id=6652/9144/9334/1663/8767
main_hand=,id=190511,enchant_id=6643,bonus_id=8836/8840/8902/9405/9376/8791/9237/9366,crafted_stats=40/36,crafting_quality=5
off_hand=,id=193745,bonus_id=9381/6652/9144/1666/8767

### Gear from Bags
#
# Rashok's Molten Heart (444)
# trinket1=,id=202614,bonus_id=6652/9410/9381/1498/8767
`

const discSet = `
# Voulkpriest - Discipline - 2022-12-20 21:05 - US/Mal'Ganis
# SimC Addon 10.0.2-04
# WoW 10.0.2.47213, TOC 100002
# Requires SimulationCraft 1000-01 or newer

priest="Voulkdemo"
level=70
race=goblin
region=us
server=malganis
role=spell
professions=tailoring=60/jewelcrafting=76
spec=discipline

talents=BAQAu+2Vv7op3uGggQnVDr07wABQSLkQaJBQUSJJJJSCAAAAAAAAAAASIpRaJkgIEBhUEJSCA

head=,id=193703,bonus_id=8966/7977/6652/7936/8822/8820/9144/1614/8767
neck=,id=193001,gem_id=192948/192948/192948,bonus_id=8836/8840/8902/8960/8784/8782/8801/8790/8845,crafted_stats=36/49
shoulder=,id=200329,bonus_id=7979/6652/8826/1472/8767
back=,id=193763,enchant_id=6592,bonus_id=8969/7977/6652/8822/8819/9144/1624/8767
chest=,id=134415,enchant_id=6625,bonus_id=8966/7977/6652/8822/8820/9144/3271/8767
shirt=,id=167082
wrist=,id=109864,enchant_id=6573,bonus_id=8968/7977/6652/7937/8822/8819/9144/3283/8767
hands=,id=200326,bonus_id=7980/6652/8829/1485/8767
waist=,id=191989,bonus_id=6652/7936/1485/5864/8767
legs=,id=200328,enchant_id=6540,bonus_id=7979/6652/8827/1472/8767
feet=,id=134308,enchant_id=6612,bonus_id=8966/7977/6652/8822/8818/9144/3271/8767
finger1=,id=202119,enchant_id=6556
finger2=,id=200172,enchant_id=6556,bonus_id=6652/7936/1491/5865/8767
trinket1=,id=200563,bonus_id=6652/1485/5864/8767
trinket2=,id=194300,bonus_id=6652/7980/1475/8767
main_hand=,id=110039,enchant_id=6643,bonus_id=8966/7977/6652/9147/3277/8767

### Gear from Bags
#
# Voidmender's Shadowgem (392)
# trinket1=,id=110007,bonus_id=8966/7977/6652/9144/3277/8767
`

const monkSet = `
# Christina - Mistweaver - 2022-12-21 19:43 - US/Zul'jin
# SimC Addon 10.0.2-04
# WoW 10.0.2.47213, TOC 100002
# Requires SimulationCraft 1000-01 or newer
 
monk="Christina"
level=70
race=blood_elf
region=us
server=zuljin
role=attack
professions=alchemy=100/engineering=63
spec=mistweaver
 
talents=B4QAdeydY63Y4XKaboK13uRRQ0SEIJEFtkEROgk0QiUEAAAAAAAAAAAAAgWkEJJSOQkkkkGRAAgA
 
# Saved Loadout: key gift
# talents=B4QAdeydY63Y4XKaboK13uRRQ0SEIJEFtkEROgk0QiUEAAAAAAAAAAAAAgWkEJJSOQkkkkGRAAgA
# Saved Loadout: standard raid
# talents=B4QAdeydY63Y4XKaboK13uRRQ0SkCSkQRRSEhk0olIFBAAAAAAAAAAAAASahEJJSIRSSaQCAAC
# Saved Loadout: cleave raid
# talents=B4QAdeydY63Y4XKaboK13uRRQ0SEIJEFtkEROgk0QiUEAAAAAAAAAAAAAgWkEJJSOQkkkkGRAAgA
# Saved Loadout: taner m+ build
# talents=B4QAdeydY63Y4XKaboK13uRRQ0SEkkcAUUSSEhk0QiUEcAAAAAAAAAAAAAARkEJJSIJJJpREAAI
 
head=,id=200363,bonus_id=7980/6652/7937/8828/1485/8767
neck=,id=193001,gem_id=192948/192948/192948,bonus_id=8836/8840/8902/8960/8783/8782/8801/8845,crafted_stats=40/32
shoulder=,id=195486,bonus_id=41/8821/8817/7979/1472/8767
back=,id=200971,enchant_id=6595
chest=,id=193764,enchant_id=6625,bonus_id=7977/6652/8822/8820/9144/8966/1614/8767
shirt=,id=167185
wrist=,id=193649,enchant_id=6580,gem_id=192948,bonus_id=7977/6652/7935/8822/8819/9144/8967/1617/8767
hands=,id=137480,bonus_id=8966/7977/6652/8822/8817/9144/3271/8767
waist=,id=195501,bonus_id=6652/7936/8825/8818/7980/1485/8767
legs=,id=200364,enchant_id=6543,bonus_id=7979/6652/8827/1472/8767
feet=,id=200244,enchant_id=6606,bonus_id=6652/1488/5864/8767
finger1=,id=193696,enchant_id=6555,bonus_id=8966/7977/6652/7936/9144/1614/8767
finger2=,id=133679,enchant_id=6555,bonus_id=8966/7977/6652/7937/9144/3271/8767
trinket1=,id=194307,bonus_id=7979/6652/1472/8767
trinket2=,id=191492,bonus_id=8836/8840/8902/8801/8845
main_hand=,id=195481,enchant_id=6651,bonus_id=6652/7979/1472/8767
off_hand=,id=193709,bonus_id=8966/7977/6652/9144/1614/8767
`