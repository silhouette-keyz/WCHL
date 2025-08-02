import React, {useContext} from 'react';
import { Box, Button, Typography, Paper, Container } from '@mui/material';
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, user, principal,logout, isAuthenticated } = useAuth();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #3b82f6, #6366f1, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.9)' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
            Proof of Attendance
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Silakan login terlebih dahulu menggunakan Internet Identity
          </Typography>
          {/* Authenticate : {
            JSON.stringify(isAuthenticated)
          } */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, flex:1, borderRadius: 999, boxShadow: 3 }}
            onClick={async()=> {
              await login()
              navigate('/app/dashboard')
            }}
          >
            Login dengan Internet Identity
          </Button>
          <br/>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2,  flex:1,borderRadius: 999, boxShadow: 3 }}
            onClick={async()=> {
              navigate('/')
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
