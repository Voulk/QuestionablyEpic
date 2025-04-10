

/**
 * This function will build a spell sequence for a specific ramp. There are three key ramp types included:
 * Fiend Ramps (Evang options)
 * Evang Ramps (without fiend): Includes applicators, specific trinket timings.
 * Mini Ramps: Includes a smaller number of applicators and then double radiance + DPS spells.
 *
 * @param {*} type Type describes which of the above ramp types to build a sequence for.
 * @param {*} applicators The number of single target atonement applicators to apply. Usually 10 for an Evang ramp and a little less for a mini-ramp but you can set this yourself.
 * @param {*} trinkets A list of on-use trinkets that the player is using. We can sequence these wherever we want. Generally if we're using a 2-3 minute on-use trinket we'll combine
 *                      it with Shadowfiend and if we're using a 1.5 minute trinket we'll use it with every Evang ramp. The system also supports running two 3 minute trinkets and
 *                      alternating them.
 * @param {*} haste A players current haste in whatever set they're using.
 * @param {*} playstyle Playstyles (previous examples being Kyrian Evangelism and Kyrian Spirit Shell) but more are coming very soon, and building in new playstyles should be fairly fast and easy.
 * @param {*} specialSpells Special spells are those that can change our ramp in some way. Rapture is the most prominent current example.
 * @returns The function returns a sequence of spells (which might include trinket uses).
 */
export const buildRamp = (type, applicators, trinkets, haste, playstyle, incTalents) => {
    //const talents = ['Power Word: Solace', 'Divine Star']
    const trinketList = trinkets !== undefined ? Object.keys(trinkets) : [];
    const trinketAssignments = buildTrinkets(trinketList);
    const talents = {};
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
    else if (type === "Evangelism") {
        // A ramp where we press Evangelism
        return buildEvangRamp(applicators, trinketAssignments['Fiend'], playstyle, talents, ["Shadowfiend"]);
    }
    else if (type === "Uppies") {
        //
        return buildEvangRamp(applicators, trinketAssignments['evang'], playstyle, talents, []);

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

// Most of the time we only have one on-use trinket which means we attach it to both ramps if we can.
// This function will assign which ramp our on-use trinket is attached to if that's necessary.
// This doesn't include every on-use trinket in the game, but is an easy framework to expand on if you have a specific trinket you'd like to add.
const buildTrinkets = (trinkets) => {
    const onUse = {
        "Fiend": "",
        "evang": "",
    }

    // 1.5 minute CD trinkets. We'll auto-include these in both Evang ramps.
    //if (trinkets.includes("Voidmender's Shadowgem")) { onUse.Fiend = "Voidmender's Shadowgem"; onUse.evang = "Voidmender's Shadowgem"; }

    // 2 minute or longer CD trinkets. These need to be assigned to a specific ramp. If we are wearing two such trinkets at once then assign one to our primary, and one to our secondary ramp.
    // Eg: if (trinkets.includes("Soulletting Ruby")) onUse.evang = "Soulletting Ruby";
    return onUse;
}

/**
 * A mini ramp. We'll try and include one of these in between every Evang ramp.
 * @param {*} applicators The number of single target atonement applicators. Configurable.
 * @param {*} trinkets Any trinkets we want to combine with our mini-ramp. Currently unused.
 * @param {*} specialSpells Any special spells we want to include in our mini-ramp. Currently unused.
 * @param {*} playstyle Our current playstyle.
 * @returns Returns a sequence of spells representing a mini ramp.
 */
export const buildMiniRamp = (applicators, trinkets, playstyle, talents, haste) => {
    let sequence = [];
    let t = 0;

    sequence.push('Shadow Word: Pain');

    for (var x = 0; x < applicators; x++) {
        if (talents.trainOfThought && x % 4 === 0) sequence.push('Power Word: Shield');
        else if (!talents.trainOfThought && x % 5 === 0) sequence.push('Power Word: Shield');
        else sequence.push('Renew');
    }

    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    //sequence.push('Shadow Covenant');
    //sequence.push('Schism');
    sequence.push(getPenance(talents));
    sequence.push('Mind Blast');
    sequence.push('Mind Blast');
    //if (talents.powerWordSolace) sequence.push('Power Word: Solace');
    sequence.push("Smite");
    sequence.push('Shadow Word: Death');
    if (talents.divineStar) sequence.push("Divine Star");
    sequence.push("Power Word: Shield");
    for (var i = 0; i < 3; i++) {
        sequence.push('Smite');
    }
    sequence.push(getPenance(talents));

    for (var i = 0; i < 6; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics.
        sequence.push('Smite');
    }
    return sequence;
}

export const buildMicroRamp = (applicators, trinkets, playstyle, talents, haste) => {
    let sequence = [];
    let t = 0;

    sequence.push('Shadow Word: Pain');

    for (var x = 0; x < applicators; x++) {
        if (talents.trainOfThought && x % 4 === 0) sequence.push('Power Word: Shield');
        else if (!talents.trainOfThought && x % 5 === 0) sequence.push('Power Word: Shield');
        else sequence.push('Renew');
    }

    sequence.push(getPenance(talents));
    //if (talents.powerWordSolace) sequence.push('Power Word: Solace');
    sequence.push("Smite");
    if (talents.divineStar) sequence.push("Divine Star");

    for (var i = 0; i < 3; i++) {
        sequence.push('Smite');
    }
    sequence.push("Power Word: Shield");
    sequence.push(getPenance(talents));

    for (var i = 0; i < 3; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics.
        sequence.push('Smite');
    }
    return sequence;

}

/**
 * A mini ramp. We'll try and include one of these in between every Evang ramp.
 * @param {*} applicators The number of single target atonement applicators. Configurable.
 * @param {*} trinkets Any trinkets we want to combine with our mini-ramp. Currently unused.
 * @param {*} specialSpells Any special spells we want to include in our mini-ramp. Currently unused.
 * @param {*} playstyle Our current playstyle.
 * @returns Returns a sequence of spells representing a mini ramp.
 */
 export const buildRaptureRamp = (applicators, trinkets, playstyle, talents, haste) => {
    let sequence = [];
    let t = 0;

    sequence.push('Shadow Word: Pain');


    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield')
    }

    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    //sequence.push('Shadow Covenant');
    //sequence.push('Schism');
    //sequence.push("Light's Wrath")
    sequence.push('Mind Blast');
    sequence.push(getPenance(talents));
    sequence.push('Shadow Word: Death');
    sequence.push('Halo');
    sequence.push('Mind Blast');
    //if (talents.powerWordSolace) sequence.push('Power Word: Solace');
    sequence.push("Smite");
    if (talents.divineStar) sequence.push("Divine Star");

    for (var i = 0; i < 3; i++) {
        sequence.push('Smite');
    }
    sequence.push("Power Word: Shield");
    sequence.push(getPenance(talents));

    for (var i = 0; i < 6; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics.
        sequence.push('Smite');
    }
    return sequence;
}

/**
 * Generates a Fiend ramp sequence.
 *
 * @param {*} applicators Number of single target atonement applicators. Default is 10 but configurable.
 * @param {*} trinket The specific trinket we'd like to combine with our Fiend ramp. Note that a name is fine here. We don't need ilvl information since we'll pull that later.
 * @param {*} specialSpells Any special spells we'd like to include in the ramp like Rapture.
 * @param {*} playstyle Previous examples: Kyrian Evangelism, Kyrian Spirit Shell, Venthyr Evanglism, Venthyr Spirit Shell.
 * @returns Returns a sequence of spells representing a Shadowfiend ramp.
 */
export const buildEvangRamp = (applicators, trinket, playstyle, talents, specialSpells = []) => {
    let sequence = []

    sequence.push('Shadow Word: Pain');
    sequence.push('Power Word: Shield');

    for (var x = 0; x < 6; x++) sequence.push('Renew');
    sequence.push('Power Word: Shield');
    sequence.push('Flash Heal');

    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');

    sequence.push('Evangelism');
    if (specialSpells.includes("Shadowfiend")) sequence.push("Shadowfiend");
    else if (specialSpells.includes("Mindbender")) sequence.push("Mindbender");
    sequence.push('Mind Blast');
    // Premonition
    sequence.push('Smite');
    sequence.push('Premonition of Piety');
    sequence.push('Penance');
    sequence.push('Smite');
    sequence.push('Penance');
    sequence.push('Smite');
    sequence.push('Penance');
    sequence.push('Smite');
    sequence.push('Penance');
    sequence.push('Smite');
    sequence.push('Shadow Word: Death');

    for (var i = 0; i < 4; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics.
        sequence.push('Smite');
    }
    sequence.push('Penance');


    return sequence;
}

