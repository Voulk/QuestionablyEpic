import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createNathriaXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(enemyCasts.map((key) => key.ability.guid));
  const glyphOfDestruction = 325324;
  const rootOfExtinction = 329770; // Phase 2 indicator
  const edgeOfAnnihilation = 328880;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Changes                                         */
  /* ---------------------------------------------------------------------------------------------- */
  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events
  if (logGuids.includes(rootOfExtinction)) {
    const phase2 = enemyCasts.filter((filter) => filter.ability.guid === rootOfExtinction)[0];
    phase2 !== undefined ? events.push({ time: moment.utc(fightDuration(phase2.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : ""; // if valid then push "Phase 2" event
  }

  if (logGuids.includes(edgeOfAnnihilation)) {
    const phase3 = enemyCasts.filter((filter) => filter.ability.guid === edgeOfAnnihilation)[0];
    phase3 !== undefined ? events.push({ time: moment.utc(fightDuration(phase3.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : ""; // if valid then push "Phase 2" event
  }

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    if (logGuids.includes(glyphOfDestruction)) {
      const glyphOfDestructionEvents = damageTakenData.filter((filter) => filter.ability.guid === glyphOfDestruction);
      const threshold = 15000;
      events.push(
        glyphOfDestructionEvents.map((key) => {
          return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: glyphOfDestruction };
        })[0],
      );

      let lastChosen = glyphOfDestructionEvents.map((key) => key.timestamp)[0];

      glyphOfDestructionEvents.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: glyphOfDestruction });
        }
      });
    }
  }

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Mythic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Mythic"
  ) {
    if (logGuids.includes(glyphOfDestruction)) {
      const glyphOfDestructionEvents = damageTakenData.filter((filter) => filter.ability.guid === glyphOfDestruction);
      const threshold = 15000;
      events.push(
        glyphOfDestructionEvents.map((key) => {
          return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: glyphOfDestruction };
        })[0],
      );

      let lastChosen = glyphOfDestructionEvents.map((key) => key.timestamp)[0];

      glyphOfDestructionEvents.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: glyphOfDestruction });
        }
      });
    }
  }

  return events;
}
