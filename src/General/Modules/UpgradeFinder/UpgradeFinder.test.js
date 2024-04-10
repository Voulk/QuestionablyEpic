
import { getSetItemLevel } from "./UpgradeFinderEngine";

describe("LFR Item Level tests", () => {
    const lfrSettings = {"raid": [0, 0]}
    const lfrMaxSettings = {"raid": [1, 1]}
    const gnarlroot = [{
        "instanceId": 1207,
        "encounterId": 2820 // Gnarlroot
    }]

    test("LFR Max - Regular Item", () => {
        expect(getSetItemLevel(gnarlroot, lfrSettings, 0, 207794)).toEqual(480);
    })
    /*
    test("LFR Max - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, lfrMaxSettings, 0, 202612)).toEqual(424);
    })

    test("LFR Standard - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, lfrSettings, 0, 202612)).toEqual(408);
    }) */
})

/*
describe("Normal Item Level tests", () => {
    const normalSettings = {"raid": [2, 2]}
    const normalMaxSettings = {"raid": [3, 3]}
    const gnarlroot = [{
        "instanceId": 1207,
        "encounterId": 2820 // Gnarlroot
    }]
    const fyrakk = [{
        "instanceId": 1207,
        "encounterId": 2677 // Sark
    }]

    // Gnarlroot drops
    
    test("Normal Max - Regular Item", () => {
        expect(getSetItemLevel(gnarlroot, normalMaxSettings, 0, 207794)).toEqual(476);
    })
    /*
    test("Normal Max - Dragonscale", () => {
        expect(getSetItemLevel(gnarlroot, normalMaxSettings, 0, 202612)).toEqual(437);
    })
    test("Normal Standard - Dragonscale", () => {
        expect(getSetItemLevel(gnarlroot, normalSettings, 0, 202612)).toEqual(421);
    })

    // Sark drops
    test("Normal Standard - Sark Regular Drop", () => {
        expect(getSetItemLevel(fyrakk, normalSettings, 0, 202565)).toEqual(424);
    })
    test("Normal Standard - Sark Rare Drop", () => {
        expect(getSetItemLevel(fyrakk, normalSettings, 0, 204465)).toEqual(431);
    })
    test("Normal Max - Sark Rare Drop", () => {
        expect(getSetItemLevel(fyrakk, normalMaxSettings, 0, 204465)).toEqual(441);
    }) 
})*/
/*
describe("Heroic Item Level tests", () => {
    const heroicSettings = {"raid": [4, 4]}
    const heroicMaxSettings = {"raid": [5, 5]}
    const kazzara = [{
        "instanceId": 1208,
        "encounterId": 2522 // Kazzara
    }]
    const sark = [{
        "instanceId": 1208,
        "encounterId": 2520 // Sark
    }]

    // Kazzara drops
    test("heroic Max - Regular Item", () => {
        expect(getSetItemLevel(kazzara, heroicMaxSettings, 0, 202573)).toEqual(441);
    })
    test("heroic Max - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, heroicMaxSettings, 0, 202612)).toEqual(441);
    })
    test("heroic Standard - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, heroicSettings, 0, 202612)).toEqual(434);
    })

    // Sark drops
    test("heroic Standard - Sark Regular Drop", () => {
        expect(getSetItemLevel(sark, heroicSettings, 0, 202565)).toEqual(437);
    })
    test("heroic Standard - Sark Rare Drop", () => {
        expect(getSetItemLevel(sark, heroicSettings, 0, 204465)).toEqual(444);
    })
    test("heroic Max - Sark Regular Drop", () => {
        expect(getSetItemLevel(sark, heroicMaxSettings, 0, 202565)).toEqual(441);
    })
    test("heroic Max - Sark Rare Drop", () => {
        expect(getSetItemLevel(sark, heroicMaxSettings, 0, 204465)).toEqual(447);
    })

})

describe("Mythic Item Level tests", () => {
    const mythicSettings = {"raid": [6, 6]}
    const mythicMaxSettings = {"raid": [7, 7]}
    const kazzara = [{
        "instanceId": 1208,
        "encounterId": 2522 // Kazzara
    }]
    const sark = [{
        "instanceId": 1208,
        "encounterId": 2520 // Sark
    }]
    const rashok = [{
        "instanceId": 1208,
        "encounterId": 2525 // Sark
    }]

    // Kazzara drops
    test("Mythic Max - Regular Item", () => {
        expect(getSetItemLevel(kazzara, mythicMaxSettings, 0, 202573)).toEqual(447);
    })
    test("Mythic Max - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, mythicMaxSettings, 0, 202612)).toEqual(447);
    })
    test("Mythic Standard - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, mythicSettings, 0, 202612)).toEqual(447);
    })

    // Rashok
    test("Mythic Standard - Rashok", () => {
        expect(getSetItemLevel(rashok, mythicSettings, 0, 202614)).toEqual(444);
    })

    test("Mythic Max - Rashok", () => {
        expect(getSetItemLevel(rashok, mythicMaxSettings, 0, 202614)).toEqual(447);
    })

    // Sark drops
    test("Mythic Standard - Sark Regular Drop", () => {
        expect(getSetItemLevel(sark, mythicSettings, 0, 202565)).toEqual(450);
    })
    test("Mythic Standard - Sark Rare Drop", () => {
        expect(getSetItemLevel(sark, mythicSettings, 0, 204465)).toEqual(457);
    })
    test("Mythic Max - Sark Regular Drop", () => {
        expect(getSetItemLevel(sark, mythicMaxSettings, 0, 202565)).toEqual(450);
    })
    test("Mythic Max - Sark Rare Drop", () => {
        expect(getSetItemLevel(sark, mythicMaxSettings, 0, 204465)).toEqual(457);
    })

}) */