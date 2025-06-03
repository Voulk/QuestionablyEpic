import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips.tsx";

export const SpellIcon = ({ spell, iconType, size, className, gameType, alt = "", ...others }) => {
  if (!spell) {
    return null;
  }

  const newIconList = [373835]; // Spell IDs that don't return an icon from the live WoW API.
  let spellId = spell.id;
  let icon = spell.icon;

  if (!icon) {
    return null;
  }
  icon = icon.replace(".jpg", "").replace(/-/g, "");
  const baseURL = `//render-us.worldofwarcraft.com/icons/56`;
  let fullURL = `${baseURL}/${icon}.jpg`;
  const domain = gameType === "Retail" ? "" : "mop-classic";

  if (newIconList.includes(spellId)) {
    // This is a temporary icon override since Evoker spells aren't in the WoW render DB yet.
    // We can also add spell IDs to the icon list above if they are use Dragonflight specific icons.
    // When the expansion goes live these will all just be pulled via Blizzard API.
    fullURL = require("Images/Spells/" + icon + ".jpg") || "";
  }

  // TODO: Refine the centered text here.
  // //position: "relative"
  return (
    <div style={{position: "relative"  }}> 
      <WowheadTooltip type="spell" id={spellId} domain={domain}>
        <img src={fullURL} alt={alt} className={`icon ${className || ""}`} {...others} />
        {(iconType === "Talent" && gameType === "Retail") ? (
          <div {...others} style={{ position: "absolute", top: "19%", width: "100%", textAlign: "center", fontWeight: "bold", fontSize: "16px", textShadow: "1px 1px 4px black" }}>
            {" "}
            {spell.points}{" "}
          </div>
        ) : (
          ""
        )}
      </WowheadTooltip>
    </div>
  );
};
