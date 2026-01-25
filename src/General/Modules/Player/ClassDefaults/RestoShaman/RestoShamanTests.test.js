import { shamanTalents } from "./RestoShamanTalents"
import { runAPLSuites, runStatSuites, runStatDifferentialSuite, runTimeSuite, runSuite, runCastProfileSuites } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite";
import { restoShamanProfile } from "General/Modules/Player/ClassDefaults/RestoShaman/RestoShamanProfile"


describe("Generic Profile Testing Environment", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");

        const activeStats = restoShamanProfile.defaultStatProfile;

        // PlayerData will be hooked into the ecosystem in more detail soon.
        // Right now some of these are reiterated in scoreShamanSet but that can be cleaned up later.
        // Settings needs to be expanded and will include metrics like mastery efficiency that a player can edit. 
        // Mastery will probably look very OP before that's added. 
        const playerData = { spec: "Restoration Shaman", profileName: "Farseer", settings: {} }
    

        const data = restoShamanProfile.scoreSet(activeStats, playerData);

        console.log(data);

        expect(true).toEqual(true);
 
    })


}); 