

/**
 * This function will build a spell sequence for a specific ramp. There are three key ramp types included:
 * Boon Ramps (Evang / Spirit Shell options): Includes applicators, specific trinket timings and a dynamic rotation that includes haste. 
 * Fiend Ramps (+ Mindgames if Venthyr + Evang / Shell options)
 * Mini Ramps: Includes a smaller number of applicators and then double radiance + DPS spells. Includes Mindgames if Venthyr. 
 * 
 * @param {*} type Type describes which of the above ramp types to build a sequence for.
 * @param {*} applicators The number of single target atonement applicators to apply. Usually 10 for an Evang ramp and a little less for a mini-ramp but you can set this yourself.
 * @param {*} trinkets A list of on-use trinkets that the player is using. We can sequence these wherever we want. Generally if we're using a 2-3 minute on-use trinket we'll combine
 *                      it with Boon and if we're using a 1.5 minute trinket we'll use it with every Evang / Shell ramp. The system also supports running two 3 minute trinkets and 
 *                      alternating them.
 * @param {*} haste A players current haste in whatever set they're using. This is mostly just used for building our Boon sequence.
 * @param {*} playstyle Playstyles currently include Kyrian Evangelism and Kyrian Spirit Shell but more are coming very soon, and building in new playstyles should be fairly fast and easy.
 * @param {*} specialSpells Special spells are those that can change our ramp in some way. Rapture is the most prominent current example.
 * @returns The function returns a sequence of spells (which might include trinket uses).
 */
 export const buildEvokerRamp = (type, applicators, trinkets, haste, playstyle, incTalents) => {
    //const talents = ['Power Word: Solace', 'Divine Star']
    const trinketList = []
    const talents = {};
    console.log(incTalents);
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    }

    // A mini-ramp includes two Radiance charges
    if (type === "Mini") {
        return buildMiniRamp(applicators, trinkets, playstyle, talents);
    }
    // A micro-ramp doesn't include any Radiance charges or major cooldowns at all. We tend to throw these out through a fight in between ramps.
    else if (type === "Micro") {
        return buildMicroRamp(applicators, trinkets, playstyle, talents);
    }
    else if (type === "Blossom") { 
        // With Boon gone, our primary ramp will generally be with Fiend. 
        // The particular label doesn't matter all that much since it's just a way to categorize what we're intending to cast. 
        return buildBlossomBurstFull(applicators, [], playstyle, talents, haste); 
    }
    else if (type === "Reversion") {
        // 
        return buildReversionSequence(applicators, [], playstyle, talents, haste); 

        // Further ramp types can be added here. 
    }
    else if (type === "RaptureLW") {
        // 
        return buildRaptureRamp(applicators, trinketList['Fiend'], playstyle, talents, ["Light's Wrath"]); 

        // Further ramp types can be added here. 
    }
    else {
        console.error("Invalid Ramp");
    }
}

const getPenance = (talents) => {
    // Get the chosen Penance variety. 
    if (talents.contrition) return "DefPenance"
    else return "Penance";
}

// Most of the time we only have one on-use trinket which means we attach it to both ramps if we can, or Boon if we can't.
// This function will assign which ramp our on-use trinket is attached to if that's necessary. 
// This doesn't include every on-use trinket in the game, but is an easy framework to expand on if you have a specific trinket you'd like to add.
const buildTrinkets = (trinkets) => {
    const onUse = {
        "Fiend": "",
        "Boon": "",
    }

    return onUse;
}

/**

 */
export const buildBlossomBurstFull = (applicators, trinkets, playstyle, talents, haste) => {
    let sequence = [];
    let t = 0;

    //sequence.push("Temporal Anomaly");
    sequence.push("Living Flame D");
    sequence.push("Living Flame D");
    sequence.push("Living Flame D");

    //sequence.push("Temporal Anomaly");
    //sequence.push("Reversion");

    sequence.push("Emerald Blossom");
    sequence.push("Emerald Blossom");
    sequence.push("Emerald Blossom");


    return sequence;
}

export const buildReversionSequence = (applicators, trinkets, playstyle, talents) => {
    let sequence = [];
    let t = 0;

    return ["Temporal Anomaly", "Echo", "Echo", "Echo", "Reversion"];
}

