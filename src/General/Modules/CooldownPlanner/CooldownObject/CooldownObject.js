import { bossList } from "../Data/CooldownPlannerBossList";
import ls from "local-storage";
import { defaultPlans } from "./DefaultPlans";

class Cooldowns {
  constructor(plan) {
    this.cooldowns = JSON.parse(ls.get("cooldownPlans")) || [];

    if (Object.entries(this.cooldowns[0]).length === 1) {
      bossList.filter((filter) => filter.zoneID === 2481).map((map) => Object.assign(this.cooldowns[0], { [map.DungeonEncounterID]: this.defaultTimeGenerator(map.DungeonEncounterID) }));
      this.updateCooldownsAll(this.cooldowns);
    }

    // Generate New Default on Load
    if (Object.entries(this.cooldowns[0]).length > 1) {
      bossList
        .filter((filter) => filter.zoneID === 2481)
        .map((map) => Object.assign(this.cooldowns[0][map.DungeonEncounterID]["Heroic"]["default"], this.defaultTimeGenerator(map.DungeonEncounterID)["Heroic"]["default"]));
      bossList
        .filter((filter) => filter.zoneID === 2481)
        .map((map) => Object.assign(this.cooldowns[0][map.DungeonEncounterID]["Mythic"]["default"], this.defaultTimeGenerator(map.DungeonEncounterID)["Mythic"]["default"]));
      this.updateCooldownsAll(this.cooldowns);
    }

    // bossList.filter((filter) => filter.zoneID === 2481).map((map) => Object.assign(this.cooldowns[0], { [map.DungeonEncounterID]: this.defaultTimeGenerator(map.DungeonEncounterID) }));
    // this.updateCooldownsAll(this.cooldowns);
  }

  getCooldownsArray = () => {
    return this.cooldowns;
  };

  getCooldowns = (bossID, difficulty) => {
    return this.cooldowns[0][bossID][difficulty];
  };

  getBossPlanNames = (bossID, difficulty) => {
    return Object.keys(this.cooldowns[0][bossID][difficulty]);
  };

  addCooldown = (item) => {
    this.cooldowns.push(item);
  };

  addNewPlan = (planName, boss, difficulty) => {
    Object.assign(this.cooldowns[0][boss][difficulty], { [planName]: [] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  copyNewPlan = (planName, boss, newPlanName, difficulty) => {
    Object.assign(this.cooldowns[0][boss][difficulty], { [newPlanName]: this.cooldowns[0][boss][difficulty][planName] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };
  f;

  deletePlan = (planName, boss, difficulty) => {
    delete this.cooldowns[0][boss][difficulty][planName];
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  deleteCooldown = () => {
    this.cooldowns = [];
  };

  importPlan = (boss, planName, importedPlanObject, difficulty) => {
    Object.assign(this.cooldowns[0][boss][difficulty], { [planName]: importedPlanObject });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  updateCooldownPlan = (boss, plan, cooldowns, difficulty) => {
    this.cooldowns[0][boss][difficulty][plan] = cooldowns;
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
