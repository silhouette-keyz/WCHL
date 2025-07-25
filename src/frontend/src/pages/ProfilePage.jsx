import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { useAuth } from '../auth';

export default function UpdateProfileForm() {
    const { principal, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Lakukan aksi update profile di sini (misalnya API call)
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Update Profile
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
        <TextField
          fullWidth
          margin="normal"
          label="Kode Principal"
          name="Principant ID"
          value={principal}
          disabled={true}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
        >
          Simpan Perubahan
        </Button>
      </Box>
    </Paper>
  );
}
