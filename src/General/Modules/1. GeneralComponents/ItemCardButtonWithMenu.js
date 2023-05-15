import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";

const getMenuItems = (item) => {
  const itemLevel = item.level;
  let items = []
  const fullItemLevels = [382, 385, 389, 392, 395, 398, 402, 405, 408, 411, 415, 418, 421, 424, 428, 431, 434, 437, 441]
  const itemLevelCaps = {"Champion": 437, "Hero": 441, "Explorer": 398, "Adventurer": 411, "Veteran": 424}

  if (item.upgradeTrack !== "") {
    fullItemLevels.forEach((level) => {
      if (level > itemLevel && itemLevel < itemLevelCaps[item.upgradeTrack]) {
        items.push({id: items.length+1, ilvlMinimum: level, label: "Upgrade to " + level})
      }
  
    })
  }


  return items;
}

export default function ItemCardButtonWithMenu({ key, deleteActive, deleteItem, canBeCatalyzed, catalyseItemCard, itemLevel, upgradeItem, item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();

  const menuItems = getMenuItems(item);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log(item.upgradeTrack);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to execute when menu item is clicked
  const handleMenuItemClick = (menuItem) => {
    console.log(`Menu item ${menuItem.label} clicked`);
    console.log(upgradeItem(item, menuItem.ilvlMinimum))
    handleClose();
  };

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
            border: "1px solid #888888", // Change this as per your requirement
            borderRadius: "4px", // Adds rounded corners to the border }
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
        {deleteActive ? (
          <MenuItem onClick={handledeleteItem} style={{ color: "#ff1744" }}>
            {t("Delete")}
          </MenuItem>
        ) : null}
      </Menu>
    </div>
  );
}
