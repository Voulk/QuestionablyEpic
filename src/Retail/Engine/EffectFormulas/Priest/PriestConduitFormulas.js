// Disc and Holy use one shared entry here since a lot of conduits overlap.
export const getPriestConduit = (conduitID, player, contentType, conduitLevel) => {
  let bonus_stats = {};

  // === Disc Potency Conduits ===
  // Exaltation
  if (conduitID === 337790) {
  }
  // Pain Transformation
  else if (conduitID === 337786) {
  }
  // Shining Radiance
  else if (conduitID === 337778) {
  }
  // Swift Penitence
  else if (conduitID === 337891) {
  }
  // == Holy Potency Conduits

  // == Covenant-specific Conduits
  // Courageous Ascension (Kyrian)
  else if (conduitID === 337966) {
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
