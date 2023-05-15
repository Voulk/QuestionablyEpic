import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";

export default function ItemCardButtonWithMenu({ key, deleteActive, deleteItem, canBeCatalyzed, catalyseItemCard, itemLevel }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();

  const menuItems = [
    { id: 1, ilvlMinimum: 428, label: "Upgrade to 428" },
    { id: 2, ilvlMinimum: 431, label: "Upgrade to 431" },
    { id: 3, ilvlMinimum: 434, label: "Upgrade to 434" },
    { id: 4, ilvlMinimum: 437, label: "Upgrade to 437" },
    { id: 5, ilvlMinimum: 441, label: "Upgrade to 441" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to execute when menu item is clicked
  const handleMenuItemClick = (menuItem) => {
    console.log(`Menu item ${menuItem.label} clicked`);
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
