import React from 'react'
import { Typography, Container, Grid, Box, CardMedia, Chip, CardContent, Card, Button } from '@mui/material'

export default function EventPage() {
  return (
    <Container>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Event Tersedia
      </Typography>

      <Grid container spacing={4}>
        {[{
          title: 'Ruang Bermusik 2025', date: '19-20 Juli 2025. Tasikmalaya.', price: 'IDR 150K', img: 'img/event.jpg', sold: '50%', id: 'event1'
        }, {
          title: 'La La Land In The Concert', date: '26 Juli 2025. JIExpo Kemayoran.', price: 'IDR 900K', img: 'img/event1.jpg', sold: '40%', id: 'event2'
        }, {
          title: 'R-I Fest 2025', date: '15-17 Agu 2025. Jiexpo Kemayoran', price: 'IDR 80K', img: 'img/event3.jpg', sold: '10%', id: 'event3'
        }].map((event, index) => (
          <Grid item size={{ xs: 12, md: 4 }} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{event.date}</Typography>
                <Button variant="contained" size="small" color="primary">Details</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
