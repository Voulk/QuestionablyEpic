import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { getTranslatedItemName } from "../Player/PlayerUtilities";

// QC Tile is passed an Item prop. You have access to all properties of the Item class.
// Item names and icons are returned from the PlayerUtilities class as we don't want to store each translation on individual items (nor do we need to).
export default function QCTile(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const item = props.item;

  return (
    <div className="qctile">
      <p>Name: {getTranslatedItemName(item.id, currentLanguage)}</p>
    </div>
  );
}
