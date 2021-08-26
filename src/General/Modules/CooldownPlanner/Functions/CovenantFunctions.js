import React from "react";

/* ---------- Returns the sigil for the supplied covenant with specified width & height --------- */
export function covenantIcons(props, height, width) {
  const icons = (covenant) => {
    switch (covenant) {
      case "kyrian":
        return process.env.PUBLIC_URL + "/Images/Interface/Covenants/KyrianIcon.jpg";
      case "necrolord":
        return process.env.PUBLIC_URL + "/Images/Interface/Covenants/NecrolordsIcon.jpg";
      case "night_fae":
        return process.env.PUBLIC_URL + "/Images/Interface/Covenants/NightFaeIcon.jpg";
      case "venthyr":
        return process.env.PUBLIC_URL + "/Images/Interface/Covenants/VenthyrIcon.jpg";
    }
  };

  return (
    <div>
      <img
        style={{
          height: height,
          width: width,
          margin: "0px 5px 0px 5px",
          verticalAlign: "middle",
          borderRadius: "4px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
        src={icons(props)}
        alt={props}
      />
    </div>
  );
}

/* ------------------ Returns the relevant hex colour of the supplied Covenant ------------------ */
export function covenantColours(props) {
  const covColour = (covenant) => {
    switch (covenant) {
      case "kyrian":
        return "#68ccef";
      case "necrolord":
        return "#008467";
      case "night_fae":
        return "#a330c9";
      case "venthyr":
        return "#c41e3b";
    }
  };

  return covColour(props);
}
