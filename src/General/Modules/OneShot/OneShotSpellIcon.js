import React from "react";

export const OneShotSpellIcon = ({ spell, iconType, size, className, alt = "", ...others }) => {
  if (!spell) {
    return null;
  }

  const newIconList = []; // Spell IDs that don't return an icon from the live WoW API.
  let spellId = spell.guid;
  let icon = spell.icon;

  
  if (!icon) {
    return null;
  }
  icon = icon.replace('.jpg', '').replace(/-/g, '');
  const baseURL = `https://render-us.worldofwarcraft.com/icons/56`;
  let fullURL = `${baseURL}/${icon}.jpg`
  console.log(fullURL);

  if (newIconList.includes(spellId)) {
    // This is a temporary icon override since Evoker spells aren't in the WoW render DB yet.
    // We can also add spell IDs to the icon list above if they are use Dragonflight specific icons.
    // When the expansion goes live these will all just be pulled via Blizzard API.
    fullURL = require("Images/Spells/" + icon + ".jpg").default || "";
  } 

  // TODO: Refine the centered text here.
  return (
    <div style={{ position: "relative" }}>
      <img
        src={fullURL} //{fullURL}
        alt={alt}
        style={{ filter: spell.active ? "" : "grayscale(100%)" }}
        className={`icon ${className || ""}`}
        {...others}
      />
      {iconType === "Talent" ? (
        <div {...others} style={{ position: "absolute", top: "25%", width: "100%", textAlign: "center", fontWeight: "bold", fontSize: "20px", textShadow: "1px 1px 4px black" }}>
          {" "}
          {spell.points}{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
