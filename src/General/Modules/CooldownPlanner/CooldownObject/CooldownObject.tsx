import { bossList, raidDB } from "../Data/CooldownPlannerBossList";
import * as ls from "local-storage";
import { defaultPlans } from "./DefaultPlans";

interface DefaultPlans {
  [key: number]: {
    Normal: { default: any[] };
    Heroic: { default: any[] };
    Mythic: { default: any[] };
  };
}

const plans: DefaultPlans = defaultPlans;

interface CooldownsObject {
  [key: string]: any;
}

interface RosterObject {
  [key: string]: any;
}

class Cooldowns {
  cooldowns: CooldownsObject;
  roster: RosterObject[];

  constructor(plan: any) {
    this.cooldowns = JSON.parse(ls.get("cooldownPlans")) || {};
    this.roster = ls.get("healerInfo") || [];
    raidDB.map((key) => {
      bossList
        .filter((filter) => filter.zoneID === key.ID)
        .map((map) => {
          if (Object.entries(this.cooldowns[map.DungeonEncounterID.toString()] || {}).length === 0) {
            Object.assign(this.cooldowns, { [map.DungeonEncounterID.toString()]: this.defaultTimeGenerator(map.DungeonEncounterID) });
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

      // Replace old classes with new classes
      let classes = {
        HolyPriest: "Priest",
        DisciplinePriest: "Priest",
        RestorationDruid: "Druid",
        HolyPaladin: "Paladin",
        MistweaverMonk: "Monk",
        RestorationShaman: "Shaman",
        ShamanDPS: "Shaman",
        ShadowPriest: "Priest",
        HavocDemonHunter: "DemonHunter",
        PreservationEvoker: "Evoker",
        DevastationEvoker: "Evoker",
      };

      Object.entries(classes).forEach(([originalClass, newClass]) => {
        this.cooldowns = this.findAndReplace(this.cooldowns, originalClass, newClass);
      });
      this.updateCooldownsAll(this.cooldowns);

      Object.entries(classes).forEach(([originalClass, newClass]) => {
        this.roster = this.findAndReplace(this.roster, originalClass, newClass);
      });
      this.updateRoster(this.roster);
    }
  }

  getCooldownsArray = (): CooldownsObject => {
    return this.cooldowns;
  };

  getCooldowns = (bossID: string, difficulty: string): any => {
    return this.cooldowns[bossID][difficulty];
  };

  getBossPlanNames = (bossID: string, difficulty: string): string[] => {
    return Object.keys(this.cooldowns[bossID][difficulty]);
  };

  addCooldown = (item: any): void => {
    this.cooldowns.push(item);
  };

  addNewPlan = (planName: string, boss: string, difficulty: string): void => {
    Object.assign(this.cooldowns[boss][difficulty], { [planName]: [] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  copyNewPlan = (planName: string, boss: string, newPlanName: string, difficulty: string): void => {
    Object.assign(this.cooldowns[boss][difficulty], { [newPlanName]: this.cooldowns[boss][difficulty][planName] });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  importLogPlan = (planName: string, boss: string, difficulty: string, planData: any): void => {
    Object.assign(this.cooldowns[boss][difficulty], { [planName]: planData });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  deletePlan = (planName: string, boss: string, difficulty: string): void => {
    delete this.cooldowns[boss][difficulty][planName];
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  deleteCooldown = (): void => {
    this.cooldowns = [];
  };

  importPlan = (boss: string, planName: string, importedPlanObject: any, difficulty: string): void => {
    Object.assign(this.cooldowns[boss][difficulty], { [planName]: importedPlanObject });
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  updateCooldownPlan = (boss: string, plan: string, cooldowns: any, difficulty: string): void => {
    this.cooldowns[boss][difficulty][plan] = cooldowns;
    ls.set("cooldownPlans", JSON.stringify(this.cooldowns));
  };

  updateCooldownsAll = (object: CooldownsObject): void => {
    ls.set("cooldownPlans", JSON.stringify(object));
  };

  updateRoster = (array: RosterObject[]): void => {
    ls.set("healerInfo", array);
  };

  defaultTimeGenerator = (bossID: number): any => {
    let defaultTimers = plans[bossID];
    return defaultTimers;
  };


  findAndReplace(data: any, findVal: any, replaceVal: any): any {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        if (data[i] === null) {
          data.splice(i, 1);
          i--;
        } else if (typeof data[i] === "object") {
          data[i] = this.findAndReplace(data[i], findVal, replaceVal);
        } else if (data[i] === findVal) {
          data[i] = replaceVal;
        }
      }
    } else if (typeof data === "object") {
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]] === findVal) {
          data[keys[i]] = replaceVal;
        } else if (typeof data[keys[i]] === "object") {
          data[keys[i]] = this.findAndReplace(data[keys[i]], findVal, replaceVal);
        }
      }
    }
    return data;
  }
}

export default Cooldowns;
