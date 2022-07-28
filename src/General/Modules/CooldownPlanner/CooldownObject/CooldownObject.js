import { bossList, raidDB } from "../Data/CooldownPlannerBossList";
import ls from "local-storage";
import { defaultPlans } from "./DefaultPlans";

class Cooldowns {
  constructor(plan) {
    this.cooldowns = JSON.parse(ls.get("cooldownPlans")) || {};
    raidDB.map((key) => {
      bossList
        .filter((filter) => filter.zoneID === key.ID)
        .map((map) => {
          if (Object.entries(this.cooldowns[map.DungeonEncounterID] === undefined || this.cooldowns[map.DungeonEncounterID]).length === 0) {
            Object.assign(this.cooldowns, { [map.DungeonEncounterID]: this.defaultTimeGenerator(map.DungeonEncounterID) });
          }
        });
      this.updateCooldownsAll(this.cooldowns);
    });

    // Generate New Default on Load
    if (Object.entries(this.cooldowns).length > 0) {
      raidDB.map((key) => {
        bossList
          .filter((filter) => filter.zoneID === key.ID)
          .map((map) => Object.assign(this.cooldowns[map.DungeonEncounterID]["Heroic"]["default"], this.defaultTimeGenerator(map.DungeonEncounterID)["Heroic"]["default"]));
        bossList
          .filter((filter) => filter.zoneID === key.ID)
          .map((map) => Object.assign(this.cooldowns[map.DungeonEncounterID]["Mythic"]["default"], this.defaultTimeGenerator(map.DungeonEncounterID)["Mythic"]["default"]));
      });
      this.updateCooldownsAll(this.cooldowns);
    }
  }

  getCooldownsArray = () => {
    return this.cooldowns;
  };

  getCooldowns = (bossID, difficulty) => {
    return this.cooldowns[bossID][difficulty];
  };

  getBossPlanNames = (bossID, difficulty) => {
    return Object.keys(this.cooldowns[bossID][difficulty]);
  };

  addCooldown = (item) => {
    this.cooldowns.push(item);
  };

  addNewPlan = (planName, boss, difficulty) => {
    Object.assign(this.cooldowns[boss][difficulty], { [planName]: [] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  copyNewPlan = (planName, boss, newPlanName, difficulty) => {
    Object.assign(this.cooldowns[boss][difficulty], { [newPlanName]: this.cooldowns[boss][difficulty][planName] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  importLogPlan = (planName, boss, difficulty, planData) => {
    Object.assign(this.cooldowns[boss][difficulty], { [planName]: planData });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  deletePlan = (planName, boss, difficulty) => {
    delete this.cooldowns[boss][difficulty][planName];
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  deleteCooldown = () => {
    this.cooldowns = [];
  };

  importPlan = (boss, planName, importedPlanObject, difficulty) => {
    Object.assign(this.cooldowns[boss][difficulty], { [planName]: importedPlanObject });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  updateCooldownPlan = (boss, plan, cooldowns, difficulty) => {
    this.cooldowns[boss][difficulty][plan] = cooldowns;
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  updateCooldownsAll = (object) => {
    ls.set("cooldownPlans", JSON.stringify(object));
  };

  defaultTimeGenerator = (bossID) => {
    let defaultTimers = defaultPlans[bossID];
    return defaultTimers;
  };
}
export default Cooldowns;
