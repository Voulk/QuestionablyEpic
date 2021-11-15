

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
export const buildRamp = (type, applicators, trinkets, haste, playstyle, specialSpells = []) => {
    const trinketList = buildTrinkets(trinkets);
    if (type === "Mini") {
        return buildMiniRamp(applicators, trinkets, specialSpells, playstyle);
    }
    else if (type === "Fiend") {
        return buildFiendRamp(applicators, trinketList['Fiend'], specialSpells, playstyle);
    }
    else if (type === "Boon") {
        if (playstyle === "Kyrian Evangelism") {
            return buildBoonEvangRamp(applicators, trinketList['Boon'], haste, specialSpells);
        }
        else if (playstyle === "Kyrian Spirit Shell") {
            return buildBoonShellRamp(applicators, trinketList['Boon'], haste, specialSpells);
        }
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
export const buildMiniRamp = (applicators, trinkets, specialSpells, playstyle) => {
    let sequence = ['Purge the Wicked']
    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield');
    }
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    sequence.push('Schism');
    sequence.push('Mind Blast');
    sequence.push('Power Word: Solace');
    sequence.push('PenanceTick');
    sequence.push('PenanceTick');
    sequence.push('PenanceTick');

    for (var i = 0; i < 10; i++) {
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
export const buildFiendRamp = (applicators, trinket, specialSpells, playstyle) => {

    let sequence = ['Purge the Wicked']
    
    if (trinket === "Shadowed Orb of Torment") sequence.push("Shadowed Orb");
    if (specialSpells.includes("Rapture")) {sequence.push('Rapture'); applicators -= 1 };
    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield');
    }
    if (trinket === "Soulletting Ruby") sequence.push("Soulletting Ruby");
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');


    sequence.push('Evangelism');
    sequence.push('Shadowfiend');
    if (trinket === "Instructor's Divine Bell") sequence.push("Instructor's Divine Bell");
    if (trinket === "Flame of Battle") sequence.push("Flame of Battle");
    sequence.push('Schism');
    sequence.push('Mind Blast');
    sequence.push('Power Word: Solace');
    //sequence.push('Penance');
    sequence.push('PenanceTick');
    sequence.push('PenanceTick');
    sequence.push('PenanceTick');

    for (var i = 0; i < 15; i++) {
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
    let sequence = ['Purge the Wicked']
    
    if (trinket === "Shadowed Orb of Torment") sequence.push("Shadowed Orb");
    if (specialSpells.includes("Rapture")) {sequence.push('Rapture'); applicators -= 1 };
    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield');
    }
    if (trinket === "Soulletting Ruby") sequence.push("Soulletting Ruby");
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    
    sequence.push('Evangelism');
    sequence.push('Boon of the Ascended');
    sequence.push('Ascended Blast');
    if (trinket === "Flame of Battle") sequence.push("Flame of Battle");
    sequence.push('Schism');
    const hastePerc = 1 + haste / 32 / 100;
    let boonDuration = 10 - (1.5 * 2 / hastePerc) + (1.5 / hastePerc);
    const boonPackage = (1.5 + 1 + 1) / hastePerc;

    for (var i = 0; i < Math.floor(boonDuration / boonPackage); i++) {
        sequence.push('Ascended Blast');
        if (trinket === "Instructor's Divine Bell" && i === 0) sequence.push("Instructor's Divine Bell");
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

    // These are low value post-ramp smites but should still be included.
    for (var i = 0; i < 8; i++) {
        sequence.push('Smite');
    }
       
    console.log(sequence);
    return sequence;
    
};