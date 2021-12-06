
import Player from "General/Modules/Player/Player";
import { processAllLines } from "Retail/Engine/SimCImport/SimCImportEngine.js"
import { mergeBonusStats, buildBestDomSet } from "./TopGearEngine";
import { applyDiminishingReturns, buildWepCombos } from "General/Engine/ItemUtilities"

import { runTopGear } from "./TopGearEngine";

const discSet = 
`
# Voulkpriest - Discipline - 2021-11-03 10:29 - US/Stonemaul
# SimC Addon 9.1.0-01
# Requires SimulationCraft 910-01 or newer

priest="Voulkpriest"
level=60
race=human
region=us
server=stonemaul
role=spell
professions=alchemy=1/herbalism=40
talents=3333112
spec=discipline

covenant=kyrian
# soulbind=pelagos:7,328266/87:7:1/328261/283:8:1/328265/114:9:1/71:7:1/328257/75:7:1/351146/66:7:1/351149
# soulbind=kleia:13,329791/84:7:1/334066/69:7:1/329784/66:7:1/283:8:1/329778/116:9:1/351489/67:9:1/351491
soulbind=forgelite_prime_mikanikos:18,333950/114:9:1/331609/67:9:1/331726/66:7:1/87:7:1/331611/75:7:1/352186/71:7:1/352188
# conduits_available=75:7/76:7/77:9/78:9/81:8/82:7/84:7/87:7/107:7/113:8/114:9/115:7/116:9/67:9/69:7/73:8/85:7/66:7/71:7/72:9/283:8
renown=80

head=,id=186287,gem_id=187316,bonus_id=7187/6652/1498/6646
neck=,id=186378,bonus_id=7187/42/7575/1498/6646
shoulder=,id=186324,gem_id=187294,bonus_id=7188/6652/1485/6646
back=,id=186289,enchant_id=6204,bonus_id=7188/6652/1485/6646
chest=,id=186320,enchant_id=6230,gem_id=187293,bonus_id=7188/41/1485/6646
wrist=,id=186321,gem_id=187304,bonus_id=7188/6652/1485/6646
hands=,id=186288,bonus_id=7187/6652/1498/6646
waist=,id=186322,gem_id=187318,bonus_id=7188/6652/1485/6646
legs=,id=186285,bonus_id=7187/41/1498/6646
feet=,id=186319,bonus_id=7187/41/1498/6646
finger1=,id=178926,enchant_id=6166,gem_id=173128,bonus_id=6980/6649/6650/6935/7451/1559
finger2=,id=179355,enchant_id=6166,gem_id=169220,bonus_id=7622/7359/6652/7576/1566/6646
trinket1=,id=184842,bonus_id=6652/1472/5900/6646
trinket2=,id=186423,bonus_id=7187/6652/1498/6646
main_hand=,id=186385,enchant_id=6229,bonus_id=7187/41/1498/6646
off_hand=,id=186418,bonus_id=7187/6652/1498/6646

### Gear from Bags
#
# Shadowed Orb of Torment (252)
# trinket1=,id=186428,bonus_id=7187/41/1498/6646
#
# Titanic Ocular Gland (226)
# trinket1=,id=186423,bonus_id=7189/41/1472/6646
`

describe("Top Gear full test", () => {
    test("Test 1, Disc full gear Check", () => {
        const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
        var lines = discSet.split("\n");


        processAllLines(player, "Raid", "kyrian", lines, -1, -1)

        const wepCombos = buildWepCombos(player, true);
        const result = runTopGear(player.activeItems, wepCombos, player, "Raid", player.getHPS("Raid"), "en", {}, player.getActiveModel("Raid"))

        const itemList = result.itemSet.itemList;
        const trinkets = itemList.filter(item => item.slot === "Trinket")

        // Our trinket selection was a 203 Divine Bell, 252 Gland, 252 Shadowed Orb, and 246 Tome. 
        // Our expected result would be Bell / Gland. 
        expect(trinkets.filter(trinket => trinket.effect.name === "Instructor's Divine Bell").length).toEqual(1);
        expect(trinkets.filter(trinket => trinket.effect.name === "Titanic Ocular Gland").length).toEqual(1);
        expect(result.itemSet.domSockets).toEqual(5);
        //console.log(result);
    })

})