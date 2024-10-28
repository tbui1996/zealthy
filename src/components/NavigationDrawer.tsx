import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box,
  IconButton,
  Typography,
  Divider,
  ListItemButton
} from '@mui/material';
import { 
  Home as HomeIcon, 
  AdminPanelSettings as AdminIcon, 
  TableChart as TableIcon,
  ChevronLeft as ChevronLeftIcon 
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface NavigationDrawerProps {
  onClose?: () => void;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ onClose }) => {
  const location = useLocation();
  const menuItems = [
    { text: 'User Onboarding', icon: <HomeIcon />, path: '/' },
    { text: 'Admin Section', icon: <AdminIcon />, path: '/admin' },
    { text: 'Data Table', icon: <TableIcon />, path: '/data' },
  ];

  return (
    <Box sx={{ width: 240 }}>
      {onClose && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2
        }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding
          >
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={onClose}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavigationDrawer;