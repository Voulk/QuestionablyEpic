import React from "react";

// WowheadLink component definition.
// This component creates a link to Wowhead with optional query parameters.
// It handles two types: 'item' and 'spell', and returns the children for 'none'.
const WowheadTooltip = ({ id, level, bonusIDS, domain, type, children, difficulty, gems, keyProp = "defaultKey" }) => {
  // If type is 'none' or Onyx Annulet, return the children.
  if (type === "none" || id === 203460) {
    return children;
  }

  if (id === undefined || id === null || id === "" || id === 0 || id === "Phase 1" || id === "Phase 2" || id === "Phase 3" || id === "Phase 4" || id === "Intermission") {
    return children;
  }

  // Base Wowhead link and data-wowhead attribute construction.
  const baseWowheadLink = `https://www.wowhead.com/${type}=${id}`;
  const dataWowhead = `${type}=${id}&domain=${domain}`;

  // If the type is 'item', these strings include optional item-level, bonus, and gem query parameters.
  // If the gems prop includes '&gems=', it is appended as is. If not, '&gems=' is prepended.
  const itemDataWowhead = `${dataWowhead}${level ? "&ilvl=" + level : ""}${bonusIDS ? "&bonus=" + bonusIDS : ""}${gems ? gems : ""}`;

  // If the type is 'spell', these strings include optional bossAbility and difficulty query parameters.
  const spellDataWowhead = `${dataWowhead}${difficulty ? "&dd=" + difficulty : ""}`;

  return (
    <a href={baseWowheadLink} data-wowhead={type === "item" ? itemDataWowhead : spellDataWowhead} target="_blank" rel="noopener noreferrer" key={keyProp}>
      {children}
    </a>
  );
};

export default WowheadTooltip;
