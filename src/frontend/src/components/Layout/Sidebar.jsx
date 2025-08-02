import React from 'react';
import {
  Box,
  Toolbar,
  Drawer,
  List,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  ClipboardList,
  Award,
  ArrowLeft,
} from 'lucide-react';

import { useNavigate } from 'react-router';
import { useLayout } from './../../contexts/LayoutContext';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const { isSidebarOpened, toggleSidebar } = useLayout();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard' },
    { name: 'Events', icon: <CalendarCheck size={20} />, path: '/app/events' },
    { name: 'Certificates', icon: <Award size={20} />, path: '/app/certificates' },
  ];

  return (
    <Drawer
      variant="persistent"
      open={isSidebarOpened}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Sidebar Toggle Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={() => toggleSidebar()}>
          <ArrowLeft />
        </IconButton>
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="h6">My App</Typography>
      </Box>
      {/* Spacer to align below AppBar if any */}

      {/* Menu Items */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
