

// TODO: Write proper comments. See Lingering Sunmote for an example.
export function getTrinketEffectBC(effectName, player, contentType, itemLevel, userSettings = {}) {
  let bonus_stats = {};

  /* -------- Trinket Data holds a trinkets actual power values. Formulas here, data there. ------- */
  //let activeTrinket = trinket_data.find((trinket) => trinket.name === effectName);
  const activeTrinket = effectName;

  const cpm = 24;

  if (activeTrinket === undefined) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Error Handling                                         */
    /* ---------------------------------------------------------------------------------------------- */
    console.log("no trinket found");
    return bonus_stats;
  } else if ( 
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Essence of the Martyr                                     */
    /* ---------------------------------------------------------------------------------------------- */
    effectName === "Essence of the Martyr"
  ) {
      const effect = {
          duration: 20,
          cooldown: 120,
          value: 297,
      }
      bonus_stats.bonushealing = Math.round(effect.duration * effect.value / effect.cooldown);
  }
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Eye of Gruul                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Eye of Gruul"
) {
    const effect = {
      mana: 450,
      chance: 0.02,
    }
    bonus_stats.mp5 = Math.round(100*cpm * effect.chance * effect.mana / 12)/100
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Bangle of Endless Blessings                                  */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Bangle of Endless Blessings"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Pendant of the Violet Eye                               */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Pendant of the Violet Eye"
) {
    const effect = {
      cooldown: 120,
      duration: 20,
      castsInWindow: 20/1.75,
      stackingMp5: 21,

    }
    bonus_stats.mp5 = Math.round(100*((effect.castsInWindow+1)/2 * effect.stackingMp5) * effect.duration / effect.cooldown)/100
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Figurine - Living Ruby Serpent                          */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Figurine - Living Ruby Serpent"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Ribbon of Sacrifice                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Ribbon of Sacrifice"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                           Scarab of the Infinite Cycle                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Scarab of the Infinite Cycle"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Lower City Prayerbook                                          */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Lower City Prayerbook"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Shiffar's Nexus-Horn                                           */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Shiffar's Nexus-Horn"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                Figurine - Talasite Owl                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Figurine - Talasite Owl"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Xi'ri's Gift                                            */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Xi'ri's Gift"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Warp-Scarab Brooch                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Warp-Scarab Brooch"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                             Icon of the Silver Crescent                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Icon of the Silver Crescent"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Oculus of the Hidden Eye                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Oculus of the Hidden Eye "
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                           The Restrained Essence of Sapphiron                                  */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "The Restrained Essence of Sapphiron"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Eye of the Dead                                            */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Eye of the Dead "
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                 Vengeance of the Illidari (Hellfire Quest Drop)                                */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Vengeance of the Illidari"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                       Auslese's Light Channeler  (Blood Furnace)                               */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Auslese's Light Channeler"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                              Warmth of Forgiveness                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Warmth of Forgiveness "
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Scarab Brooch                                            */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Scarab Brooch"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Hibernation Crystal                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Hibernation Crystal"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                             Living Root of the Wildheart                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Living Root of the Wildheart" // DRUID ONLY.
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Fel Reaver's Piston (VR)                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Fel Reaver's Piston"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                            Earring of Soulful Meditation                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Earring of Soulful Meditation" // PRIEST ONLY
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                             Fathom-Brooch of the Tidewalker                                    */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Fathom-Brooch of the Tidewalker" // SHAMAN ONLY
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                 Tome of Fiery Redemption                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Tome of Fiery Redemption" // PALADIN ONLY
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                               Memento of Tyrande                                               */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Memento of Tyrande"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                            Ashtongue Talisman of Acumen                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Ashtongue Talisman of Acumen" // PRIEST
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                              Ashtongue Talisman of Equilibrium                                 */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Ashtongue Talisman of Equilibrium" // DRUID
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                              Ashtongue Talisman of Zeal                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Ashtongue Talisman of Zeal" // PALADIN
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                            Ashtongue Talisman of Vision                                        */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Ashtongue Talisman of Vision" // SHAMAN
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                  Tome of Diabolic Remedy                                       */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Tome of Diabolic Remedy"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Glimmering Naaru Sliver                                      */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Glimmering Naaru Sliver"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                Redeemer's Alchemist Stone                                      */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Redeemer's Alchemist Stone"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Figurine - Seaspray Albatross                                */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Figurine - Seaspray Albatross"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Vial of the Sunwell                                         */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "Vial of the Sunwell"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        TrinketName                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "TrinketName"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        TrinketName                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "TrinketName"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        TrinketName                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "TrinketName"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        TrinketName                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "TrinketName"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
else if (
  /* ---------------------------------------------------------------------------------------------- */
  /*                                        TrinketName                                             */
  /* ---------------------------------------------------------------------------------------------- */
  effectName === "TrinketName"
) {
    const effect = {

    }
    bonus_stats.bonushealing = 0
}
  

  // Return bonus_stats
  return bonus_stats;
}