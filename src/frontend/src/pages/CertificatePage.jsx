import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useEvent } from '../contexts/EventContext'

export default function CertificatePage() {
  const { eventList, getAllEvent, addDataEvent, participantList, fetchParticipants, registerEvent,
    getMyCertificates, getCertificateEvent,
    myCertificateList, certificateList,
    createNFTCertificate

  } = useEvent()

  const [myCertificateJoinEvent, setMyCertificateJoinEvent] = useState([])

  const loadData = async()=>{
    const _events = await getAllEvent()
    const _certificate = await getMyCertificates()
    const dataJoin = _certificate.map(item=>{
      const _filter = _events.filter(x=>x.id === item.eventId)
      if(_filter.length>0)
      {
        return(
          {...item, eventName : _filter[0].eventName, eventDate : _filter[0].eventDate}
        )
      }
      else{
        return item
      }
    })
    setMyCertificateJoinEvent(dataJoin)
  }

  useEffect(()=>{
    loadData()
  },[])
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{width:10, textAlign:'center'}}>No</TableCell>
            <TableCell style={{width:'30%'}}>Event</TableCell>
            <TableCell style={{width:'10%'}}>Date</TableCell>
            <TableCell>Certificate</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {
              myCertificateJoinEvent.map((itemCertificate, index)=>{
                return(
                  <TableRow>
                    <TableCell style={{width:10, textAlign:'center'}}>{index+1}</TableCell>
                    <TableCell style={{width:'30%'}}>{itemCertificate.eventName}</TableCell>
                    <TableCell style={{width:'10%'}}>{itemCertificate.eventDate}</TableCell>
                    <TableCell>{itemCertificate.certificateHash}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        
      </Table>
    </div>
  )
}
