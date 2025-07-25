import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

interface HoverMenuProps {
  handleClicked: (value: string) => void;
  gameType: gameTypes;
}

export default function HoverMenu({ handleClicked, gameType }: HoverMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: string) => {
    handleClicked(value);
    setAnchorEl(null);
  };

  const exportOptions = []

  if (gameType === "Classic") {
    exportOptions.push("ReforgeLite Export");
    exportOptions.push("Wowhead Gear Planner");
  }
  if (window.location.href.includes("localhost") || window.location.href.includes("ptr")) exportOptions.push("Wowhead BIS List");

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
        {exportOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
