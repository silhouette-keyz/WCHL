import React, { useEffect, useState } from 'react'
import { Typography, TextField, Container, Grid, Box, CardMedia, Chip, CardContent, Card, Button, Dialog, CardActions, Divider, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material'
import { useEvent } from '../contexts/EventContext'
import DialogComponent from '../components/Dialog'
import { useAuth } from '../auth'

export default function EventPage() {
  const { eventList, getAllEvent, addDataEvent, participantList, fetchParticipants} = useEvent()
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false)
  const [formEvent, setFormEvent] = useState({})
  const [openJoinModal, setOpenJoinModal] = useState(false)
  const [openEventDetail, setOpenEventDetail] = useState(false)
  const [formRegisterEvent, setFormRegisterEvent] = useState({})
  const [eventChoose, setEventChoose] = useState({})
  useEffect(()=>{
    getAllEvent()
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEvent(prev => ({ ...prev, [name]: value }));
  };
  
  const handleOpen = async()=>{
    setFormEvent({})
    setOpenModal(true)
  }

  const handleJoin = async(data)=>{
    setEventChoose(data)
    setOpenJoinModal(true)
  }

  const handleCloseModal = async()=>{
    setOpenModal(false)
    setOpenJoinModal(false)
    setOpenEventDetail(false)
  }

  const submitEvent = async()=>{
    await addDataEvent(formEvent.eventName, formEvent.eventType, formEvent.eventDate)
    handleCloseModal()
  }

  const joinEvent = async()=>{
    handleCloseModal()
  }

  const viewDetail = async(data)=>{
    setOpenEventDetail(true)
    setEventChoose(data)
    await fetchParticipants(data.id)
  }
  
  return (
    <Container>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Event List
      </Typography>
      <Button variant='contained' color='primary' onClick={()=>{
        handleOpen()
      }}>Add Event</Button>
      <DialogComponent
        title="Add Event Data"
        open={openModal}
        handleClose={handleCloseModal}
        handleSubmit={submitEvent}
      >
        <Box>
          <TextField
            fullWidth
            margin="normal"
            label="Event Name"
            name="eventName"
            value={formEvent.eventName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="eventType"
            name="eventType"
            value={formEvent.eventType}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Event Date"
            name="eventDate"
            value={formEvent.eventDate}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogComponent>

      <DialogComponent
        title="Join Event"
        open={openJoinModal}
        handleClose={handleCloseModal}
        handleSubmit={joinEvent}
      >
        <Typography variant="h6" gutterBottom>
          Event Info
        </Typography>
        <Typography><strong>Nama:</strong> {eventChoose.eventName}</Typography>
        <Typography><strong>Email:</strong> {eventChoose.eventType}</Typography>
        <Typography><strong>Whatsapp:</strong> {eventChoose.eventDate}</Typography>

        <Typography variant="h6" gutterBottom>
          User Profile
        </Typography>
        <Typography><strong>Nama:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.username}</Typography>
        <Typography><strong>Whatsapp:</strong> {user.telp}</Typography>
        <Divider />
        <Typography variant="h6" gutterBottom>
          Are you sure join & register this event?
        </Typography>
      </DialogComponent>

      <DialogComponent
        title={eventChoose.eventName}
        open={openEventDetail}
        handleClose={handleCloseModal}
        handleSubmit={joinEvent}
      >
        <Typography variant="h6" gutterBottom>
          Event Info
        </Typography>
        <Typography><strong>Event Name:</strong> {eventChoose.eventName}</Typography>
        <Typography><strong>Event Type:</strong> {eventChoose.eventType}</Typography>
        <Typography><strong>Event Date:</strong> {eventChoose.eventDate}</Typography>

        <Typography variant="h6" gutterBottom>
          Participants
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telp</TableCell>
              <TableCell>Register Date</TableCell>
              <TableCell>Check In</TableCell>
            </TableRow>
            <TableBody>
              {
                JSON.stringify(participantList)
              }
            </TableBody>
          </TableHead>
        </Table>
      </DialogComponent>
      <Grid container spacing={4}>
        {eventList.map((item, index) => (
          <Grid item size={{ xs: 12, md: 4 }} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{item.eventName}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{item.eventDate}</Typography>
                
              </CardContent>
              <CardActions>
                  <Button sx={{width:'100%'}} variant="contained" size="small" color="primary" onClick={()=> handleJoin(item)}>Register & Join</Button>
                  <Button sx={{width:'100%'}} variant="contained" size="small" color="primary" onClick={()=>viewDetail(item)} >Lihat Detail</Button>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
