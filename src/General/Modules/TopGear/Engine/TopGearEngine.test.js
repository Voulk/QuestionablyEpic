import { mergeBonusStats, getTopGearGems } from "./TopGearEngine";
import { applyDiminishingReturns } from "General/Engine/ItemUtilities"
import Player from '../../Player/Player';
import { processItem } from "General/Items/GearImport/SimCImportEngine"
import { buildNewWepCombos } from "General/Engine/ItemUtilities"
import { runTopGear } from "./TopGearEngine";
import each from "jest-each";

jest.mock('General/Modules/TopGear/Engine/TopGearEngineShared', () => {
    return {
      createFetcherWorker: jest.fn(),
      createLoaderWorker: jest.fn(),
    };
  });

describe("Top Gear Gems", () => {
    /*test("Crit / Mastery gem", () => {
        let bonusStats = {};
        const gemID = 192958;
        getTopGearGems(gemID, 5, bonusStats);

        expect(bonusStats.mastery).toEqual(66 + 4 * 70);
        expect(bonusStats.intellect).toEqual(75);
        expect(bonusStats.crit).toEqual(4 * 33);
    })*/

    test("No gems", () => {
        let bonusStats = {};
        const gemID = 192952;
        const gems = getTopGearGems(gemID, 0, bonusStats);

        expect(Object.keys(bonusStats).length).toEqual(0);
    })
});

describe("Test Stat DRs", () => {
    each`
        rawHaste | expectedResult
        ${990}  | ${990}
        ${1034}  | ${1034}
        ${1195}  | ${1195}
        ${1845}  | ${1845}
        // add new test cases here

    `.test("Checks haste DR at $rawHaste", ({ rawHaste, expectedResult }) => {
        let stats = {
            crit: 0,
            haste: rawHaste,
            versatility: 0,
            mastery: 0,
            leech: 0,
        }
        stats = applyDiminishingReturns(stats);
        expect(Math.round(stats.haste)).toBe(expectedResult);

    });

    each`
        rawMastery | expectedResult
        ${1050}  | ${1050}
        ${1636}  | ${1636}
        // add new test cases here

    `.test("Checks mastery DR at $rawMastery", ({ rawMastery, expectedResult }) => {
        let stats = {
            crit: 0,
            haste: 0,
            versatility: 0,
            mastery: rawMastery,
            leech: 0,
        }
        stats = applyDiminishingReturns(stats);
        expect(Math.round(stats.mastery)).toBe(expectedResult);

    });

    each`
        rawLeech    | expectedResult
        ${205}  | ${205}
        ${335}  | ${335}

        // add new test cases here

        `.test("Checks leech DR at $rawLeech", ({ rawLeech, expectedResult }) => {
            let stats = {
                crit: 0,
                haste: 0,
                versatility: 0,
                mastery: 0,
                leech: rawLeech,
            }
            stats = applyDiminishingReturns(stats);
            expect(Math.round(stats.leech)).toBe(expectedResult);

    });

});

describe("MergeBonusStats function", () => {
    test("Test 1, range of stats", () => {
        const bonusStatArray = [{
            intellect: 34,
            crit: 14
            },
            {
            intellect: 10,
            haste: 20,
            HPS: 99
            }];

        const expectedResult = {
            intellect: 44,
            crit: 14,
            haste: 20,
            hps: 99,
            mastery: 0,
            versatility: 0,
            leech: 0,
            mana: 0,
            dps: 0,
            allyStats: 0,
            bonusHPS: 0,
        }

        expect(mergeBonusStats(bonusStatArray)).toEqual(expectedResult);
    });

});


const drakebreakersPaladin = `
# Ubpal - Holy - 2022-12-01 22:59 - US/Tichondrius
# SimC Addon 10.0.2-03
# WoW 10.0.2.46879, TOC 100002
# Requires SimulationCraft 1000-01 or newer
 
paladin="Ubpal"
level=70
race=draenei
region=us
server=tichondrius
role=attack
professions=alchemy=90/enchanting=50
spec=holy
 
talents=BEEAwtJ2KpR8WbGzhz/jy2AP8AAAAAAQSAAAAAAAUSCClIJp0EpIBlEolcgENRkkiEJJRJFJBFEB
 
# Saved Loadout: mplus
# talents=BEEAwtJ2KpR8WbGzhz/jy2AP8AAAAAAQSAAAAAAAUSCClIJp0EpIBlEolcgENRkkiEJJRJFJBFEB
 
covenant=necrolord
soulbind=plague_deviser_marileth:4,323074/213:11:1/323091/133:11:1/323081/177:11:1/283:11:1/323095/194:11:1/352108/129:11:1/352110
# soulbind=emeni:5,342156/213:11:1/323921/161:11:1/324440/129:11:1/133:11:1/323919/177:11:1/351093/159:11:1/351094
# soulbind=bonesmith_heirmir:10,326514/213:11:1/326507/159:11:1/326512/129:11:1/133:11:1/326572/194:11:1/350935/161:11:1/350936
# conduits_available=164:11/167:11/176:11/177:11/182:11/184:11/193:11/194:11/195:11/196:11/213:11/284:11/142:11/159:11/161:11/163:11/129:11/133:11/141:11/197:11/209:11/283:11
renown=80
 
head=,id=193663,bonus_id=7977/6652/7937/8816/1594/8767
neck=,id=195210,bonus_id=8776/8984,drop_level=70
shoulder=,id=193741,bonus_id=7977/6652/8813/1594/8767
back=,id=198961,enchant_id=6593,bonus_id=8978/6652/8815/1488/8766
chest=,id=198582,bonus_id=8978/42/8816/1475/5855/8766
wrist=,id=193698,bonus_id=7977/6652/7936/8815/1594/8767
hands=,id=192008,bonus_id=6652/1468/8766
waist=,id=193669,bonus_id=7974/41/7937/8814/1568/8766
legs=,id=194350,bonus_id=8768,drop_level=70
feet=,id=198583,bonus_id=8978/6652/8814/1488/8766
finger1=,id=202117,enchant_id=6566
finger2=,id=193804,bonus_id=7976/6652/7936/1581/8766
trinket1=,id=193718,bonus_id=7977/6652/1594/8767
trinket2=,id=198407,bonus_id=6652/1414/5858/8766
main_hand=,id=197932,bonus_id=6652/1488/8766
off_hand=,id=193645,bonus_id=7977/42/1594/8767

`

const testDiscSet = `
head=,id=186325,gem_id=187286,bonus_id=7188/6652/1485/6646
neck=,id=186378,bonus_id=7187/42/7575/1498/6646
shoulder=,id=186324,gem_id=187319,bonus_id=7188/6652/1485/6646
back=,id=186289,enchant_id=6204,bonus_id=7188/6652/1485/6646
chest=,id=186320,enchant_id=6230,gem_id=187320,bonus_id=7188/41/1485/6646
wrist=,id=186321,gem_id=187297,bonus_id=7188/6652/1485/6646
hands=,id=186288,bonus_id=7187/6652/1498/6646
waist=,id=186322,gem_id=187318,bonus_id=7188/6652/1485/6646
legs=,id=179351,bonus_id=7593/7359/6652/1566/6646
feet=,id=186319,bonus_id=7187/41/1498/6646
finger1=,id=178926,enchant_id=6166,gem_id=173128,bonus_id=6980/6649/6650/6935/7451/1559
finger2=,id=179355,enchant_id=6164,gem_id=169220,bonus_id=7622/7359/6652/7576/1566/6646
trinket1=,id=184030,bonus_id=7187/6652/1498/6646
trinket2=,id=184021,bonus_id=7187/6652/1498/6646
main_hand=,id=186385,enchant_id=6229,bonus_id=7187/41/1498/6646
off_hand=,id=186418,bonus_id=7187/6652/1498/6646
`

const testDruidSet = `
head=,id=185797,bonus_id=7732/7359/43/7575/1550/6646
neck=,id=185820,bonus_id=7731/7359/6652/7574/1543/6646
shoulder=,id=178763,bonus_id=7608/7359/6652/1566/6646
back=,id=183033,enchant_id=6204,bonus_id=7188/40/1485/6646
chest=,id=185786,enchant_id=6230,bonus_id=7732/7359/41/1550/6646
wrist=,id=178702,enchant_id=6220,bonus_id=7622/7359/6652/7575/1566/6646
hands=,id=172316,bonus_id=7098/6649/6648/6718/1522
waist=,id=178699,bonus_id=7370/7359/40/7193/1524/6646
legs=,id=178819,bonus_id=7348/7359/6652/1521/6646
feet=,id=178731,bonus_id=7603/7359/6652/1550/6646
finger1=,id=178933,enchant_id=6166,bonus_id=7622/7359/41/7575/1566/6646
finger2=,id=173133,enchant_id=6166,gem_id=173128,bonus_id=7461,drop_level=60,crafted_stats=40
trinket1=,id=178769,bonus_id=7608/7359/6652/1566/6646
trinket2=,id=181334,bonus_id=6652/1472/5865/6616
main_hand=,id=178829,enchant_id=6229,bonus_id=7412/7359/6652/1524/6646
`

const testShamanSet = `
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

const testDruidSetTier = `
head=,id=188847,bonus_id=7189/6652/7578/8151/1472/6646
neck=,id=178827,bonus_id=7384/7359/6652/7193/1524/6646
shoulder=,id=188851,bonus_id=6652
back=,id=181704,enchant_id=6204,bonus_id=6652/1472/5891/6646
chest=,id=188849,bonus_id=6652
wrist=,id=188850,bonus_id=6652/7578
hands=,id=188853,bonus_id=6652
waist=,id=188852,bonus_id=7189/6652/7578/1472/6646
legs=,id=188848,bonus_id=6652
feet=,id=181406,bonus_id=6652/1472/5891/6646
finger1=,id=178869,enchant_id=6166,bonus_id=7389/7359/6652/7193/1540/6646
finger2=,id=178824,enchant_id=6166,bonus_id=7383/7359/6652/7193/1521/6646
trinket1=,id=188263,bonus_id=7189/6652/1498/6646
trinket2=,id=185818,bonus_id=7595/7359/6652/1527/6646
main_hand=,id=189754,bonus_id=7189/6652/1498/6646
off_hand=,id=178478,bonus_id=7145/1512/6616
`