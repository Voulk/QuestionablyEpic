import React from 'react';

export const SpellIcon = ({ spell, className, alt = '', ...others }) => {
  if (!spell) {
    return null;
  }
  const spellId = spell.spellData.id;
  let icon = spell.spellData.icon;
  if (!icon) {
    return null;
  }
  icon = icon.replace('.jpg', '').replace(/-/g, '');
  const baseURL = `//render-us.worldofwarcraft.com/icons/56`;

  return (
    <a
      data-wowhead={"spell=" + spellId}
      target="_blank"
      rel="noopener noreferrer"
      className="spell_link"
    >
      <img
        src={`${baseURL}/${icon}.jpg`}
        alt={alt}
        className={`icon ${className || ''}`}
        {...others}
      />
    </a>
  );
};
