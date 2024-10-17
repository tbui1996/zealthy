import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, AdminPanelSettings as AdminIcon, TableChart as TableIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const NavigationDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const menuItems = [
    { text: 'User Onboarding', icon: <HomeIcon />, path: '/' },
    { text: 'Admin Section', icon: <AdminIcon />, path: '/admin' },
    { text: 'Data Table', icon: <TableIcon />, path: '/data' },
  ];

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} component={RouterLink} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;