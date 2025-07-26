import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';

import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEvent } from '../../contexts/EventContext';

export default function HomePage() {
  const navigate = useNavigate()
  const { eventList, getAllEvent, addDataEvent, participantList, fetchParticipants, registerEvent} = useEvent()

  useEffect(()=>{
    getAllEvent()
  },[])
  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6)' }}>
        <Toolbar>
          <span style={{ fontSize: '24px', marginRight: '8px' }}>🎟️</span>
          <Typography variant="h6" component="div">
            ProofAttendee
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{mt:2}}>
        <Container sx={{ background: 'linear-gradient(to right, #4f46e5, #8b5cf6)', py: 2, color: 'white', borderRadius:5 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Gunakan Layanan Registrasi & Kehadiran Digital
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Sertifikat terpercaya, kehadiran tercatat secara permanen. Solusi aman untuk seminar dan event Anda.
          </Typography>

          <Grid container spacing={3}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🔐 Proof of Attendance
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Peserta yang hadir secara online atau offline akan menerima bukti kehadiran digital yang tercatat di blockchain.
                </Typography>
                <List>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <span role="img" aria-label="check" style={{ fontSize: '18px', color: 'green' }}>✔️</span>
                    </ListItemIcon>
                    <ListItemText primary="Unik & Tidak Bisa Dipalsukan" />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <span role="img" aria-label="check" style={{ fontSize: '18px', color: 'green' }}>✔️</span>
                    </ListItemIcon>
                    <ListItemText primary="Dapat diverifikasi publik kapan saja" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5 }}>
            <Button variant="contained" color="primary" onClick={()=>navigate('/login')}>
              Gabung Bersama kami
            </Button>
            <Button variant="outlined" color="inherit" href="#event">
              Lihat Kegiatan Kami
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box id="features" sx={{ py: 2, bgcolor: 'white' }}>
        <Container>
          <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
            Keunggulan Sistem Kehadiran Berbasis Blockchain
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ maxWidth: '600px', mx: 'auto', mb: 6 }}>
            Sistem ini memberikan transparansi, keamanan, dan efisiensi dalam pencatatan kehadiran seminar—baik online maupun offline.
          </Typography>

          <Grid container spacing={4}>
            {[{
              icon: '🧬',
              title: '1. Verifikasi Sertifikat Secara Publik',
              desc: 'Setiap sertifikat kehadiran memiliki hash unik yang tercatat di blockchain, sehingga keasliannya dapat diverifikasi secara publik tanpa bergantung pada panitia.',
              points: ['Dapat diverifikasi secara independen', 'Mencegah pemalsuan sertifikat']
            }, {
              icon: '🛡️',
              title: '2. Transparan & Tidak Dapat Dimanipulasi',
              desc: 'Semua data kehadiran disimpan secara permanen dalam blockchain, memastikan tidak ada pihak yang bisa mengubah atau menghapus catatan.',
              points: ['Audit trail permanen dan transparan', 'Integritas data terjamin']
            }, {
              icon: '📷',
              title: '3. Otomatisasi Kehadiran Online & Offline',
              desc: 'Kehadiran dicatat secara otomatis melalui integrasi Zoom webhook untuk seminar online dan pemindaian QR Code untuk seminar offline.',
              points: ['Minim intervensi manual panitia', 'Proses efisien dan real-time']
            }].map((item, index) => (
              <Grid item size={{ xs: 12, md: 4 }} key={index}>
                <Paper sx={{ p: 4, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                  <Box sx={{ mb: 2, fontSize: '32px' }}>{item.icon}</Box>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>{item.desc}</Typography>
                  <List>
                    {item.points.map((point, i) => (
                      <ListItem key={i} disablePadding>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <span style={{ color: 'green', fontSize: '18px' }}>✔️</span>
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box id="event" sx={{ py: 2 }}>
        <Container>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Event Tersedia
          </Typography>

          <Grid container spacing={4}>
            {eventList.map((event, index) => (
              <Grid item size={{ xs: 12, md: 6 }} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{event.eventName}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{event.eventDate}</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography fontWeight="bold">{event.eventType}</Typography>
                      </Box>
                      <Button variant="contained" size="small" color="primary" onClick={()=>navigate('/login')}>Register & Join</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
