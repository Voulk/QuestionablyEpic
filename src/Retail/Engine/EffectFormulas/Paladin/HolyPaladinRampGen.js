

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
export const buildRamp = (type, applicators, trinkets, haste, playstyle, specialSpells = [], talents) => {
    //const talents = ['Power Word: Solace', 'Divine Star']

    const trinketList = buildTrinkets(trinkets);
    if (type === "Mini") {
        return buildMiniRamp(applicators, trinkets, specialSpells, playstyle, talents);
    }
    else if (type === "Primary") { 
        // With Boon gone, our primary ramp will generally be with Fiend. 
        // The particular label doesn't matter all that much since it's just a way to categorize what we're intending to cast. 
        return buildFiendRamp(applicators, trinketList['Fiend'], specialSpells, playstyle, talents); 
    }
    else if (type === "Secondary") {
        // Our second Evang or Spirit Shell ramp. If we're running Fiend it won't be in here, but Mindbender might.
        // Change Note: In Shadowlands Fiend was considered a secondary ramp to Boons primary ramp. 
        if (playstyle === "Evangelism") {
            return buildBoonEvangRamp(applicators, trinketList['Boon'], haste, specialSpells, talents); 
        }
        else if (playstyle === "Spirit Shell") {
            return buildBoonShellRamp(applicators, trinketList['Boon'], haste, specialSpells, talents); // Spirit Shell NYI.
        }
        // Further ramp types can be added here.
        
    }
    else {
        console.error("Invalid Ramp");
    }
}

// Most of the time we only have one on-use trinket which means we attach it to both ramps if we can, or Boon if we can't.
// This function will assign which ramp our on-use trinket is attached to if that's necessary. 
// This doesn't include every on-use trinket in the game, but is an easy framework to expand on if you have a specific trinket you'd like to add.
const buildTrinkets = (trinkets) => {
    const onUse = {
        "Fiend": "",
        "Boon": "",
    }

    // 1.5 minute CD trinkets. We'll auto-include these in both Evang / Shell ramps. 
    if (trinkets.includes("Flame of Battle")) { onUse.Fiend = "Flame of Battle"; onUse.Boon = "Flame of Battle"; }
    if (trinkets.includes("Instructor's Divine Bell")) { onUse.Fiend = "Instructor's Divine Bell"; onUse.Boon = "Instructor's Divine Bell";}
    if (trinkets.includes("Instructor's Divine Bell (new)")) { onUse.Fiend = "Instructor's Divine Bell (new)"; onUse.Boon = "Instructor's Divine Bell (new)";}
    
    // 2 minute or longer CD trinkets. These need to be assigned to a specific ramp. If we are wearing two such trinkets at once then assign one to Boon and the other to Fiend. 
    if (trinkets.includes("Soulletting Ruby")) onUse.Boon = "Soulletting Ruby";
    else if (trinkets.includes("Shadowed Orb of Torment")) onUse.Boon = "Shadowed Orb of Torment";
    return onUse;
}

/**
 * A mini ramp. We'll try and include one of these in between every Evang / Shell ramp.
 * Venthyr can add Mindgames here, whereas for Kyrian it's just Applicators -> Double Rad -> Schism -> DPS spells.
 * @param {*} applicators The number of single target atonement applicators. Configurable. 
 * @param {*} trinkets Any trinkets we want to combine with our mini-ramp. Currently unused.
 * @param {*} specialSpells Any special spells we want to include in our mini-ramp. Currently unused.
 * @param {*} playstyle Our current playstyle. Setting playstyle to Venthyr will include Mindgames in the mini-ramp.
 * @returns Returns a sequence of spells representing a mini ramp.
 */
export const buildMiniRamp = (applicators, trinkets, specialSpells, playstyle, talents) => {
    let sequence = [];
    
    if (talents.purgeTheWicked) sequence.push('Purge the Wicked');
    else sequence.push('Shadow Word: Pain');

    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield');
    }
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    sequence.push('Schism');
    if (talents.mindgames) sequence.push("Mindgames");
    sequence.push('Penance');
    sequence.push('Mind Blast');
    if (talents.powerWordSolace) sequence.push('Power Word: Solace');
    else sequence.push("Smite");
    if (talents.divineStar) sequence.push("Divine Star");

    for (var i = 0; i < 3; i++) {
        sequence.push('Smite');
    }
    sequence.push('Penance');

    for (var i = 0; i < 6; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics. 
        sequence.push('Smite');
    }
    return sequence;
}

/**
 * Generates a Fiend ramp sequence. Also includes Mindgames if Venthyr. 
 * 
 * @param {*} applicators Number of single target atonement applicators. Default is 10 but configurable. 
 * @param {*} trinket The specific trinket we'd like to combine with our Fiend ramp. Note that a name is fine here. We don't need ilvl information since we'll pull that later.
 * @param {*} specialSpells Any special spells we'd like to include in the ramp like Rapture. 
 * @param {*} playstyle Options: Kyrian Evangelism, Kyrian Spirit Shell, Venthyr Evanglism (coming soon), Venthyr Spirit Shell (coming soon).
 * @returns Returns a sequence of spells representing a Shadowfiend ramp.
 */
export const buildFiendRamp = (applicators, trinket, specialSpells, playstyle, talents) => {
    let sequence = []

    if (talents.purgeTheWicked) sequence.push('Purge the Wicked');
    else sequence.push('Shadow Word: Pain');
    
    // Shadowed Orb lasts a very long time so if we're using it we're safe to use it at the start of our ramp (or before).
    //if (trinket === "Shadowed Orb of Torment") sequence.push("Shadowed Orb");
    if (talents.rapture) {sequence.push('Rapture'); applicators -= 1 };
    for (var x = 0; x < applicators; x++) {
        // Power Word: Shield can also be swapped out for Shadow Mend on non-Rapture ramps.
        sequence.push('Power Word: Shield');
    }

    if (talents.mindbender) sequence.push('Mindbender');
    else sequence.push('Shadowfiend');

    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    sequence.push('Evangelism');
    
    // For a Shadowfiend ramp we'll use our Bell / Flame along with our Fiend. 
    sequence.push('Schism');
    if (talents.lightsWrath) sequence.push("Light's Wrath");
    if (talents.mindgames) sequence.push('Mindgames');
    sequence.push('Penance');
    sequence.push('Mind Blast');
    if (talents.divineStar) sequence.push("Divine Star");
    if (talents.powerWordSolace) sequence.push('Power Word: Solace');
    else sequence.push("Smite");

    for (var i = 0; i < 3; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics. 
        sequence.push('Smite');
    }
    sequence.push('Penance');

    for (var i = 0; i < 8; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics. 
        sequence.push('Smite');
    }

    return sequence;
}

/**
 * Builds a Kyrian Boon & Evangelism ramp sequence. 
 * 
 * @param {*} applicators Number of single target atonement applicators. Default is 10 but configurable. 
 * @param {*} trinkets The specific trinket you want to combine with your Boon ramp.
 * @param {*} haste Your current haste level. This is for determining your Ascended Blast / Nova sequence. 
 * @param {*} specialSpells Any special spells to combine with your ramp. Rapture is a common example.
 * @returns Returns a sequence representing a Boon Evangelism ramp.
 */
export const buildBoonEvangRamp = (applicators, trinket, haste, specialSpells = []) => {
    let sequence = []
    if (specialSpells.includes('Purge the Wicked')) sequence.push('Purge the Wicked');
    else sequence.push('Shadow Word: Pain');
    
    if (trinket === "Shadowed Orb of Torment") sequence.push("Shadowed Orb");
    if (specialSpells.includes("Rapture")) {sequence.push('Rapture'); applicators -= 1 };
    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield');
    }
    if (trinket === "Soulletting Ruby") sequence.push("Soulletting Ruby");
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    if (trinket === "Instructor's Divine Bell (new)") sequence.push("Instructor's Divine Bell (new)");
    sequence.push('Evangelism');
    sequence.push('Boon of the Ascended');
    if (trinket === "Flame of Battle") sequence.push("Flame of Battle");
    sequence.push('Ascended Blast');
    
    sequence.push('Schism');

    const hastePerc = 1 + haste / 32 / 100;
    let boonDuration = 10 - (1.5 * 2 / hastePerc) + (1.5 / hastePerc);
    const boonPackage = (1.5 + 1 + 1) / hastePerc;

    if (specialSpells.includes("4T28")) {
        // If we have 4pc, Penance after our second Blast instead of double Nova.
        sequence.push('Ascended Blast');
        //sequence.push('PenanceTick');
        //sequence.push('PenanceTick');
        //sequence.push('PenanceTick');
        sequence.push('Penance');
        boonDuration -= (1.5 + 2) / hastePerc;
    }

    for (var i = 0; i < Math.floor(boonDuration / boonPackage); i++) {
        sequence.push('Ascended Blast');
        //if (trinket === "Instructor's Divine Bell" && i === 0) sequence.push("Instructor's Divine Bell");
        sequence.push('Ascended Nova');
        sequence.push('Ascended Nova');
    }

    if (boonDuration % boonPackage > (2.5 / hastePerc)) {
        sequence.push('Ascended Blast');
        sequence.push('Ascended Nova');
    }
    else if (boonDuration % boonPackage > (2 / hastePerc)) {
        sequence.push('Ascended Nova');
        sequence.push('Ascended Nova');
    }
    else if (boonDuration % boonPackage > (1.5 / hastePerc)) {
        sequence.push('Ascended Blast');
    }
    else if (boonDuration % boonPackage > (1 / hastePerc)) {
        sequence.push('Ascended Nova');
    }

    // These are low value post-ramp smites but should still be included. The number of them is configurable but of low importance outside of DPS metrics.
    for (var i = 0; i < 10; i++) {
        sequence.push('Smite');
    }
    return sequence;
    
};

/**
 * Generates a Fiend ramp sequence. Also includes Mindgames if Venthyr. 
 * 
 * @param {*} applicators Number of single target atonement applicators. Default is 10 but configurable. 
 * @param {*} trinket The specific trinket we'd like to combine with our Fiend ramp. Note that a name is fine here. We don't need ilvl information since we'll pull that later.
 * @param {*} specialSpells Any special spells we'd like to include in the ramp like Rapture. 
 * @param {*} playstyle Options: Kyrian Evangelism, Kyrian Spirit Shell, Venthyr Evanglism (coming soon), Venthyr Spirit Shell (coming soon).
 * @returns Returns a sequence of spells representing a Shadowfiend ramp.
 */
 export const buildMindgamesRamp = (applicators, trinket, specialSpells, playstyle) => {

    let sequence = []
    if (specialSpells.includes('Purge the Wicked')) sequence.push('Purge the Wicked');
    else sequence.push('Shadow Word: Pain');
    
    // Shadowed Orb lasts a very long time so if we're using it we're safe to use it at the start of our ramp (or before).
    if (trinket === "Shadowed Orb of Torment") sequence.push("Shadowed Orb");
    if (specialSpells.includes("Rapture")) {sequence.push('Rapture'); applicators -= 1 };
    for (var x = 0; x < applicators; x++) {
        // Power Word: Shield can also be swapped out for Shadow Mend on non-Rapture ramps.
        sequence.push('Power Word: Shield');
    }
    // Note for Ruby that this is the time we expect to get the buff, NOT the time we cast it.
    if (trinket === "Soulletting Ruby") sequence.push("Soulletting Ruby");
    if (trinket === "Instructor's Divine Bell") sequence.push("Instructor's Divine Bell");
    if (trinket === "Instructor's Divine Bell (new)") sequence.push("Instructor's Divine Bell (new)");
    
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    if (trinket === "Flame of Battle") sequence.push("Flame of Battle");
    sequence.push('Evangelism');
    
    // For a Shadowfiend ramp we'll use our Bell / Flame along with our Fiend. 
    sequence.push('Schism');
    sequence.push('Mindgames')
    sequence.push('Penance');
    if (specialSpells.includes("Divine Star")) sequence.push("Divine Star");
    sequence.push('Mind Blast');
    sequence.push('Power Word: Solace');

    for (var i = 0; i < 3; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics. 
        sequence.push('Smite');
    }
    sequence.push('Penance');

    for (var i = 0; i < 8; i++) {
        // The number of smites here is adjustable but also not very important outside of DPS metrics. 
        sequence.push('Smite');
    }

    return sequence;
}