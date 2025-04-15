import { DISCSPELLS, discConduits } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscSpellDB"

// Disc and Holy use one shared entry here since a lot of conduits overlap.
export const getPriestConduit = (conduitID, player, contentType, conduitLevel) => {
  let bonus_stats = {};

  // === Disc Potency Conduits ===
  // Exaltation
  if (conduitID === 337790) {
    const conduitCoeff = discConduits('Exaltation', conduitLevel) / discConduits('Exaltation', 9);
    bonus_stats.HPS = player.getRampID('exaltation', contentType) * conduitCoeff;
    
  }
  // Rabid Shadows
  else if (conduitID === 338338) {
    const conduitCoeff = discConduits('Rabid Shadows', conduitLevel) / discConduits('Rabid Shadows', 9);
    bonus_stats.HPS = player.getRampID('rabidShadows', contentType);
  }
  // Pain Transformation
  else if (conduitID === 337786) {
    const painSuppCPM = 0.27 // Move to Model. TODO.
    const healSize = discConduits('Pain Transformation', conduitLevel) * player.getHealth(contentType);
    const expectedOverhealing = 0.52; // Pain suppression is best used pre-emptively, meaning this conduit only really gets any value when used in a panic to cover a mistake.
    // It is not good.

    bonus_stats.HPS = painSuppCPM * healSize / 60 * (1 - expectedOverhealing);
  }
  // Shining Radiance
  else if (conduitID === 337778) {
    const radianceCPM = 3.2 // Move to Model. TODO.
    const radianceHealing = DISCSPELLS['Power Word: Radiance'][0]['coeff'] * player.getInt() * 5;
    const expectedOverheal = 0.22;

    bonus_stats.HPS = radianceCPM * radianceHealing * 0.64 / 60 * (1 - expectedOverheal);
  }
  // Swift Penitence
  else if (conduitID === 337891) {
  }
  // == Holy Potency Conduits

  // == Covenant-specific Conduits
  // Courageous Ascension (Kyrian)
  else if (conduitID === 337966) {
    const conduitCoeff = discConduits('Courageous Ascension', conduitLevel) / discConduits('Courageous Ascension', 9);
    bonus_stats.HPS = player.getRampID('courAscension', contentType) * conduitCoeff;
  }
  // Shattered Perceptions (Venthyr)
  else if (conduitID === 338315) {
  }
  // Festering Transfusion (Necrolord)
  else if (conduitID === 337966) {
  }
  // Fae Fermata (Night Fae)
  else if (conduitID === 338305) {
  }

  // == Endurance Conduits
  // Charitable Soul
  else if (conduitID === 338305) {
  }
  // Lights Inspiration
  else if (conduitID === 337748) {
  }
  // Translucent Image
  else if (conduitID === 337662) {
  }

  return bonus_stats;
};
