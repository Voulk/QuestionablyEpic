import React from "react";

export default function covenantIcons(props) {
  let source = "";

  const icons = (covenant) => {
    switch (covenant) {
      case covenant === "kyrian":
        return process.env.PUBLIC_URL + "/Images/Interface/Kyrian_Sigil.png";
      case covenant === "necrolord":
        return process.env.PUBLIC_URL + "/Images/Interface/Kyrian_Sigil.png";
      case covenant === "night_fae":
        return process.env.PUBLIC_URL + "/Images/Interface/Kyrian_Sigil.png";
      case covenant === "venthyr":
        return process.env.PUBLIC_URL + "/Images/Interface/Kyrian_Sigil.png";
    }
  };
console.log(icons(props))
  return (
    <img
      style={{
        height: 20,
        width: 20,
        margin: "0px 5px 0px 5px",
        verticalAlign: "middle",
        borderRadius: "4px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
      src={icons(props)}
      alt={props}
    />
  );
}
