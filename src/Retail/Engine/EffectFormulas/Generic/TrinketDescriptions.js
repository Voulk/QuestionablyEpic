import { raidTrinketData } from "./TrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";

export const getTrinketDescription = (trinketName) => {
    const trinketData = getTrinketData(trinketName);
    if (trinketData === null) return null;
    switch (trinketName) {
        case "Neltharion's Call to Suffering":
            return neltharionsCallToSuffering(trinketData);
        default:
            return null;
    }

}

const getTrinketData = (trinketName) => {
    const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData/*, timewalkTrinketData*/)
    let activeTrinket = trinketData.find((trinket) => trinket.name === trinketName);

    return activeTrinket;
}

const neltharionsCallToSuffering = (data) => {
    console.log(data)

    return {
        metrics: ["HPS: 500", "DPS: 500"],
        name: "Glowing Shard of the Elements",
        slot: "Trinkets",
        id: 191492,
        description:
          "This trinket is a small, glowing shard of crystal that seems to pulse with elemental energy. It emits a faint humming sound when held. The Glowing Shard of the Elements has the power to enhance the wearer's elemental abilities and grant additional resistance to elemental attacks. When activated, the trinket glows brightly, releasing a burst of energy that can damage nearby enemies and heal nearby allies. This effect can only be used once every few minutes, but the trinket also has a passive effect that increases the wearer's spell power and critical strike chance with elemental spells. The Glowing Shard of the Elements is highly sought after by spellcasters who specialize in elemental magic.",
      };

}