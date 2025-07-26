import React, { useEffect, useState } from 'react'
import { Typography, TextField, Container, Grid, Box, CardMedia, Chip, CardContent, Card, Button, Dialog, CardActions, Divider, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material'
import { useEvent } from '../contexts/EventContext'
import DialogComponent from '../components/Dialog'
import { useAuth } from '../auth'
import { numbertoStringDate } from '../utils/numbertoStringDate'
import QRCode from "react-qr-code";
import QrReader from 'react-qr-scanner'

export default function EventPage() {
  const { eventList, getAllEvent, addDataEvent, participantList, fetchParticipants, registerEvent,
    getMyCertificates, getCertificateEvent,
    myCertificateList, certificateList,
    createNFTCertificate

  } = useEvent()
  const { user, principal } = useAuth();
  const [openModal, setOpenModal] = useState(false)
  const [formEvent, setFormEvent] = useState({})
  const [openJoinModal, setOpenJoinModal] = useState(false)
  const [openEventDetail, setOpenEventDetail] = useState(false)
  const [formRegisterEvent, setFormRegisterEvent] = useState({})
  const [eventChoose, setEventChoose] = useState({})
  const [registered, setRegistered] = useState(false)
  const [delay, setDelay] = useState(100)
  const [resultQR, setResultQR] = useState("")
  const [readyScanQR, setReadyScanQR] = useState(false)
  
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
    registerEvent(eventChoose.id)
    handleCloseModal()
  }

  const viewDetail = async(data)=>{
    setOpenEventDetail(true)
    setEventChoose(data)
    await fetchParticipants(data.id)
  }

  const handleScanQR = (data) => {
    setResultQR(data)
  }

  const checkInEvent = (eventId, userId)=>{
    createNFTCertificate(eventId, userId)
  }
  
  return (
    <>
      <Button sx={{mt:1, mb:1}} variant='contained' color='primary' onClick={()=>{
        handleOpen()
      }}>Add Event</Button>
      <DialogComponent
        title="Add Event Data"
        open={openModal}
        handleClose={handleCloseModal}
        handleSubmit={submitEvent}
        showSubmit={true}
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
        title={eventChoose.eventName}
        open={openJoinModal}
        handleClose={handleCloseModal}
        handleSubmit={joinEvent}
        showSubmit={!registered}
      >
        <Typography><strong>Event Name:</strong> {eventChoose.eventName}</Typography>
        <Typography><strong>Event Type:</strong> {eventChoose.eventType}</Typography>
        <Typography><strong>Event Date:</strong> {eventChoose.eventDate}</Typography>
        {
          registered ?
          <Box>
            <Divider />
            <div style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}>
              <QRCode
                value={user.userId+"&"+eventChoose.id}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <Typography>Tunjukkan QR Code pada saat check in kehadiran saat penyelenggaraan event</Typography>
          </Box>:
          <Box>
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
          </Box>
        }
        
        
      </DialogComponent>

      <DialogComponent
        title={eventChoose.eventName}
        open={openEventDetail}
        handleClose={handleCloseModal}
        handleSubmit={joinEvent}
        fullScreen={true}
        showSubmit={false}
      >
        <Typography><strong>Event Name:</strong> {eventChoose.eventName}</Typography>
        <Typography><strong>Event Type:</strong> {eventChoose.eventType}</Typography>
        <Typography><strong>Event Date:</strong> {eventChoose.eventDate}</Typography>
        {readyScanQR ?
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f4f4f4",
            }}
          >
             <div style={{ width: "100%", maxWidth: 480, padding: 16 }}>
                <QrReader
                  delay={delay}
                  style={{
                    width: "100%",
                    height: "auto", // atau gunakan aspect ratio
                  }}
                  onError={(err)=>console.log('error', err)}
                  onScan={handleScanQR}
                  />
                <p>{resultQR}</p>
              </div> 
          </div>: 
          <>
            <Typography variant="h6" sx={{mt:2}} gutterBottom>
              Participants
            </Typography>
            <Button variant='contained' color='primary' onClick={()=>setReadyScanQR(true)}>Scan QR Code</Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telp</TableCell>
                  <TableCell>Register Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  participantList.map((item,index)=>{
                    return(
                      <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.telp}</TableCell>
                        <TableCell>{ numbertoStringDate(item.RegisterDate)}</TableCell>
                        <TableCell>
                          
                        </TableCell>
                        <TableCell>
                          <Button variant='contained' color='primary' onClick={()=> checkInEvent(eventChoose.id, item.userId)}>Check-in</Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </>
           }
        
        
      </DialogComponent>


      <Grid container spacing={2}>
        {eventList.map((item, index) => (
          <Grid item size={{ xs: 12, md: 6 }} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{item.eventName}</Typography>
                <Typography variant="body2" color="text.secondary">{item.eventDate}</Typography>
                <Typography variant="body2" color="text.secondary">{item.eventType}</Typography>
              </CardContent>
              <CardActions>
                  <Button sx={{width:'100%'}} variant="contained" size="small" color="primary" onClick={async()=> 
                    {
                      setRegistered(false)
                      const response = await fetchParticipants(item.id)
                      console.log('response fe', response, principal)
                      if(response.filter(x=>x.username === user.username).length>0){
                        setRegistered(true)
                      }
                      await handleJoin(item)
                    }
                    }>Register & Join</Button>
                  <Button sx={{width:'100%'}} variant="contained" size="small" color="primary" onClick={()=>viewDetail(item)} >Lihat Detail</Button>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
