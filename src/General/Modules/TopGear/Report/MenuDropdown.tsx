import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export default function HoverMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls={open ? "click-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        color="primary"
        //size="small"
      >
        Export
      </Button>
      <Menu
        id="click-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClose}>ReforgeLite Export</MenuItem>
        <MenuItem onClick={handleClose}>Wowhead BIS List</MenuItem>
        <MenuItem onClick={handleClose}>JSON</MenuItem>
      </Menu>
    </>
  );
}
