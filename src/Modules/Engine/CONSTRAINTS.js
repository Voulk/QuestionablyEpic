
// This is a set of constraints used throughout the app to guarantee the users don't mistakenly enter data that will give them
// "technically correct but not what they were looking for" type results. A 400 item level trinket might be calculated correctly,
// but isn't giving them information they can actually use. 
export const CONSTRAINTS = {
    maxItemLevel: 270,
    minItemLevel: 120,
    maxSecondaryWeight: 1.5,
    minSecondaryWeight: 0,
    maxTertiaryWeight: 3,
    minTertiaryWeight: 0,
    topGearMaxItems: 34,

}

export function setBounds(value, min, max) {
    // 30, 10, 60 returns 30. 0, 10, 60 returns 10. 
    return Math.max(min, Math.min(value, max))
}