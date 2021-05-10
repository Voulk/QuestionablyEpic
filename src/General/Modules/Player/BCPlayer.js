

import Player from './Player';

class BCPlayer extends Player {
    constructor(playerName, specName, charID, region, realm, race, statWeights = "default") {
        super(playerName, specName, charID, region, realm, race, statWeights)
        this.gameType = "BurningCrusade"


    }

}

export default BCPlayer;