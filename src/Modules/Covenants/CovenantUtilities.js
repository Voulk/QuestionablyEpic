import SPECS from "../Engine/SPECS";
import ActiveConduit from "./ActiveConduit";
import { conduitDB } from "../../Databases/ConduitDB";
import { getConduitFormula } from "../Engine/EffectFormulas/EffectEngine";
import i18n from "i18next";

// Returns a full list of all class conduits in the form of an ActiveSoulbind array.
// Sets the item levels to the default. This is pulled on character creation so any SimC import can correct the item levels where necessary.
// Should be stored on the Player character.
export function getAvailableClassConduits(spec) {
  let currentLanguage = i18n.language;
  let conduits = [];
  const defaultItemLevel = 184;
  // TODO Implement the below rework, need to include the covenant in the mapping
  // example of potential rework
  // conduits
  //   .filter(
  //     (key) => key.spec === "RestorationDruid" && key.type === "Potency" && key.show === true
  //   )
  //   .map((key) =>
  //     conduits.push(
  //       new ActiveConduit(
  //         key.guid,
  //         defaultItemLevel,
  //         key.name[ActiveLanguage],
  //         key.type
  //       )
  //     )
  //   );

  const localizedName = (id) => {
    let returnedName = conduitDB
      .filter((obj) => {
        return obj.guid === id;
      })
      .map((obj) => obj.name[currentLanguage]);
    return returnedName;
  };

  if (spec === SPECS.RESTODRUID) {
    conduits.push(new ActiveConduit(340616, defaultItemLevel, localizedName(340616), "Potency"));
    conduits.push(new ActiveConduit(340621, defaultItemLevel, localizedName(340621), "Potency"));
    conduits.push(new ActiveConduit(340550, defaultItemLevel, localizedName(340550), "Potency"));
    conduits.push(new ActiveConduit(340549, defaultItemLevel, localizedName(340549), "Potency")); // done
    conduits.push(new ActiveConduit(341446, defaultItemLevel, localizedName(341446), "Potency", "Night Fae")); // done
    conduits.push(new ActiveConduit(341378, defaultItemLevel, localizedName(341378), "Potency", "Kyrian")); // done
    conduits.push(new ActiveConduit(341383, defaultItemLevel, localizedName(341383), "Potency", "Venthyr")); // done
    conduits.push(new ActiveConduit(341447, defaultItemLevel, localizedName(341447), "Potency", "Necrolord")); // done

    // TODO: Add the full set.

    conduits.push(new ActiveConduit(340553, defaultItemLevel, localizedName(340553), "Endurance"));
    conduits.push(new ActiveConduit(340529, defaultItemLevel, localizedName(340529), "Endurance")); // done
    conduits.push(new ActiveConduit(340540, defaultItemLevel, localizedName(340540), "Endurance"));
    conduits.push(new ActiveConduit(340543, defaultItemLevel, localizedName(340543), "Endurance"));
  } else if (spec === SPECS.HOLYPALADIN) {
    conduits.push(new ActiveConduit(339570, defaultItemLevel, localizedName(339570), "Potency"));
    conduits.push(new ActiveConduit(339984, defaultItemLevel, localizedName(339984), "Potency"));
    conduits.push(new ActiveConduit(339712, defaultItemLevel, localizedName(339712), "Potency"));
    conduits.push(new ActiveConduit(339987, defaultItemLevel, localizedName(339987), "Potency"));
    conduits.push(new ActiveConduit(340218, defaultItemLevel, localizedName(340218), "Potency", "Kyrian"));
    conduits.push(new ActiveConduit(340212, defaultItemLevel, localizedName(340212), "Potency", "Venthyr"));
    conduits.push(new ActiveConduit(340192, defaultItemLevel, localizedName(340192), "Potency", "Necrolord"));
    conduits.push(new ActiveConduit(340185, defaultItemLevel, localizedName(340185), "Potency", "Night Fae"));

    // Endurance
    conduits.push(new ActiveConduit(338741, defaultItemLevel, localizedName(338741), "Endurance"));
    conduits.push(new ActiveConduit(339114, defaultItemLevel, localizedName(339114), "Endurance"));
    conduits.push(new ActiveConduit(338787, defaultItemLevel, localizedName(338787), "Endurance"));
  } else if (spec === SPECS.MISTWEAVERMONK) {
    conduits.push(new ActiveConduit(336773, defaultItemLevel, localizedName(336773), "Potency"));
    conduits.push(new ActiveConduit(337241, defaultItemLevel, localizedName(337241), "Potency"));
    conduits.push(new ActiveConduit(336812, defaultItemLevel, localizedName(336812), "Potency"));
    conduits.push(new ActiveConduit(337099, defaultItemLevel, localizedName(337099), "Potency"));
    conduits.push(new ActiveConduit(337286, defaultItemLevel, localizedName(337286), "Potency", "Kyrian"));
    conduits.push(new ActiveConduit(337301, defaultItemLevel, localizedName(337301), "Potency", "Venthyr"));
    conduits.push(new ActiveConduit(337295, defaultItemLevel, localizedName(337295), "Potency", "Necrolord"));
    conduits.push(new ActiveConduit(337303, defaultItemLevel, localizedName(337303), "Potency", "Night Fae"));

    // Endurance
    conduits.push(new ActiveConduit(336853, defaultItemLevel, localizedName(336853), "Endurance"));
    conduits.push(new ActiveConduit(336632, defaultItemLevel, localizedName(336632), "Endurance"));
    conduits.push(new ActiveConduit(336379, defaultItemLevel, localizedName(336379), "Endurance"));
  } else if (spec === SPECS.DISCPRIEST) {
    conduits.push(new ActiveConduit(337790, defaultItemLevel, localizedName(337790), "Potency"));
    conduits.push(new ActiveConduit(337786, defaultItemLevel, localizedName(337786), "Potency"));
    conduits.push(new ActiveConduit(337778, defaultItemLevel, localizedName(337778), "Potency"));
    conduits.push(new ActiveConduit(337891, defaultItemLevel, localizedName(337891), "Potency"));

    conduits.push(new ActiveConduit(337966, defaultItemLevel, localizedName(337966), "Potency", "Kyrian"));
    conduits.push(new ActiveConduit(338315, defaultItemLevel, localizedName(338315), "Potency", "Venthyr"));
    conduits.push(new ActiveConduit(337979, defaultItemLevel, localizedName(337979), "Potency", "Necrolord"));
    conduits.push(new ActiveConduit(338305, defaultItemLevel, localizedName(338305), "Potency", "Night Fae"));

    // Endurance
    conduits.push(new ActiveConduit(337715, defaultItemLevel, localizedName(337715), "Endurance"));
    conduits.push(new ActiveConduit(337748, defaultItemLevel, localizedName(337748), "Endurance"));
    conduits.push(new ActiveConduit(337662, defaultItemLevel, localizedName(337662), "Endurance"));
  } else if (spec === SPECS.RESTOSHAMAN) {
    conduits.push(new ActiveConduit(338329, defaultItemLevel, localizedName(338329), "Potency"));
    conduits.push(new ActiveConduit(338343, defaultItemLevel, localizedName(338343), "Potency"));
    conduits.push(new ActiveConduit(338346, defaultItemLevel, localizedName(338346), "Potency"));
    conduits.push(new ActiveConduit(338339, defaultItemLevel, localizedName(338339), "Potency"));

    conduits.push(new ActiveConduit(339182, defaultItemLevel, localizedName(339182), "Potency", "Kyrian"));
    conduits.push(new ActiveConduit(339185, defaultItemLevel, localizedName(339185), "Potency", "Venthyr"));
    conduits.push(new ActiveConduit(339186, defaultItemLevel, localizedName(339186), "Potency", "Necrolord"));
    conduits.push(new ActiveConduit(339183, defaultItemLevel, localizedName(339183), "Potency", "Night Fae"));

    // Endurance
    conduits.push(new ActiveConduit(337964, defaultItemLevel, localizedName(337964), "Endurance"));
    conduits.push(new ActiveConduit(337974, defaultItemLevel, localizedName(337974), "Endurance"));
    conduits.push(new ActiveConduit(337981, defaultItemLevel, localizedName(337981), "Endurance"));
  } else if (spec === SPECS.HOLYPRIEST) {
    conduits.push(new ActiveConduit(337914, defaultItemLevel, localizedName(337914), "Potency"));
    conduits.push(new ActiveConduit(338345, defaultItemLevel, localizedName(338345), "Potency"));
    conduits.push(new ActiveConduit(337811, defaultItemLevel, localizedName(337811), "Potency"));
    conduits.push(new ActiveConduit(337947, defaultItemLevel, localizedName(337947), "Potency"));

    conduits.push(new ActiveConduit(337966, defaultItemLevel, localizedName(337966), "Potency", "Kyrian"));
    conduits.push(new ActiveConduit(338315, defaultItemLevel, localizedName(338315), "Potency", "Venthyr"));
    conduits.push(new ActiveConduit(337979, defaultItemLevel, localizedName(337979), "Potency", "Necrolord"));
    conduits.push(new ActiveConduit(338305, defaultItemLevel, localizedName(338305), "Potency", "Night Fae"));

    // Endurance
    conduits.push(new ActiveConduit(337715, defaultItemLevel, localizedName(337715), "Endurance"));
    conduits.push(new ActiveConduit(337748, defaultItemLevel, localizedName(337748), "Endurance"));
    conduits.push(new ActiveConduit(337662, defaultItemLevel, localizedName(337662), "Endurance"));
  }

  return conduits;
}

export function filterConduits(conduitList, covenantName) {
  return conduitList.filter(function (conduits) {
    return conduits.covenant === covenantName || conduits.covenant === "ALL";
  });
}

export function getCovenant(soulbindName) {
  if (["Kleia", "Pelagos", "Mikanikos"].includes(soulbindName)) return "Kyrian";
  else if (["Nadjia", "Theotar", "Draven"].includes(soulbindName)) return "Venthyr";
  else if (["Niya", "Dreamweaver", "Korayn"].includes(soulbindName)) return "Night Fae";
  else if (["Marileth", "Emeni", "Heirmir"].includes(soulbindName)) return "Necrolord";
}

// Build Conduit Stats
export function buildConduitStats(soulbindDict, player, contentType) {
  let tempDict = soulbindDict;

  for (let i = 0; i < tempDict.length; i++) {
    let trait = tempDict[i];

    if ("type" in trait && "slotted_id" in trait && trait.type.includes("Conduit")) {
      let itemLevel = player.getConduitLevel(trait.slotted_id);
      trait.bonus_stats = getConduitFormula(trait.slotted_id, player, contentType, itemLevel);
    }
  }

  return tempDict;
}

// Returns a bonus_stats dictionary that sums all active soulbind traits for your selected soulbind.
export function sumSelectedStats(soulbindName, soulbindDict) {
  let bonus_stats = {
    HPS: 0,
    Intellect: 0,
    Haste: 0,
    Versatility: 0,
    Crit: 0,
    Mastery: 0,
  };

  let filteredDict = soulbindDict.filter((trait) => trait.soulbind === soulbindName && trait.active === true);

  for (let i = 0; i < filteredDict.length; i++) {
    for (const [key, value] of Object.entries(bonus_stats)) {
      if (key in filteredDict[i].bonus_stats) bonus_stats[key] += filteredDict[i].bonus_stats[key];
    }
  }

  return bonus_stats;
}

// Converts a bonus_stats dictionary to a singular estimated HPS number.
export function getEstimatedHPS(bonus_stats, player, contentType) {
  let estHPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["Haste", "Mastery", "Crit", "Versatility"].includes(key)) {
      estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "Intellect") {
      estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "HPS") {
      estHPS += value;
    }
  }

  return Math.round(estHPS);
}

export function getConduitName(id, language = "en") {
  //console.log("Console here: " + id)
  let filteredDict = conduitDB.filter((trait) => trait.guid === id);
  if (filteredDict.length > 0) return filteredDict[0].name[language];
  else return "Invalid Name";
}

export function getConduitIcon(id) {
  if (id === -1) {
    return "EmptyConduit.jpg";
  } else {
    let filteredDict = conduitDB.filter((trait) => trait.guid === id);
    if (filteredDict.length > 0) return filteredDict[0].abilityIcon;
    else return "missing.jpg";
  }
}
