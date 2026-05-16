import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

interface HoverMenuProps {
  handleClicked: (value: string) => void;
  exportOptions: string[];
  sx?: any;
}

export default function HoverMenu({ handleClicked, exportOptions, sx }: HoverMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: string) => {
    handleClicked(value);
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
        sx={sx}
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
