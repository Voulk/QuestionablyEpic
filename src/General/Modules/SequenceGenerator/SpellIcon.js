import React from 'react';

export const SpellIcon = ({ spell, spec, className, alt = '', ...others }) => {
  if (!spell) {
    return null;
  }

  const newIconList = []; // Spell IDs that don't return an icon from the live WoW API.

  const spellId = spell.spellData.id;
  let icon = spell.spellData.icon;
  if (!icon) {
    return null;
  }
  icon = icon.replace('.jpg', '').replace(/-/g, '');
  const baseURL = `//render-us.worldofwarcraft.com/icons/56`;
  let fullURL = `${baseURL}/${icon}.jpg`

  if (spec === "Preservation Evoker" || newIconList.includes(spellId)) {
    // This is a temporary icon override since Evoker spells aren't in the WoW render DB yet.
    // We can also add spell IDs to the icon list above if they are use Dragonflight specific icons.
    // When the expansion goes live these will all just be pulled via Blizzard API.
    fullURL = require("Images/Spells/" + icon + ".jpg").default || "";
  }

  return (
    <a
      data-wowhead={"spell=" + spellId}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={fullURL}
        alt={alt}
        className={`icon ${className || ''}`}
        {...others}
      />
    </a>
  );
};
