import { bossList } from "../Data/CooldownPlannerBossList";
import { raidList } from "../Data/Data";
import ls from "local-storage";

class Cooldowns {
  constructor(plan) {
    this.cooldowns = JSON.parse(ls.get("cooldownPlans")) || [{ default: { default: { 1: [] } } }];
    console.log(this.cooldowns.length);
    if (this.cooldowns.length === 1) {
      raidList.map((key) => {
        Object.assign(this.cooldowns[0], { [key.zoneID]: [] });
      });

      raidList.map((key) => {
        bossList.filter((filter) => filter.zoneID === key.zoneID).map((map) => Object.assign(this.cooldowns[0][key.zoneID], { ["default"]: { 1: [] }, [map.DungeonEncounterID]: { 1: [] } }));
      });

      this.updateCooldownsAll(this.cooldowns);
    }
  }

  getCooldownsArray = () => {
    return this.cooldowns;
  };

  getCooldowns = (raidID) => {
    return this.cooldowns[0][raidID];
  };

  addCooldown = (item) => {
    this.cooldowns.push(item);
  };

  deleteCooldown = () => {
    this.cooldowns = [];
  };

  updateCooldownsAll = (object) => {
    ls.set("cooldownPlans", JSON.stringify(object));
  };
}
export default Cooldowns;
