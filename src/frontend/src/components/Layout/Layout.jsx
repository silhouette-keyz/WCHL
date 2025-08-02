import React from 'react';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
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
      <Container sx={{mt:10}}>
        {children}
      </Container>
    </Box>
  );
}
