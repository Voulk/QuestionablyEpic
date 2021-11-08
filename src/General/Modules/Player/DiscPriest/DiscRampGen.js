


export const buildRamp = (type, applicators, trinkets, haste, specialSpells = []) => {
    
    let sequence = ['Purge the Wicked']
    
    if (trinkets.includes("Shadowed Orb")) sequence.push("Shadowed Orb");
    if (specialSpells.includes("Rapture")) {sequence.push('Rapture'); applicators -= 1 };
    for (var x = 0; x < applicators; x++) {
        sequence.push('Power Word: Shield');
    }
    if (trinkets.includes("Soulletting Ruby")) sequence.push("Soulletting Ruby");
    sequence.push('Power Word: Radiance');
    sequence.push('Power Word: Radiance');
    
    if (type === "Boon") {
        sequence.push('Evangelism');
        sequence.push('Boon of the Ascended');
        sequence.push('Ascended Blast');
        if (trinkets.includes("Flame of Battle")) sequence.push("Flame of Battle");
        sequence.push('Schism');
        const hastePerc = 1 + haste / 32 / 100;
        let boonDuration = 10 - (1.5 * 2 / hastePerc) + (1.5 / hastePerc);
        const boonPackage = (1.5 + 1 + 1) / hastePerc;

        for (var i = 0; i < Math.floor(boonDuration / boonPackage); i++) {
            sequence.push('Ascended Blast');
            if (trinkets.includes("Instructor's Divine Bell") && i === 0) sequence.push("Instructor's Divine Bell");
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
       
    }
    else if (type === "Fiend") {
        sequence.push('Evangelism');
        sequence.push('Shadowfiend');
        if (trinkets.includes("Instructor's Divine Bell")) sequence.push("Instructor's Divine Bell");
        if (trinkets.includes("Flame of Battle")) sequence.push("Flame of Battle");
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
        
    }
    else if (type === "Mini") {
        sequence.push('Schism');
        sequence.push('Mind Blast');
        sequence.push('Power Word: Solace');
        sequence.push('PenanceTick');
        sequence.push('PenanceTick');
        sequence.push('PenanceTick');

        for (var i = 0; i < 10; i++) {
            sequence.push('Smite');
        }
    }

    //console.log(sequence);
    return sequence;
    
};