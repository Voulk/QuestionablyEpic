
import Player from "General/Modules/Player/Player";
import { processAllLines } from "Retail/Engine/SimCImport/SimCImportEngine.js"
import { mergeBonusStats, buildBestDomSet } from "./TopGearEngine";
import { applyDiminishingReturns, buildWepCombos } from "General/Engine/ItemUtilities"

import { runTopGear } from "./TopGearEngine";


describe("Top Gear full test", () => {
    test("Test 1, Disc full gear Check", () => {

        const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
        var lines = discSet.split("\n");


        processAllLines(player, "Raid", lines, -1, -1)
        player.activateAll();
        const wepCombos = buildWepCombos(player, true);
        const result = runTopGear(player.activeItems, wepCombos, player, "Raid", player.getHPS("Raid"), "en", {}, player.getActiveModel("Raid"))
        
        const itemList = result.itemSet.itemList;
        
        const trinkets = itemList.filter(item => item.slot === "Trinket")

        // Our trinket selection was a 203 Divine Bell, 252 Gland, 252 Shadowed Orb, and 246 Tome. 
        // Our expected result would be Bell / Gland. 
        expect(trinkets.filter(trinket => trinket.effect.name === "Voidmender's Shadowgem").length).toEqual(1);
        //expect(trinkets.filter(trinket => trinket.effect.name === "Titanic Ocular Gland").length).toEqual(1); 
    })

}) 

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