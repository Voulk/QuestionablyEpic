
import Player from "General/Modules/Player/Player";
import { processItem, processCurve, processAllLines, runSimC} from "General/Items/GearImport/SimCImportEngine"

const testDruidSet = 
`
# Voulk - Restoration - 2021-11-02 15:51 - US/Stonemaul
# SimC Addon 9.1.0-01
# Requires SimulationCraft 910-01 or newer

druid="Voulk"
level=60
race=night_elf
region=us
server=stonemaul
role=attack
professions=alchemy=175/herbalism=175
talents=3323123
spec=restoration

covenant=night_fae
soulbind=niya:1,322721/273:5:0/342270/257:7:0/320687/271:7:0/260:7:0/320662
# soulbind=dreamweaver:2,
# conduits_available=261:5/262:7/263:7/264:7/265:5/266:7/267:7/268:5/269:5/270:7/273:5/274:5/275:7/276:7/279:4/257:7/258:5/259:4/260:7/254:4/255:4/256:1/271:7/272:7
renown=40

head=,id=185797,bonus_id=7732/7359/43/7575/1550/6646
neck=,id=187552,bonus_id=6652/7574
shoulder=,id=178763,bonus_id=7608/7359/6652/1566/6646
back=,id=178755,enchant_id=6204,bonus_id=7384/7359/6652/1524/6646
chest=,id=185786,enchant_id=6230,bonus_id=7732/7359/41/1550/6646
wrist=,id=178702,enchant_id=6220,bonus_id=7622/7359/6652/7575/1566/6646
hands=,id=172316,bonus_id=7098/6649/6648/6718/1522
waist=,id=178699,bonus_id=7370/7359/40/7193/1524/6646
legs=,id=178819,bonus_id=7348/7359/6652/1521/6646
feet=,id=178731,bonus_id=7603/7359/6652/1550/6646
finger1=,id=173133,enchant_id=6166,gem_id=173128,bonus_id=7461,drop_level=60,crafted_stats=40
finger2=,id=178933,enchant_id=6166,bonus_id=7622/7359/41/7575/1566/6646
trinket1=,id=178809,bonus_id=7375/7359/6652/1540/6646
trinket2=,id=178708,bonus_id=7369/7359/6652/6917/1521/6646
main_hand=,id=178829,enchant_id=6229,bonus_id=7412/7359/6652/1524/6646
`

const testShamanSet = 
`
# Voulksham - Restoration - 2021-11-03 07:40 - US/Stonemaul
# SimC Addon 9.1.0-01
# Requires SimulationCraft 910-01 or newer

shaman="Voulksham"
level=60
race=draenei
region=us
server=stonemaul
role=attack
professions=enchanting=9/skinning=29
talents=2112133
spec=restoration

covenant=necrolord
soulbind=plague_deviser_marileth:4,323074/147:1:0/323091
# conduits_available=112:4/147:1/95:1/93:1
renown=5

head=,id=178692,bonus_id=6807/6652/7193/1498/6646
neck=,id=173146,gem_id=153709,crafted_stats=49
shoulder=,id=178695,bonus_id=6807/6652/1498/6646
back=,id=180123,enchant_id=6204,bonus_id=6807/6652/1498/6646
chest=,id=180100,bonus_id=6807/6652/1498/6646
wrist=,id=178767,bonus_id=6807/42/7193/1498/6646
hands=,id=179325,bonus_id=6807/6652/1498/6646
waist=,id=180110,bonus_id=6807/6652/7194/1498/6646
legs=,id=178839,bonus_id=6807/6652/1498/6646
feet=,id=178745,bonus_id=6807/6652/1498/6646
finger1=,id=178872,bonus_id=6807/6652/7193/1498/6646
finger2=,id=178736,enchant_id=6166,bonus_id=6807/6652/7194/1498/6646
trinket1=,id=178809,bonus_id=6806/6652/1485/4785
trinket2=,id=178298,bonus_id=6784/1485/6616
main_hand=,id=178714,enchant_id=6229,bonus_id=6807/6652/1498/6646
`

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
  } 

describe("Test Curve IDs", () => {
    test("Evoker Starting Items", () => {
        expect(processCurve(30725, 59)).toEqual(229)
        expect(processCurve(30725, 60)).toEqual(239)
        expect(processCurve(30726, 59)).toEqual(242) 
    })

    test("Random Levelling Items", () => {
        expect(processCurve(16667, 51)).toEqual(139)
        expect(processCurve(16666, 59)).toEqual(183)
        
    });

    test("Timewalking Item", () => {
        expect(processCurve(56365, 70)).toEqual(359);
        expect(processCurve(69326, 70)).toEqual(411);
    });
    
    
})

describe("Test TWW Items", () => {
    const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("PVP Item", () => {
        const line = "finger1=,id=215137,bonus_id=11318/10837/10833/9626/10842/8792,crafted_stats=32/40,crafting_quality=4"
        const item = processItem(line, player, contentType, type, settings)
        expect(item.level).toEqual(606);
    });

    test("World Quest Item", () => {
        const line = "shoulder=,id=224687,bonus_id=10297/6652/1701/1643/10254";
        const item = processItem(line, player, contentType, type, settings)
        expect(item.stats.mastery).toEqual(600);
        expect(item.stats.haste).toEqual(450);
        expect(item.level).toEqual(571)
    });

    test("Dungeon Drop while leveling", () => {
        const line = "hands=,id=221162,bonus_id=10385/10387/6652,drop_level=77";
        const item = processItem(line, player, contentType, type, settings)
        expect(item.stats.versatility).toEqual(594);
        expect(item.stats.haste).toEqual(351);
        expect(item.level).toEqual(535)
    });
    

})

describe("Test Regular Items", () => {
    const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("Random Green helm", () => {
        const line = "head=,id=219369,bonus_id=11128,drop_level=73";
        const item = processItem(line, player, contentType, type, settings)
        expect(item.stats.crit).toEqual(498);

    });


});

/* These tests need to be updated with season 3 items since S2 upgrade tracks are no longer valid. We don't have many S3 items on the PTR yet but come back to this.
describe("Test Upgrade Track", () => {
    const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("Claws of Obsidian Secrets 5/8 Champion", () => {
        const line = "hands=,id=202489,bonus_id=6652/9230/7979/9325/1479/8767";
        const item = processItem(line, player, contentType, type, settings)

        expect(item.upgradeTrack).toEqual("Champion");
        expect(item.upgradeRank).toEqual(5);
        expect(item.level).toEqual(428);
    });

    
    test("Raoul's Barrelhook Bracers 1/5 Hero", () => {
        const line = "hands=,id=202489,bonus_id=6652/9230/7979/9325/1479/87wrist=,id=159356,enchant_id=6580,bonus_id=9331/6652/9415/9223/9220/9144/3301/8767";
        const item = processItem(line, player, contentType, type, settings)

        expect(item.upgradeTrack).toEqual("Hero");
        expect(item.upgradeRank).toEqual(2);
        expect(item.level).toEqual(431);
    });

    test("Bestowed Cape 3/8 Explorer", () => {
        const line = "# back=,id=204617,bonus_id=9296/1472/8766";
        const item = processItem(line, player, contentType, type, settings)

        expect(item.upgradeTrack).toEqual("Explorer");
        expect(item.upgradeRank).toEqual(3);
        expect(item.level).toEqual(382);
    });
}); */

describe("Test Crafted Items", () => {
    const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    

    test("Blue Crafted Belt", () => {
        const line = "waist=,id=219485,bonus_id=11297/11298/9627/11142/10876,crafted_stats=32/49,crafting_quality=5";
        const item = processItem(line, player, contentType, type, settings)
        expect(item.level).toEqual(590);
        expect(item.stats.mastery).toEqual(591);
        expect(item.socket).toEqual(0);
        //expect(item.uniqueEquip).toEqual("crafted");
    });


    test("Elemental Lariat", () => {
        const line = "neck=,id=193001,gem_id=192980/192921/192920,bonus_id=8836/8840/8902/8960/8783/8782/8801/8791,crafted_stats=49/32";
        const item = processItem(line, player, contentType, type, settings)
        expect(item.level).toEqual(389);

    });


    test("Obsidian Seared Hexblade", () => {
        const line = "main_hand=,id=190511,enchant_id=6628,bonus_id=8836/8840/8902/8801/8845/8791/8175/8960,crafted_stats=40/36";
        const item = processItem(line, player, contentType, type, settings)
        expect(item.level).toEqual(402);
        //expect(item.stats.crit).toEqual(176);
        expect(item.socket).toEqual(0);
        expect(item.uniqueEquip).toEqual("embellishment");
    });


    
});


/*
describe("updatePlayerStats function", () => {
    test("Sample Druid Loadout", () => {
        const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        var lines = testDruidSet.split("\n");
        const ingameStats = {
            intellect: 1575,
            haste: 790,
            crit: 385,
            mastery: 340,
            stamina: 2100,
            versatility: 330,
            leech: 109, // 107
            hps: 0,
            dps: 0,
            mana: 0,
        }

        processAllLines(player, "Raid", "night_fae", lines, -1, -1)
        expect(player.activeStats).toEqual(ingameStats)
    });

    test("Sample Shaman Loadout", () => {
        const player = new Player("VoulkSham", "Restoration Shaman", 99, "NA", "Stonemaul", "Night Elf");
        var lines = testShamanSet.split("\n");
        const ingameStats = {
            intellect: 1212,
            haste: 494,
            crit: 231,
            mastery: 335,
            stamina: 2100,
            versatility: 313,
            leech: 0,
            hps: 0,
            dps: 0,
            mana: 0,
        }

        processAllLines(player, "Raid", "night_fae", lines, -1, -1)
        expect(player.activeStats).toEqual(ingameStats)
    });

})
*/
// Add tests for Domination items.