import React, { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
import { CONSTANTS } from "General/Engine/CONSTANTS";

interface MenuItemType {
  id: number;
  ilvlMinimum: number;
  label: string;
}

interface ItemCardButtonWithMenuProps {
  key: number;
  deleteActive: boolean;
  deleteItem: () => void;
  canBeCatalyzed: boolean;
  catalyseItemCard: () => void;
  itemLevel: number;
  upgradeItem: (item: any, ilvlMinimum: number, socketFlag: boolean, vaultFlag: boolean) => void;
  item: any;
}

const getMenuItems = (item: any): MenuItemType[] => {
  const itemLevel = item.level;
  let items: MenuItemType[] = [];
  //const fullItemLevels = [382, 385, 389, 392, 395, 398, 402, 405, 408, 411, 415, 418, 421, 424, 428, 431, 434, 437, 441, 444, 447];
  //const itemLevelCaps: { [key: string]: number } = { Myth: 447, Champion: 437, Hero: 441, Explorer: 398, Adventurer: 411, Veteran: 424 };
  const fullItemLevels = [415, 418, 421, 424, 428, 431, 434, 437, 441, 444, 447, 450, 454, 457, 460, 463, 467, 470, 473, 476, 480, 483, 486, 489];
  const itemLevelCaps: { [key: string]: number } = { Explorer: 437, Adventurer: 450, Veteran: 463, Champion: 476, Hero: 483, Myth: 489 };
  if (item.upgradeTrack !== "" && item.upgradeTrack in itemLevelCaps) {
    fullItemLevels.forEach((level) => {
      if (level > itemLevel && level <= itemLevelCaps[item.upgradeTrack]) {
        items.push({ id: items.length + 1, ilvlMinimum: level, label: "Upgrade to " + level });
      }
    });
  }

  return items;
};

const getExtraMenuItems = (item: any): MenuItemType[] => {
  const items: MenuItemType[] = [];

  if (CONSTANTS.socketSlots.includes(item.slot) && item.slot !== "Neck") {
    // If the item is in a compatible slot, add an option to add or remove a socket.
    // Note that necks are hard coded to have three sockets so we won't offer the option there.
    if (!item.socket) items.push({id: items.length + 1, ilvlMinimum: 0, label: "Add Socket"})
    //else items.push({id: items.length + 1, ilvlMinimum: 0, label: "Remove Socket"})

  }
  if (!item.vaultItem) items.push({id: items.length + 1, ilvlMinimum: 0, label: "Convert to Vault"})

  // Add embellishment options.
  
  
  return items;

}

const ItemCardButtonWithMenu: React.FC<ItemCardButtonWithMenuProps> = ({ key, deleteActive, deleteItem, canBeCatalyzed, catalyseItemCard, itemLevel, upgradeItem, item }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const menuItems = getMenuItems(item);
  const extraMenuItems = getExtraMenuItems(item);
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
    if (menuItem.label === "Add Socket") upgradeItem(item, 0, true, false);
    else if (menuItem.label === "Convert to Vault") upgradeItem(item, 0, false, true);
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
            border: "1px solid #888888",
            borderRadius: "4px",
          },
        }}
      >
        {canBeCatalyzed ? (
          <MenuItem onClick={handlecatalyseItemCard} style={{ color: "plum" }} divider>
            {t("Catalyst")}
          </MenuItem>
        ) : null}
        {menuItems
          .filter((filter) => filter.ilvlMinimum > itemLevel)
          .map((item) => (
            <MenuItem key={item.id} onClick={() => handleMenuItemClick(item)} divider>
              {item.label}
            </MenuItem>
        ))}
        {extraMenuItems
          .map((item) => (
            <MenuItem key={item.id} onClick={() => handleExtraMenuItemClick(item)} divider>
              {item.label}
            </MenuItem>
          ))}

        {deleteActive ? (
          <MenuItem onClick={handledeleteItem} style={{ color: "#ff1744" }}>
            {t("Delete")}
          </MenuItem>
        ) : null}
      </Menu>
    </div>
  );
};

export default ItemCardButtonWithMenu;
