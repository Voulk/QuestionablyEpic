import { decodeBlizzardString, getSpecTalentData } from "./TalentDecoder";


describe("decodeBlizzardString", () => {
  it("should decode a Resto Druid talent string", () => {
    const talentString = "CkGA8cL7tpvige+kkmGM9zUPWPjxMbz2MmZGz2wDwMzmxCzAAAAAAAAAAgtBNbmx0MjhHwsMzMzMMMDAAAAAAAAAgAAAmtZWa2mZzGjZmhZGgmBAYmBgB";



    const result = decodeBlizzardString(talentString, 105);
    const enabledTalents = result.selectedTalents.map(talent => talent.nodeId);


    expect(enabledTalents).toEqual(expect.arrayContaining([103876, 94628, 82210]));

    })

    it("should decode a Preservation Evoker talent string", () => {
        const talentString = "CwbBPJc41CfcseY0baneJ1IHrBAAAAAYmZ2WmHADzMmtZYMzyMGAAYGzYYMzMiZGAAAgZmZyMmZMLzMDAGYMjNWgBmRDNMsAjZGgxA";


        const result = decodeBlizzardString(talentString, 1468);
        const enabledTalents = result.selectedTalents.map(talent => talent.entryName);

        //console.log(result);

        expect(enabledTalents).toEqual(expect.arrayContaining(["Lifebind", "Nozdormu's Teachings", "Temporality"]));

    })
})