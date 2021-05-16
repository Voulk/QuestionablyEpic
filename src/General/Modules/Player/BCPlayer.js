import Player from './Player';
import CastModel from "./CastModel";

class BCPlayer extends Player {
    constructor(playerName, specName, charID, region, realm, race, statWeights = "default") {
        super(playerName, specName, charID, region, realm, race, statWeights, "BurningCrusade")
        this.gameType = "BurningCrusade"
        this.setupDefaults(specName);
    }

    setupDefaults = (spec) => {
        console.log("Printing BC Defaults");
        this.castModel = {
            Raid: new CastModel(spec, "Raid"),
            Dungeon: new CastModel(spec, "Dungeon"),
        };
        this.statWeights = {
            Raid: {
                intellect: 1.3,
                bonushealing: 1,
                spirit: 0.1,
                crit: 1.21,
                stamina: 0.01,
                mp5: 2.3,
                haste: 0.7,
            },
            Dungeon: {
            },
            DefaultWeights: true,
          };
    }

}

export default BCPlayer;