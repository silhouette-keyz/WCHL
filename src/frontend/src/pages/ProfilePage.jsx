import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  Card, CardContent, Avatar, Badge
} from '@mui/material';
import { useAuth } from '../auth';
import { backend } from "declarations/backend";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function ProfilePage() {
  const { principal } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    role: ''
  });
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(false)

  // Fetch user data on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await backend.getUser();
        if (res.ok) {
          setFormData({
            name: res.ok.name,
            email: res.ok.username,
            whatsapp: res.ok.telp,
            role : Object.keys(res.ok.role)[0]
          });
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(!userExists)
        {
            const res = await backend.registerUser(formData.name, formData.email, formData.whatsapp);
            setUserExists(true);
        }
        else{
            const res = await backend.updateProfile(formData.name, formData.email, formData.whatsapp);
            setUserExists(true);
        }
      
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  if (loading) return <Typography align="center">Loading...</Typography>;

  return (
    <>
      
      {userExists && !editData ? (
        <>
          <Card sx={{ maxWidth: 345, margin: "auto", borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar
                    alt={formData.name}
                    src={"/default-avatar.png"}
                    sx={{ width: 80, height: 80 }}
                  />
                </StyledBadge>

                <Typography variant="h6" component="div">
                  {formData.name}
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                  {formData.email}
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                  {formData.whatsapp}
                </Typography>
                <Typography color="text.secondary" fontSize={14}>
                  {formData.role}
                </Typography>
                <Button variant='contained' color="primary" onClick={()=>setEditData(true)}>Update</Button>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Lengkapi Profil Anda
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Nama"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nomor Whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
            {!editData && <Select name="role" value={formData.role} onChange={handleChange}>
                <MenuItem value="superadmin">Super Admin</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
            </Select>}
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              fullWidth
            >
              Simpan Profil
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
 