

// Returns a throughput value.

import { getSpellThroughput } from "./ProfileUtilities";

// 
export const runSpellScript = (scriptName: string, state: any, spell: any) : number => {
    let throughput = 0;

    switch (scriptName) {
        case "Wild Growth":
            // Wild Growth caught a 4% nerf in Dragonflight, and this is applied to the decayrate also.
            // Unstoppable Growth is a 15/30% reduction to the Decay rate.

            const tickCount = 7 * state.statPercentages.haste;
            const buffDuration = 7;
            const tickRate = 1 / state.statPercentages.haste; 
            let totalHealing = 0;

            for (let i = 1; i <= Math.ceil(tickCount); i++) {

                const partialTickSize = (i === Math.ceil(tickCount)) ? (tickCount % 1) : 1;
                const decayRate = 0.07 * 1.878 * (1 - state.talents["Unstoppable Growth"].points * 0.15) / buffDuration;
                const t = Math.min(i * tickRate, buffDuration); // We'll use min here because a partial tick will occur early (at the end).
                //const inTree = state.activeBuffs.filter(x => x.name === "Incarnation: Tree of Life").length > 0;
                
                // The Wild Growth aura is applied at the end, after the decay has been applied.
                const netCoeff = ((spell.coeff) - decayRate * t)// * spell.specialMod;

                const wgCast = {
                    name: "Wild Growth",
                    coeff: netCoeff, 
                    aura: spell.aura,
                    targets: spell.targets,// + (inTree ? 2 : 0),
                    expectedOverheal: spell.expectedOverheal, 
                    secondaries: spell.secondaries,
                    type: "heal",
                }

                totalHealing += getSpellThroughput(wgCast, state.statPercentages, state.spec, state.settings, {}) * partialTickSize;
            }

            throughput = totalHealing;
    }

    return throughput;
}