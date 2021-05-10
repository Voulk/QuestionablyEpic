

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
        statWeights = {
            Raid: {
                intellect: 2.04,
                bonushealing: 1.03,
            },
            Dungeon: {
            },
            DefaultWeights: true,
          };
    }

}

export default BCPlayer;