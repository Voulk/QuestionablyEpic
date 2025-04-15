


// Returns the expected healing from a single mastery event. Does not include base mastery. You can use this to work out how much healing X mastery would add given Y mastery events.
export function getMasteryAddition(intellect, mastery, crit, versatility) {
    const expectedOverhealing = 0.48;
    return Math.round(Math.round(mastery / 8.33) * intellect * crit * versatility * (1 - expectedOverhealing) / 100);

}