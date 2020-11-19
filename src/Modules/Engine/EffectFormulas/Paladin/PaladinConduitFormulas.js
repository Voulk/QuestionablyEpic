

export const getPaladinConduit = (conduitID, pl, contentType, itemLevel = 156) => {
    let bonus_stats = {};
    let conduitLevel = 1; // Convert the conduit item level to a rank.
    let expectedOverhealing = 0;

    // === Potency Conduits ===
    // Enkindled Spirits
    if (conduitID === 339570) {
        let trait_bonus = 0.27 + conduitLevel * 0.03;
        let one_lod = pl.getSingleCast("Light of Dawn", contentType)
        
        bonus_stats.HPS = trait_bonus * one_lod * 3 / 180;
    }
    // Focused Light
    else if (conduitID === 339984) {
        // TODO: Wings crit uptime should be factored in here, reducing the power of the legendary slightly. 
        let trait_bonus = 0.04 + conduitLevel * 0.01;
        let holyShockBaseCrit = pl.getStatPerc('Crit') + 0.3
        let holyShockIncrease = ((holyShockBaseCrit + trait_bonus) / holyShockBaseCrit) - 1;
        //console.log("HSI: " + holyShockIncrease);

        bonus_stats.HPS = holyShockIncrease * (pl.getSpellHPS('Holy Shock', contentType) + pl.getSpellHPS('Shock Barrier', contentType));


    }
    // Resplendent Light
    else if (conduitID === 339712) {
        let trait_bonus =  0.036 + conduitLevel * 0.004;
        let targets = 4.8;
        let holyLightHPS = pl.getSpellHPS('Holy Light', contentType);
        expectedOverhealing = 0.3;

        bonus_stats.HPS = (trait_bonus * targets * holyLightHPS * (1 - expectedOverhealing));


    }
    // Untempered Dedication
    else if (conduitID === 339987) {

    }
    // Ringing Clarity (Kyrian)
    else if (conduitID === 340218) {
        let trait_bonus =  0.36 + conduitLevel * 0.04;
        let oneHolyShock = pl.getSpellHPS('Holy Shock', contentType)
        expectedOverhealing = 0.5;

        bonus_stats.HPS = (trait_bonus * oneHolyShock * 3 * (1 - expectedOverhealing)) / 60;

    }
    // Hallowed Discernment (Venthyr)
    else if (conduitID === 340212) {

    }
    // Righteous Might (Necrolord)
    else if (conduitID === 340192) {

    }
    // The Long Summer (Night Fae)
    else if (conduitID === 340185) {

    }

    // === Endurance Conduits ===
    // Divine Call
    else if (conduitID === 338741) {

    }
    // Golden Path
    else if (conduitID === 339114) {
        let trait_bonus =  1.8 + conduitLevel * 0.2;
        let consecration_CPM = 3;
        expectedOverhealing = 0.65;

        bonus_stats.HPS = (trait_bonus * consecration_CPM * 0.05 * 12 * (1 - expectedOverhealing) * pl.getStatMultiplier('NOHASTE') / 60)

    }
    // Shielding Words
    else if (conduitID === 338787) {
        let trait_bonus =  0.135 + conduitLevel * 0.015;
        expectedOverhealing = 0.04;

        bonus_stats.HPS = trait_bonus * (1 - expectedOverhealing) * pl.getSpellHPS('Word of Glory', contentType)


    }


    return bonus_stats;
}