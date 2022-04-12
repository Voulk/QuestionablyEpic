
// Partially implemented. Complete if spells other than Rejuv are required.
export function processDruidRawHealing(player, spellID) {

    // Tree of Life
    const treeUptime = 30 / 180;
    const treeHealingIncreases = {774: 1.15 * 1.5, 48438: 8/6 * 1.15}
    const treeHealingInc = (treeHealingIncreases[spellID] * treeUptime + (1 - treeUptime));

    // Flourish
    const flourishUptime = 8 / 90;
    const flourishHealingIncreases = {774: 2};
    const flourishHealingInc = flourishHealingIncreases[spellID] * flourishUptime + (1 - flourishUptime);

    return (treeHealingInc * flourishHealingInc);
  
  }