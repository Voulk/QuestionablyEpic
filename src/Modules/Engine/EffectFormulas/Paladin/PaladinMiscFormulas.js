


// Returns the expected HPS of the player getting one Holy Power.
export function getOneHolyPower(player, contentType) {
    return Math.round(player.getSingleCast('Light of Dawn', contentType) / 3);
    
}

export function getPaladinCovAbility(soulbindName, player, contentType) {

    let bonus_stats = {}

    if (['Kleia', 'Pelagos', 'Mikanikos'].includes(soulbindName)) {
        // Kyrian
        
        // Add Beacon. Consider what to do with Shock Barrier.
        let holy_shock_sp = 1.55;
        let glimmer_sp = 0.38;
        let expected_glimmer_active = 7;
        let shock_barrier = 0;

        bonus_stats.HPS = (holy_shock_sp + glimmer_sp * expected_glimmer_active) * 5 * player.getStatMultiplier('NOHASTE') / 60;


    }
    else if (['Nadjia', 'Theotar', 'Draven'].includes(soulbindName)) {

        // Ashen Hallow (Venthyr)

        // The healing portion
        let expected_uptime = 0.9;
        let average_allies = 16;
        let sqrt_mult = (7.8 * Math.log(0.112 * average_allies + 1.346) / average_allies); // Check how it scales first.
        let ashen_tick_sp = 0.42;
        let ashen_ticks = 15 * player.getStatPerc('Haste');
        let ashen_healing_portion = (ashen_ticks * ashen_tick_sp * sqrt_mult * average_allies * expected_uptime * player.getStatMultiplier('NOHASTE'))

        // The extra Holy Power
        let one_holy_power = getOneHolyPower(player, contentType);
        let expected_holy_power = (30 / 7.5 * expected_uptime);
        let ashen_hammer_portion = (expected_holy_power * one_holy_power)

        bonus_stats.HPS =  (ashen_hammer_portion + ashen_healing_portion) / 240 ;
    }

    else if (['Marileth', 'Emeni', 'Heirmir'].includes(soulbindName)) {
        // Vanquishers Hammer (Necrolord)

        bonus_stats.HPS = (player.getSingleCast('Word of Glory', contentType) / 30)

    }
    

    return bonus_stats;


}