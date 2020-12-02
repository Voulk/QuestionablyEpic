import { VESPER_SP, CHAIN_HARVEST_SP, PRIMORDIAL_WAVE_SP, RIPTIDE_HOT_SP, RIPTIDE_INITIAL_SP, HEALING_WAVE_COPY_SP, RESTO_SHAMAN_DPS_AURA, FAE_TRANSFUSION_SP, UNLEASH_LIFE_MULT } from "./constants";

export function getShamanCovAbility(soulbindName, player, contentType) {
  /**
   * Currently assuming 100% usage on everything,
   * will need updates.
   */
  const bonusStats = {};
  if (["Kleia", "Pelagos", "Mikanikos"].includes(soulbindName)) { // some kind of Kyrian
    const charges = 3;
    const targets = contentType === "Dungeon" ? 5 : 6;
    const cooldown = 60;
    const totalSP = VESPER_SP * charges * targets;
    bonusStats.HPS = (totalSP * player.getStatMultiplier("NOHASTE")) / cooldown;
  } else if (["Nadjia", "Theotar", "Draven"].includes(soulbindName)) { // Red Dragons
    const targets = 5;
    const totalSP = CHAIN_HARVEST_SP * targets * UNLEASH_LIFE_MULT;
    const cdr = 10;
    const cooldown = 90 - ((player.getStatPerc("Crit") - 1) * cdr * (targets * 2));
    bonusStats.HPS = (totalSP * player.getStatMultiplier("NOHASTE")) / cooldown;
  } else if (["Marileth", "Emeni", "Heirmir"].includes(soulbindName)) { // Green Spews
    const avgWavesPerCast = 4; // aka riptides / placeholder
    const cooldown = 45;
    const boostedSP = UNLEASH_LIFE_MULT * (HEALING_WAVE_COPY_SP * avgWavesPerCast);
    const directSP = RIPTIDE_INITIAL_SP + PRIMORDIAL_WAVE_SP + boostedSP;
    bonusStats.HPS = (directSP * player.getStatMultiplier("NOHASTE") + RIPTIDE_HOT_SP * player.getStatMultiplier("ALL")) / cooldown;
  } else if (["Niya", "Dreamweaver", "Korayn"].includes(soulbindName)) { // Whatever is left
    const ticks = 7;
    const healPart = .4;
    const targets = 4;
    const cooldown = 120;
    const totalSP = FAE_TRANSFUSION_SP * ticks * healPart * targets * RESTO_SHAMAN_DPS_AURA;
    bonusStats.HPS = (totalSP * player.getInt() * player.getStatPerc("Crit") * player.getStatPerc("Vers") * player.getStatPerc("Vers")) / cooldown;
  }
  return bonusStats;
}
