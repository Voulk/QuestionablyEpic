

// Returns the effective target count of the spell.
export const getTargetScript = (scriptName: string, targets: number, specialFields: any) : number => {
    if (scriptName === "Sqrt") {
        return getSqrt(targets, specialFields.sqrtMin);
    }
    else if (scriptName === "Temporal Anomaly") {
        let effectiveMult = 0;
        for (let i = 1; i <= targets; i++) {
            if (i <= 5) effectiveMult += 1;
            else effectiveMult += (1 / Math.pow((i - 5 + 1), (4/5)));
            
        }
        return effectiveMult;
    }
    else if (scriptName === "Chain Heal") {
        // Each target takes X - fallOff with the fallOff being based on the previous target.
        let effectiveMult = 0;
        let currentMult = 1;
        for (let i = 1; i <= targets; i++) {
            effectiveMult += currentMult;
            currentMult *= (1 - specialFields.chainHealFalloff);
        }
        return effectiveMult;
    }
    else {
        console.error("Invalid Target Script");
        return targets;
    }
}

// The formula for sqrt abilties is a bit of a pain.
// Spells heal for full value up to sqrtMin targets, then fall off as (targets - sqrtMin + 1)^-scalar beyond that.
export const getSqrt = (targets: number, sqrtMin: number, scalar: number = 3/4) => {
    return sqrtMin + (1 / Math.pow(targets - sqrtMin + 1, scalar)) * (20 - sqrtMin);
}

export const getSqrtHalo = (targets: number, sqrtMin: number) => {


}

export const getSqrtCustom = (spellName: string, targets: number, sqrtMin: number) => {

}