// Every armor slot an applicable embellishment (a lining, banding, patch etc) can be attached to.
// Jewelry and weapons are handled separately since they take different reagents.
export const EMBELLISHMENT_ARMOR_SLOTS = ["Head", "Shoulder", "Back", "Chest", "Wrist", "Hands", "Waist", "Legs", "Feet"];
export const EMBELLISHMENT_WEAPON_SLOTS = ["1H Weapon", "2H Weapon", "Warglaive Weapon", "Offhand", "Holdable"];
export const EMBELLISHMENT_JEWELRY_SLOTS = ["Neck", "Finger"];

type embellishmentData = {
  id: number;
  icon: string; // Shown in the Embellishment Chart
  armorType: 0 | 1 | 2 | 3 | 4; // 0 = any, 1 Cloth, 2 Leather, 3 Mail, 4 Plate.
  name: string;
  pieces?: 1 | 2; // Number of pieces required for the effect. Always 1 or 2.

  // "applicable" embellishments are reagents the player chooses to add to a crafted item, so they need to show up
  // in the Add Item dropdown against every slot they're legal on. Everything else is baked into a specific crafted
  // item (or item family) and arrives with the item itself, so it must NOT be offered as a choice.
  applicable?: boolean;
  slots?: string[]; // Slots this embellishment is legal on. Only meaningful when applicable is true.
  setItems?: number[]; // For baked-in embellishments: the item IDs that carry it. Any `pieces` of these trigger it.

  // Set when we know the embellishment exists but don't have a formula for it yet in EmbellishmentData.
  // Those score as zero, so we must not offer them as a choice - picking one would silently do nothing.
  // Delete the flag as soon as the formula lands.
  unmodelled?: boolean;

  effect: {
    type: "embellishment";
    name: string;
  };
}

export const embellishmentDB: embellishmentData[] = [
      {
    id: 273059,
    icon: "inv_12_profession_blacksmithing_weightstone_green",
    armorType: 0, // Works on Weapons
    name: "Hunter's Ritual Stone",
    applicable: true,
    slots: EMBELLISHMENT_WEAPON_SLOTS,
    effect: {
      type: "embellishment",
      name: "Hunter's Ritual Stone",
    },
  },
    {
    id: 273068,
    icon: "inv_knife_1h_ulatek_d_01",
    armorType: 0, // Works on Armor, leatherworking craft.
    name: "Adorned Fang",
    applicable: true,
    slots: EMBELLISHMENT_ARMOR_SLOTS,
    effect: {
      type: "embellishment",
      name: "Adorned Fang",
    },
  },
  {
    id: 241140,
    icon: "inv_12_profession_jewelcrafting_ring1_gold",
    armorType: 0, // Ring
    name: "Signet of Azerothian Blessings",
    setItems: [241140],
    effect: {
      type: "embellishment",
      name: "Signet of Azerothian Blessings",
    },
  },
    {
    id: 241139,
    icon: "inv_12_profession_jewelcrafting_necklace1_gold",
    armorType: 0, // Neck
    name: "Thalassian Phoenix Torque",
    setItems: [241139],
    effect: {
      type: "embellishment",
      name: "Thalassian Phoenix Torque",
    },  
  },
  {
    id: 251513,
    icon: "inv_12_profession_jewelcrafting_ring3_silver",
    armorType: 0, // Ring
    name: "Loa Worshiper's Band",
    setItems: [251513],
    effect: {
      type: "embellishment",
      name: "Loa Worshiper's Band",
    },
  },
    {
    id: 251073,
    icon: "inv_12_profession_jewelcrafting_necklace3_silver",
    armorType: 0, // Neck
    name: "Voidstone Shielding Array",
    setItems: [251073],
    effect: {
      type: "embellishment",
      name: "Voidstone Shielding Array",
    },
  },
    {
    id: 245871,
    icon: "inv_12_profession_inscriptions_darkmoonsigil_hunt",
    armorType: 0, // Weapon Reagent, DPS only
    name: "Darkmoon Sigil: Blood",
    applicable: true,
    slots: EMBELLISHMENT_WEAPON_SLOTS,
    effect: {
      type: "embellishment",
      name: "Darkmoon Sigil: Blood",
    },
  },
    {
    id: 245875,
    icon: "inv_12_profession_inscriptions_darkmoonsigil_bloom",
    armorType: 0, // Weapon Reagent, Based on creature type??
    name: "Darkmoon Sigil: Hunt",
    applicable: true,
    slots: EMBELLISHMENT_WEAPON_SLOTS,
    effect: {
      type: "embellishment",
      name: "Darkmoon Sigil: Hunt",
    },
  },
      {
    id: 245873,
    icon: "inv_12_profession_inscriptions_darkmoonsigil_void",
    armorType: 0, // Weapon Reagent, DPS only.
    name: "Darkmoon Sigil: Void",
    applicable: true,
    slots: EMBELLISHMENT_WEAPON_SLOTS,
    effect: {
      type: "embellishment",
      name: "Darkmoon Sigil: Void",
    },
  },
   {
    id: 244603,
    icon: "inv_jewelry_necklace_139",
    armorType: 0, // Vers
    name: "Blessed Pango Charm",
    applicable: true,
    slots: EMBELLISHMENT_ARMOR_SLOTS,
    effect: {
      type: "embellishment",
      name: "Blessed Pango Charm",
    },
  },
    {
    id: 244608,
    icon: "inv_12_profession_leatherworking_armor_banding_green",
    armorType: 0, // Healing
    name: "Primal Spore Binding",
    applicable: true,
    slots: EMBELLISHMENT_ARMOR_SLOTS,
    effect: {
      type: "embellishment",
      name: "Primal Spore Binding",
    },
  },
      {
    id: 244675,
    icon: "inv_12_profession_leatherworking_armor_banding_brown",
    armorType: 0, // Healing
    name: "Devouring Banding",
    applicable: true,
    slots: EMBELLISHMENT_ARMOR_SLOTS,
    unmodelled: true, // No formula in EmbellishmentData yet.
    effect: {
      type: "embellishment",
      name: "Devouring Banding",
    },
  },
  {
    id: 240166,
    icon: "inv_12_tailoring_rare_cloth_violet_rare-cloth",
    armorType: 0, // Primary stat for you + a friend
    name: "Arcanoweave Lining",
    applicable: true,
    slots: EMBELLISHMENT_ARMOR_SLOTS,
    effect: {
      type: "embellishment",
      name: "Arcanoweave Lining",
    },
  },
          {
    id: 240165,
    icon: "inv_12_tailoring_rare_cloth_orange-_rare-cloth",
    armorType: 0, // Healing and damage from periodics can increase int, stacking to 10.
    name: "Sunfire Silk Lining",
    applicable: true,
    slots: EMBELLISHMENT_ARMOR_SLOTS,
    effect: {
      type: "embellishment",
      name: "Sunfire Silk Lining",
    },
  },
  {
    id: 239660,
    icon: "inv_bracer_cloth_questbloodelf_b_01",
    armorType: 1, // Crit above 80% health, cloth, set
    pieces: 2,
    name: "Arcanoweave Trappings (Set)",
    setItems: [239660, 239661, 239662], // Arcanoweave Bracers / Cloak / Treads
    effect: {
      type: "embellishment",
      name: "Arcanoweave Trappings",
    },
  },
  {
    id: 239664,
    icon: "inv_belt_cloth_questbloodelf_b_01",
    armorType: 1, // Mastery proc
    name: "Arcanoweave Cord",
    setItems: [239664],
    effect: {
      type: "embellishment",
      name: "Arcanoweave Cord",
    },
  },
  {
    id: 239658,
    icon: "inv_cape_firelands_fireset_d_01",
    armorType: 1, // Crit above 80% health, cloth, set
    pieces: 2,
    name: "Sunfire Silk Trappings (Set)",
    setItems: [239657, 239658, 239659], // Sunfire Bracers / Cloak / Treads
    effect: {
      type: "embellishment",
      name: "Sunfire Silk Trappings",
    },
  },
    {
    id: 244613,
    icon: "inv_chest_leather_questbloodelf_b_01",
    armorType: 2, // Does random shit every 30s on a crit. Untested for healing crits.
    pieces: 2,
    name: "Murder Row Materials (Set)",
    setItems: [244612, 244613, 244614], // Row Walker's Deflectors / Insurance / Swiftgrips
    unmodelled: true, // No formula in EmbellishmentData yet.
    effect: {
      type: "embellishment",
      name: "Murder Row Materials",
    },
  },
      {
    id: 244601,
    icon: "inv_boot_leather_questbloodelf_b_01",
    armorType: 2, // Pops out orbs. Pick up orb = + highest secondary stat.
    name: "World Tree Rootwraps",
    setItems: [244601],
    effect: {
      type: "embellishment",
      name: "World Tree Rootwraps",
    },
  },
  {
    id: 244605,
    icon: "inv_bracer_mail_questbloodelf_b_01",
    armorType: 3, // Stacking haste proc
    name: "Axe-Flingin' Bands",
    setItems: [244605],
    effect: {
      type: "embellishment",
      name: "Axe-Flingin' Bands",
    },
  },
  {
    id: 244609,
    icon: "inv_chest_mail_questbloodelf_b_01",
    armorType: 3, // Random secondary proc
    pieces: 2,
    name: "Root Warden's Regalia (Set)",
    setItems: [244609, 244610, 244611], // World Tender's Trunkplate / Rootslippers / Barkclasp
    effect: {
      type: "embellishment",
      name: "Root Warden's Regalia",
    },
  },

  /*
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
    name: "Fury of the Stormrook (Set)",
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
    name: "Woven Dusk (Set)",
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
    name: "Woven Dawn (Set)",
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
  },*/
];

/* ---------------------------------------------------------------------------------------------- */
/*                                            Lookups                                             */
/* ---------------------------------------------------------------------------------------------- */
// These are the single source of truth for "which embellishments exist and where can they go".
// Both the Add Item dropdown (getItemEffectOptions) and the SimC importer read from here so that the
// two entry points can't drift apart from each other or from the formulas in EmbellishmentData.

// Every embellishment the player can choose to apply to a crafted item in the given slot.
// Anything we don't have a formula for is left out - it would score as a flat zero and look like a bad choice
// rather than an unimplemented one.
export const getApplicableEmbellishments = (slot: string): embellishmentData[] => {
  if (!slot) return [];
  return embellishmentDB.filter((embel) => embel.applicable === true && !embel.unmodelled && (embel.slots || []).includes(slot));
};

// Look an embellishment up by its effect name. This is the name the formulas in EmbellishmentData key off.
export const getEmbellishmentByEffectName = (effectName: string): embellishmentData | undefined => {
  if (!effectName) return undefined;
  const trimmed = effectName.trim();
  return embellishmentDB.find((embel) => embel.effect.name.trim() === trimmed || embel.name.trim() === trimmed);
};

// Returns the embellishment carried by a given crafted item ID, if any. Used to attach baked-in effects
// (Axe-Flingin' Bands, the World Tender's set and so on) without having to duplicate them into ItemDB.
export const getEmbellishmentForItem = (itemID: number): embellishmentData | undefined => {
  if (!itemID) return undefined;
  return embellishmentDB.find((embel) => (embel.setItems || []).includes(itemID));
};

// The set of item IDs that carry a baked-in embellishment.
export const embellishmentItemIDs: number[] = embellishmentDB.reduce(
  (acc: number[], embel) => acc.concat(embel.setItems || []),
  [],
);

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

