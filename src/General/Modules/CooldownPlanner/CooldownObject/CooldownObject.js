import { bossList } from "../Data/CooldownPlannerBossList";
import ls from "local-storage";

class Cooldowns {
  constructor(plan) {
    this.cooldowns = JSON.parse(ls.get("cooldownPlans")) || [{ default: { default: [] } }];

    if (Object.entries(this.cooldowns[0]).length === 1) {
      bossList.filter((filter) => filter.zoneID === 2450 || filter.zoneID === 2481).map((map) => Object.assign(this.cooldowns[0], { [map.DungeonEncounterID]: { default: [] } }));
      this.updateCooldownsAll(this.cooldowns);
    }
  }

  getCooldownsArray = () => {
    return this.cooldowns;
  };

  getCooldowns = (bossID) => {
    return this.cooldowns[0][bossID];
  };

  getBossPlanNames = (bossID) => {
    return Object.keys(this.cooldowns[0][bossID]);
  };

  addCooldown = (item) => {
    this.cooldowns.push(item);
  };

  addNewPlan = (planName, boss) => {
    Object.assign(this.cooldowns[0][boss], { [planName]: [] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  copyNewPlan = (planName, boss, newPlanName) => {
    Object.assign(this.cooldowns[0][boss], { [newPlanName]: this.cooldowns[0][boss][planName] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  deletePlan = (planName, boss) => {
    delete this.cooldowns[0][boss][planName];
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  deleteCooldown = () => {
    this.cooldowns = [];
  };

  importPlan = (boss, planName, importedPlanObject) => {
    Object.assign(this.cooldowns[0][boss], { [planName]: importedPlanObject });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  updateCooldownPlan = (boss, plan, cooldowns) => {
    this.cooldowns[0][boss][plan] = cooldowns;
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  updateCooldownsAll = (object) => {
    ls.set("cooldownPlans", JSON.stringify(object));
  };
}
export default Cooldowns;
