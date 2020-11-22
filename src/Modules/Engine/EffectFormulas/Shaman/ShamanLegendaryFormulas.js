const PRIMAL_TIDE_CORE = "Primal Tide Core";
const SPIRITWALKERS_TIDAL_TOTEM = "Spiritwalkers Tidal Totem";

const getShamanLegendary = (legendary, pl, contentType) => {
  let result = 0.0; // ??
  let name = legendary.name;

  if (name === PRIMAL_TIDE_CORE) {
    // TODO
  } else if (name === SPIRITWALKERS_TIDAL_TOTEM) {
    // TODO
  } else {
    legendary.expectedHPS = 0;
    legendary.expectedDPS = 0;
  }
};
