import React, { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
import { CONSTANTS } from "General/Engine/CONSTANTS";
import { getItemProp } from "General/Engine/ItemUtilities";

interface MenuItemType {
  id: number;
  ilvlMinimum: number;
  label: string;
  effectName?: string;
  type: string;
}

interface ItemCardButtonWithMenuProps {
  key: number;
  deleteActive: boolean;
  deleteItem: () => void;
  canBeCatalyzed: boolean;
  catalyseItemCard: () => void;
  itemLevel: number;
  upgradeItem: (item: any, ilvlMinimum: number, socketFlag: boolean, vaultFlag: boolean) => void;
  embellishItem: (item: any, embellishmentName: string) => void;
  setCustomItemOptions: (item: any, selectedOption: number[]) => void;
  item: any;
}

const getMenuItems = (item: any): MenuItemType[] => {
  const itemLevel = item.level;
  let items: MenuItemType[] = []; 
  //const fullItemLevels = [382, 385, 389, 392, 395, 398, 402, 405, 408, 411, 415, 418, 421, 424, 428, 431, 434, 437, 441, 444, 447];
  //const itemLevelCaps: { [key: string]: number } = { Myth: 447, Champion: 437, Hero: 441, Explorer: 398, Adventurer: 411, Veteran: 424 };
  //const fullItemLevels = [460, 463, 467, 470, 473, 476, 480, 483, 486, 489, 493, 496, 499, 502, 506, 509, 512, 515, 519, 522, 525, 528];
  const fullItemLevels = [567, 580, 584, 587, 590, 593, 597, 600, 603, 606, 610, 613, 616, 619, 623, 626, 629, 632, 636, 639, 642, 645, 649, 652, 655, 658, 662, 665, 668, 672, 675, 678 ];
  const itemLevelCaps: { [key: string]: number } = { Explorer: 619, Adventurer: 632, Veteran: 645, Champion: 658, Hero: 665, Myth: 678, Circlet: 658 };
  if (item.upgradeTrack !== "" && item.upgradeTrack in itemLevelCaps) {
    fullItemLevels.forEach((level) => {
      if (level > itemLevel && level <= itemLevelCaps[item.upgradeTrack]) {
        items.push({ id: items.length + 1, ilvlMinimum: level, type: "ilvl", label: "Upgrade to " + level });
      }
    });
  }

  return items;
};

const getExtraMenuItems = (item: any, gameType: gameTypes): MenuItemType[] => {
  const items: MenuItemType[] = [];

  if (CONSTANTS.socketSlots.includes(item.slot) && gameType === "Retail") {
    // If the item is in a compatible slot, add an option to add or remove a socket.
    // Note that necks are hard coded to have three sockets so we won't offer the option there.
    if (item.id !== 228411 && (!item.socket || (item.socket < 2 && (item.slot === "Neck" || item.slot === "Finger")))) items.push({id: items.length + 1, ilvlMinimum: 0, type: "socket", label: "Add Socket(s)"})
    //else items.push({id: items.length + 1, ilvlMinimum: 0, label: "Remove Socket"})

  }
  if (!item.vaultItem && gameType === "Retail") items.push({id: items.length + 1, type: "vault", ilvlMinimum: 0, label: "Convert to Vault"})
  if (item.effect === "" && getItemProp(item.id, "crafted") && (item.slot.includes("Weapon") || item.slot === "Offhand")) {
    items.push({id: items.length + 1, ilvlMinimum: 0, type: "embellishment", label: "Add Embellishment: Darkmoon Sigil: Ascension", effectName: "Darkmoon Sigil: Ascension"})
    items.push({id: items.length + 1, ilvlMinimum: 0, type: "embellishment", label: "Add Embellishment: Darkmoon Sigil: Symbiosis", effectName: "Darkmoon Sigil: Symbiosis"})
  }
  if (item.effect === "" &&  item.slot !== "Finger" && item.slot !== "Neck" && !item.slot.includes("Weapon") && getItemProp(item.id, "crafted")) {
    items.push({id: items.length + 1, ilvlMinimum: 0, type: "embellishment", label: "Add Embellishment: Writhing Armor Banding", effectName: "Writhing Armor Banding"})
    items.push({id: items.length + 1, ilvlMinimum: 0, type: "embellishment", label: "Add Embellishment: Dawnthread Lining", effectName: "Dawnthread Lining"})
    items.push({id: items.length + 1, ilvlMinimum: 0, type: "embellishment", label: "Add Embellishment: Duskthread Lining", effectName: "Duskthread Lining"})
  }
  // Add embellishment options.

  if (item.customOptions) {
    item.customOptions.forEach((option: {label: string, id: number}) => {
      items.push({id: items.length + 1, ilvlMinimum: 0, type: "custom", label: option.label, effectName: option.id})
    })
  }
  
  
  return items;

}

const ItemCardButtonWithMenu: React.FC<ItemCardButtonWithMenuProps> = ({ key, deleteActive, deleteItem, canBeCatalyzed, catalyseItemCard, itemLevel, upgradeItem, setCustomItemOptions, embellishItem, item, gameType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const menuItems = getMenuItems(item);
  const extraMenuItems = getExtraMenuItems(item, gameType);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to execute when menu item is clicked
  const handleMenuItemClick = (menuItem: MenuItemType) => {
    upgradeItem(item, menuItem.ilvlMinimum, false, false);
    handleClose();
  };

  const handleExtraMenuItemClick = (menuItem: MenuItemType) => {
    if (menuItem.type === "socket") upgradeItem(item, 0, true, false);
    else if (menuItem.type === "vault") upgradeItem(item, 0, false, true);
    else if (menuItem.type === "embellishment") embellishItem(item, menuItem.effectName);
    else if (menuItem.type === "custom") setCustomItemOptions(item, menuItem.effectName);
    handleClose();

  }

  const handlecatalyseItemCard = () => {
    catalyseItemCard();
    handleClose();
  };

  const handledeleteItem = () => {
    deleteItem();
    handleClose();
  };

  return (
    <div>
      <IconButton sx={{ padding: 0 }} color="primary" onClick={handleClick} aria-label={"buttonMenu" + key} size="small">
        <SettingsIcon style={{ fontSize: "18px" }} fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            padding: 0,
            border: "1px solid #DAA520",
            borderRadius: "4px",
          },
        }}
      >
        {canBeCatalyzed ? (
          <MenuItem style={{ fontSize: "12px", color: "plum" }} onClick={handlecatalyseItemCard} divider>
            {t("Catalyst")}
          </MenuItem>
        ) : null}
        {menuItems
          .filter((filter) => filter.ilvlMinimum > itemLevel)
          .map((item) => (
            <MenuItem style={{ color: "plum", fontSize: "12px" }} key={item.id} onClick={() => handleMenuItemClick(item)} divider>
              {item.label}
            </MenuItem>
        ))}
        {extraMenuItems
          .map((item) => (
            <MenuItem style={{  fontSize: "12px" }} key={item.id} onClick={() => handleExtraMenuItemClick(item)} divider>
              {item.label}
            </MenuItem>
          ))}

        {deleteActive ? (
          <MenuItem style={{  fontSize: "12px", color: "#ff1744" }} onClick={handledeleteItem}>
            {t("Delete")}
          </MenuItem>
        ) : null}
      </Menu>
    </div>
  );
};

export default ItemCardButtonWithMenu;
