import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { useAuth } from '../../auth';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLayout } from '../../contexts/LayoutContext';

const drawerWidth = 0;

export default function Layout({ children }) {
  const { principal, logout } = useAuth();
  const { isSidebarOpened } = useLayout();

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />

      {/* Header */}
      <Header onLogout={logout} />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          transition: 'margin 0.3s',
          marginLeft: isSidebarOpened ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
