export const TRINKETDB = {
    "Soulletting Ruby": [{
        type: "buff",
        castTime: 0, // While this has a 2s cast time, it can be used well before our ramp starts which means it functionally does not cost us cast time.
        cost: 0,
        cooldown: 120,
        buffDuration: 16,
        buffType: 'stats',
        stat: "crit",
        value: 1, // Trinket values are replaced by the value on the specific version of the trinket.
    }]
}