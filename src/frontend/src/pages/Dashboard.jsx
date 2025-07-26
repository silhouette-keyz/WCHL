import React, { useEffect, useState, useContext } from "react";
import { AuthClient } from "@dfinity/auth-client";
import Layout from "../components/Layout/Layout";
import { getActorInstance } from "../utils/actor";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import HomePage from "./LandingPage/HomePage";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { Box, Divider, Typography } from "@mui/material";
import EventPage from "./EventPage";
import CertificatePage from "./CertificatePage";
import ProfilePage from "./ProfilePage";

function Dashboard(props) {
  const { loading, user} = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Memuat...</div>;
  }

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert
          severity="success"
          // action={
          //   <Button variant='contained' color="primary" size="small">
          //     Update Profile
          //   </Button>
          // }
        >
          Selamat Datang di Aplikasi Proof of Attend berbasis blockchain
        </Alert>
      </Stack>
      <Box sx={{pt:1, pb:1}}>
          
          <Typography variant="h5">My Profile</Typography>
          <Divider />
          <ProfilePage />
      </Box>
      {
        user &&
        <>
          <Box sx={{pt:1, pb:1}}>
              <Typography variant="h5">Event List</Typography>
              <Divider />
              <EventPage />
          </Box>
          <Box sx={{pt:1, pb:1}}>
            
            <Typography variant="h5">My Achievement</Typography>
            <Divider />
            <CertificatePage />
          </Box>
        </>
      }
      
      {/* {user ? (
        <div className="text-center">
          <p className="mb-1">👤 <strong>Username:</strong> {user.username}</p>
          <p className="mb-1">🔐 <strong>Role:</strong> {user.role}</p>
          <p className="mb-1">🕒 <strong>Registered At:</strong> {new Date(user.registeredAt / 1_000_000).toLocaleString()}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading user info...</div>
      )} */}
    </>
  );
}

export default Dashboard;
