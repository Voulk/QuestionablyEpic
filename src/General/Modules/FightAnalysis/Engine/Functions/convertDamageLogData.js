import { spellExclusions } from "General/Modules/CooldownPlanner/Data/SpellExclusions";

async function convertDamageLogData({ data }) {
  let damageData = Object.keys(data)
    .filter(
      (key) =>
        spellExclusions.includes(result.data.events[key].ability.guid) === false &&
        // Has to Have unmitigatedAmount
        result.data.events[key].unmitigatedAmount,
    )
    .map((key) => result.data.events[key]);

  return damageData;
}

export default convertDamageLogData;
