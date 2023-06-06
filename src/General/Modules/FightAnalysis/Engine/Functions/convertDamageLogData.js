import { spellExclusions } from "General/Modules/CooldownPlanner/Data/SpellExclusions";

async function convertDamageLogData(data) {
  let damageData = Object.keys(data)
    .filter(
      (key) =>
        spellExclusions.includes(data[key].ability.guid) === false &&
        // Has to Have unmitigatedAmount
        data[key].unmitigatedAmount,
    )
    .map((key) => data[key]);

  return damageData;

}

export default convertDamageLogData;
