import { hasTalent } from "General/Modules/Player/ClassDefaults/Generic/RampBase";

// spend 25k mana, 1 stack granted + chance = crit % to crit another
const SPEND_PER_STACK = 25000;
const MANA_PER_STACK = 6480;
const SEC_PER_STACK = 0.5; // hasted

// overcapping is not desired, but it can happen
const NATURAL_STACK_EFFICIENCY = 0.98;
// lifecycles especially, if we're casting back to back often
// vivify during high damage, enveloping mist during yu'lon
const LIFECYCLES_STACK_EFFICIENCY = 0.85;

export const getManaTeaStackValues = (talents: any, haste: number): { manaPerStack: number, secPerStack: number } => {
    const energizingBrew = hasTalent(talents, "Energizing Brew");

    return {
        manaPerStack: MANA_PER_STACK * (energizingBrew ? 1 + talents["Energizing Brew"].values[1] / 100 : 1),
        secPerStack: (SEC_PER_STACK * (energizingBrew ? 1 + talents["Energizing Brew"].values[0] / 100 : 1)) / haste,
    };
}

export const getNaturalStacks = (spend: number, crit: number): number =>
    (spend / SPEND_PER_STACK) * crit * NATURAL_STACK_EFFICIENCY;

export const getRefreshmentStacks = (talents: any, lifeCocoonCPM: number): number => {
    if (!hasTalent(talents, "Refreshment")) return 0;

    // unlike natural gen and lifecycles, cannot crit
    return talents["Refreshment"].values[0] * lifeCocoonCPM;
}

export const getLifecyclesStacks = (talents: any, primaryHealCPM: number, kickCPM: number, crit: number): number => {
    if (!hasTalent(talents, "Lifecycles")) return 0;

    const stacksPerProc = talents["Lifecycles"].values[0];
    const healToKickChance = talents["Lifecycles"].values[1] / 100;
    const kickToHealChance = talents["Lifecycles"].values[2] / 100;

    return stacksPerProc * crit * LIFECYCLES_STACK_EFFICIENCY
         * (Math.min(primaryHealCPM * healToKickChance, kickCPM)
          + Math.min(kickCPM * kickToHealChance, primaryHealCPM));
}
