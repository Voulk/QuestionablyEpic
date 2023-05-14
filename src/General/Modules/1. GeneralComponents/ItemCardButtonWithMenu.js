import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function ItemCardButtonWithMenu() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuItems = [
    { id: 1, label: 'Menu Item 1' },
    { id: 2, label: 'Menu Item 2' },
    { id: 3, label: 'Menu Item 3' },
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

  return (
    <div>
      <IconButton sx={{ padding: 0 }} color="primary" onClick={handleClick} aria-label={label} size="small">
        <CompareArrowsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.id} onClick={() => handleMenuItemClick(item)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
