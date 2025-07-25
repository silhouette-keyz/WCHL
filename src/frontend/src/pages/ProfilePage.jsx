import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select
} from '@mui/material';
import { useAuth } from '../auth';
import { backend } from "declarations/backend";

export default function ProfileViewForm() {
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
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      {userExists && !editData ? (
        <>
          <Typography variant="h6" gutterBottom>
            Profile Anda
          </Typography>
          <Typography><strong>Nama:</strong> {formData.name}</Typography>
          <Typography><strong>Email:</strong> {formData.email}</Typography>
          <Typography><strong>Whatsapp:</strong> {formData.whatsapp}</Typography>
          <Typography><strong>Role:</strong> {formData.role}</Typography>
          <Button variant='contained' color="primary" onClick={()=>setEditData(true)}>Edit</Button>
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
    </Paper>
  );
}
