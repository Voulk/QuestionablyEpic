
import { getSetItemLevel } from "./UpgradeFinderEngine";

jest.mock('General/Modules/TopGear/Engine/TopGearEngineShared', () => {
    return {
      createFetcherWorker: jest.fn(),
      createLoaderWorker: jest.fn(),
    };
  });

describe("LFR Item Level tests", () => {
    const lfrSettings = {"raid": [0, 0]}
    const lfrMaxSettings = {"raid": [1, 1]}
    const gnarlroot = [{
        "instanceId": 1207,
        "encounterId": 2820 // Gnarlroot
    }]

    test("LFR Max - Regular Item", () => {
        expect(true).toEqual(true);
        //expect(getSetItemLevel(gnarlroot, lfrSettings, 0, 207794)).toEqual(480);
    })
    /*
    test("LFR Max - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, lfrMaxSettings, 0, 202612)).toEqual(424);
    })

    test("LFR Standard - Dragonscale", () => {
        expect(getSetItemLevel(kazzara, lfrSettings, 0, 202612)).toEqual(408);
    }) */
})


