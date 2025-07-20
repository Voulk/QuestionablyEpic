
export function classColours(spec: string) {
  if (spec === undefined || spec === "") {
    return "#ff6964";
  }
  if (spec.includes("Paladin")) {
    return "#F58CBA";
  }
  if (spec.includes("Druid")) {
    return "#FF7D0A";
  }
  if (spec.includes("Priest")) {
    return "#FFFFFF";
  }
  if (spec.includes("Shaman")) {
    return "#007af2";
  }
  if (spec.includes("Mage")) {
    return "#3FC7EB";
  }
  if (spec === "Hunter") {
    return "#AAD372";
  }
  if (spec.includes("Evoker")) {
    return "#33937F";
  }
  if (spec.includes("Rogue")) {
    return "#FFF468";
  }
  if (spec.includes("Warlock")) {
    return "#8788EE";
  }
  if (spec.includes("Monk")) {
    return "#00FF96";
  }
  if (spec === "Warrior") {
    return "#C79C6E";
  }
  if (spec === "HavocDemonHunter" || spec === "Havoc Demon Hunter" || spec === "DemonHunter" || spec === "Demon Hunter") {
    return "#AC44CE ";
  }
  if (spec === "DeathKnight" || spec === "Death Knight") {
    return "#C41E3A	 ";
  }
}