type embellishmentData = {
  id: number;
  icon: string; // Shown in the Embellishment Chart
  armorType: 0 | 1 | 2 | 3 | 4; // Cloth, Leather etc.
  name: string;
  pieces?: 1 | 2; // Number of pieces required for the effect. Always 1 or 2.
  effect: {
    type: "embellishment";
    name: string;
  };
}

export const embellishmentDB: embellishmentData[] = [
  {
    id: 215135,
    icon: "inv_ringwod_d3_4",
    armorType: 2,
    name: "Ardenal Surge Clasp",
    effect: {
      type: "embellishment",
      name: "Ardenal Surge Clasp",
    },
  },
  {
    id: 215133,
    icon: "inv_ringwod_d3_4",
    armorType: 0,
    name: "Binding of Binding",
    effect: {
      type: "embellishment",
      name: "Binding of Binding",
    },
  },
  {
    id: 219495,
    icon: "inv_misc_emberweavebandage",
    armorType: 0,
    name: "Blessed Weapon Grip",
    effect: {
      type: "embellishment",
      name: "Blessed Weapon Grip",
    },
  },
  {
    id: 219489,
    icon: "inv_leather_outdoorarathor_d_01_boot",
    armorType: 2,
    name: "Waders of the Unifying Flame",
    effect: {
      type: "embellishment",
      name: "Waders of the Unifying Flame",
    },
  },
  {
    id: 219502,
    icon: "inv_belt_leather_undergroundquest_b_01",
    armorType: 2,
    name: "Adrenal Surge Clasp",
    effect: {
      type: "embellishment",
      name: "Adrenal Surge Clasp",
    },
  },
  {
    id: 219509,
    icon: "inv_misc_food_legion_gooamber_drop",
    pieces: 2,
    armorType: 3,
    name: "Embrace of the Cinderbee",
    effect: {
      type: "embellishment",
      name: "Embrace of the Cinderbee",
    },
  },
  {
    id: 219512,
    icon: "spell_nature_stormreach",
    armorType: 2,
    pieces: 2,
    name: "Fury of the Stormrook (2pc)",
    effect: {
      type: "embellishment",
      name: "Fury of the Stormrook",
    },
  },
  {
    id: 215134,
    icon: "inv_11_0_arathor_necklace_02_color5",
    armorType: 0,
    name: "Fractured Gemstone Locket",
    effect: {
      type: "embellishment",
      name: "Fractured Gemstone Locket",
    },
  },
  {
    id: 221943,
    icon: "inv_shoulder_cloth_dragondungeon_c_01",
    armorType: 0,
    name: "Energy Redistribution Beacon",
    effect: {
      type: "embellishment",
      name: "Energy Redistribution Beacon",
    },
  },
  {
    id: 213773,
    icon: "inv_cloth_raidmageprimalist_d_01_bracer",
    armorType: 0,
    name: "Prismatic Null Stone",
    effect: {
      type: "embellishment",
      name: "Prismatic Null Stone",
    },
  },
  {
    id: 222810,
    icon: "inv_10_tailoring_silkrare_color3",
    armorType: 1,
    pieces: 2,
    name: "Woven Dusk (2pc)",
    effect: {
      type: "embellishment",
      name: "Woven Dusk",
    },
  },
  {
    id: 222807,
    icon: "inv_10_tailoring_silkrare_color2",
    pieces: 2,
    armorType: 1,
    name: "Woven Dawn (2pc)",
    effect: {
      type: "embellishment",
      name: "Woven Dawn",
    },
  },
  {
    id: 222873,
    icon: "inv_10_tailoring_tailoringconsumable_color3",
    armorType: 0,
    name: "Duskthread Lining",
    effect: {
      type: "embellishment",
      name: "Duskthread Lining",
    },
  },
  {
    id: 222870,
    icon: "inv_10_tailoring_tailoringconsumable_color2",
    armorType: 0,
    name: "Dawnthread Lining",
    effect: {
      type: "embellishment",
      name: "Dawnthread Lining",
    },
  },
  {
    id: 213774,
    icon: "spell_priest_divinestar_holy",
    armorType: 0,
    name: "Captured Starlight",
    effect: {
      type: "embellishment",
      name: "Captured Starlight",
    },
  },
  {
    id: 226024,
    icon: "inv_inscriptions_darkmoonsigil_purple",
    armorType: 0,
    name: "Darkmoon Sigil: Ascension",
    effect: {
      type: "embellishment",
      name: "Darkmoon Sigil: Ascension",
    },
  },
  {
    id: 226030,
    icon: "inv_inscriptions_darkmoonsigil_teal",
    armorType: 0,
    name: "Darkmoon Sigil: Symbiosis",
    effect: {
      type: "embellishment",
      name: "Darkmoon Sigil: Symbiosis",
    },
  },
  {
    id: 226033,
    icon: "inv_inscriptions_darkmoonsigil_blue",
    armorType: 0,
    name: "Darkmoon Sigil: Vivacity",
    effect: {
      type: "embellishment",
      name: "Darkmoon Sigil: Vivacity",
    },
  },
];

  /*
  {
    id: 204710, //406254,
    icon: "inv_10_skinning_craftedoptionalreagent_shadowflamearmorpatch",
    armorType: 0, // Extra
    name: {
      en: "Shadowflame-Tempered Armor Patch",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Shadowflame-Tempered Armor Patch",
      rank: 0, 
    },
  },
  {
    id: 193451,
    icon: "inv_leather_dragondungeon_c_01_boot",
    armorType: 2, // Extra
    name: {
      en: "Slimy Expulsion Boots",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Slimy Expulsion Boots",
      rank: 0, 
    },
  },
  {
    id: 193944,
    icon: "inv_10_tailoring_silkrare_color1",
    armorType: 0, // Extra
    name: {
      en: "Blue Silken Lining",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Blue Silken Lining",
      rank: 0, 
    },
  },
  {
    id: 193521,
    icon: "inv_helm_cloth_dragondungeon_c_01",
    armorType: 1, // Extra
    name: {
      en: "Hood of Surging Time",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Prepared Time",
      rank: 0, 
    },
  },
  {
    id: 193941,
    icon: "inv_holiday_tow_spicebandage",
    armorType: 0, // Extra
    name: {
      en: "Bronzed Grip Wrappings",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Bronzed Grip Wrappings",
      rank: 0, 
    },
  },
  {
    id: 190523,
    icon: "inv_plate_dragondungeon_c_01_pant",
    armorType: 4, // Plate
    name: {
      en: "Frostfire Legguards of Preparation",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Prepared Time",
      rank: 0, 
    },
  },
  {
    id: 190526,
    icon: "inv_bracer_plate_raidwarriorprimalist_d_01",
    armorType: 4, // Plate
    name: {
      en: "Allied Wristguard of Companionship",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Allied Wristguard of Companionship",
      rank: 0, 
    },
  },
  {
    id: 193453,
    icon: "inv_leather_dragondungeon_c_01_chest",
    armorType: 2,
    name: {
      en: "Allied Heartwarming Fur Coat",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Rallied to Victory",
      rank: 0, 
    },
  },
  {
    id: 193464,
    icon: "inv_mail_dragondungeon_c_01_pant",
    armorType: 3, 
    name: {
      en: "Allied Legguards of Sansok Khan",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Rallied to Victory",
      rank: 0, 
    },
  },
  {
    id: 190519,
    icon: "inv_chest_plate_raidwarriorprimalist_d_01",
    armorType: 4, // Plate
    name: {
      en: "Allied Chestplate of Generosity",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Rallied to Victory",
      rank: 0, 
    },
  },
  {
    id: 193494,
    icon: "inv_helm_leather_legiondungeon_c_02",
    armorType: 2, // Leather
    name: {
      en: "Flaring Cowl",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Flaring Cowl",
      rank: 0, 
    },
  },
  {
    id: 204704,
    icon: "inv_bracer_mail_dragonpvp_d_01",
    armorType: 3, // Mail
    name: {
      en: "Adaptive Dracothyst Armguards",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Adaptive Dracothyst Armguards",
      rank: 0, 
    },
  },
  {
    id: 205025,
    icon: "inv_cape_armor_celestial", 
    armorType: 0, 
    name: {
      en: "Undulating Sporecloak",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Undulating Sporecloak",
      rank: 0, 
    },
  },/*
  {
    id: 204401,
    icon: "inv_wand_1h_enchanting_b_01", 
    armorType: 1, // Cloth
    name: {
      en: "Spore Keeper's Baton",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Spore Keeper's Baton",
      rank: 0, 
    },
  },
  {
    id: 208187,
    icon: "inv_trinket_ardenweald_01_orange", 
    armorType: 0, // All
    name: {
      en: "Verdant Conduit",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Verdant Conduit",
      rank: 0, 
    },
  },
  {
    id: 210671,
    icon: "inv_10_tailoring_tailoringconsumable_color4", 
    armorType: 0, // All
    name: {
      en: "Verdant Tether (Ring)",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Verdant Tether",
      rank: 0, 
    },
  },/*
  {
    id: 210646,
    icon: "inv_plate_outdooremeralddream_d_01_helm", 
    armorType: 4, // All  
    name: {
      en: "Flourishing Dream Helm",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Flourishing Dream Helm",
      rank: 0, 
    },
  }, */
  /*
  {
    id: 194894,
    icon: "inv_staff_2h_inscription_c_01_red",
    armorType: 2,
    name: {
      en: "Weathered Explorer's Stave",
      de: "",
      fr: "",
      ru: "",
      ch: "",
    },
    effect: {
      type: "embellishment",
      name: "Weathered Explorer's Stave",
      rank: 0, 
    },
  }, */

