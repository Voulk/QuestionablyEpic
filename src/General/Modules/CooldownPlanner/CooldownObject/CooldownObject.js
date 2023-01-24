import { bossList, raidDB } from "../Data/CooldownPlannerBossList";
import ls from "local-storage";
import { defaultPlans } from "./DefaultPlans";

class Cooldowns {
  constructor(plan) {
    this.cooldowns = JSON.parse(ls.get("cooldownPlans")) || {};
    this.roster = ls.get("healerInfo") || [];
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
        // bossList
        //   .filter((filter) => filter.zoneID === key.ID)
        //   .map((map) => Object.assign(this.cooldowns[map.DungeonEncounterID]["Normal"]["default"], this.defaultTimeGenerator(map.DungeonEncounterID)["Normal"]["default"]));
        bossList
          .filter((filter) => filter.zoneID === key.ID)
          .map((map) => Object.assign(this.cooldowns[map.DungeonEncounterID]["Heroic"]["default"], this.defaultTimeGenerator(map.DungeonEncounterID)["Heroic"]["default"]));
        bossList
          .filter((filter) => filter.zoneID === key.ID)
          .map((map) => Object.assign(this.cooldowns[map.DungeonEncounterID]["Mythic"]["default"], this.defaultTimeGenerator(map.DungeonEncounterID)["Mythic"]["default"]));
      });
      this.updateCooldownsAll(this.cooldowns);
    }

    // this.updateRosterToNewClasses(this.roster);
    // this.updatePlansToNewClasses([...this.cooldowns]);
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

  updateRosterToNewClasses = (arr) => {
    let updatedRoster = this.replaceClass(arr);
    ls.set("healerInfo", updatedRoster);
  };

  updatePlansToNewClasses = (arr) => {
    let updatedPlans = this.replaceClass(arr);
    ls.set("cooldownPlans", JSON.stringify(updatedPlans));
  };

  // Replace values within an array of objects or nested objects.
  replaceName = (arr, originalName, newName) =>
    arr.map((obj) => {
      // Create a new object with the same keys as the original object
      const updatedObj = { ...obj };

      // Replace the value for the "name" key with the new name if it matches the original name
      if (updatedObj.name === originalName) {
        updatedObj.name = newName;
      }

      // Replace the value for any keys that start with "name" and have a number at the end if they match the original name
      Object.keys(updatedObj).forEach((key) => {
        if (key.startsWith("name") && !isNaN(key.slice(-1))) {
          if (updatedObj[key] === originalName) {
            updatedObj[key] = newName;
          }
        }
      });

      // Recursively traverse the object and replace the name in all nested objects and arrays of objects if it matches the original name
      Object.keys(updatedObj).forEach((key) => {
        if (Array.isArray(updatedObj[key])) {
          updatedObj[key] = this.replaceName(updatedObj[key], originalName, newName);
        } else if (typeof updatedObj[key] === "object" && updatedObj[key] !== null) {
          updatedObj[key] = this.replaceName([updatedObj[key]], originalName, newName)[0];
        }
      });

      return updatedObj;
    });

  checkClassKey = (obj, originalClass, newClass) => {
    if (obj.class === originalClass) {
      obj.class = newClass;
    }

    Object.keys(obj).forEach((key) => {
      if (key.startsWith("class") && !isNaN(key.slice(-1))) {
        if (obj[key] === originalClass) {
          obj[key] = newClass;
        }
      }
    });
  };
  // Replace values within an array of objects or nested objects.
  replaceClass = (arr) => {
    let classes = {
      "Priest-Holy": "Priest",
      "Priest-Discipline": "Priest",
      "Druid-Restoration": "Druid",
      "Druid-Feral": "Druid",
      "Druid-Balance": "Druid",
      "Druid-Guardian": "Druid",
      "Paladin-Holy": "Paladin",
      "Monk-Mistweaver": "Monk",
      "Shaman-Restoration": "Shaman",
      "Shaman-Elemental": "Shaman",
      "Shaman-Enhancement": "Shaman",
      "Warrior-Fury": "Warrior",
      "Warrior-Protection": "Warrior",
      "Warrior-Arms": "Warrior",
      "DeathKnight-Frost": "DeathKnight",
      "DeathKnight-Unholy": "DeathKnight",
      "DeathKnight-Blood": "DeathKnight",
      "Priest-Shadow": "ShadowPriest",
      "DemonHunter-Havoc": "DemonHunter",
      "Evoker-Preservation": "Evoker",
      "Evoker-Devastation": "Evoker",
    };
    return arr.map((obj) => {
      // Create a new object with the same keys as the original object
      const updatedObj = { ...obj };
      Object.entries(classes).forEach(([originalClass, newClass]) => {
        this.checkClassKey(updatedObj, originalClass, newClass);

        // Recursively traverse the object and replace the class in all nested objects and arrays of objects if it matches the original class
        Object.keys(updatedObj).forEach((key) => {
          if (Array.isArray(updatedObj[key])) {
            updatedObj[key] = this.replaceClass(updatedObj[key]);
          } else if (typeof updatedObj[key] === "object" && updatedObj[key] !== null) {
            updatedObj[key] = this.replaceClass([updatedObj[key]])[0];
          }
        });
      });

      return updatedObj;
    });
  };
}

export default Cooldowns;
