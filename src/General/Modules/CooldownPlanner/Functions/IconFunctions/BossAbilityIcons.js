import React from "react";
import { bossAbilities } from "../../Data/Data";

export default function bossAbilityIcons(props, style) {
  let alt = "";
  let iconName = bossAbilities
    .filter((obj) => {
      return obj.guid === props;
    })
    .map((obj) => obj.icon);

  alt = bossAbilities
    .filter((obj) => {
      return obj.guid === props;
    })
    .map((obj) => obj.ability)
    .toString();

  if (props === undefined) {
    return null;
  }
  return <img style={{ ...style }} src={iconName} alt={alt} />;
}
