import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function CertificatePage() {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{width:10, textAlign:'center'}}>No</TableCell>
            <TableCell style={{width:'30%'}}>Event</TableCell>
            <TableCell style={{width:100, textAlign:'center'}}>Status</TableCell>
            <TableCell>Certificate</TableCell>
          </TableRow>
          <TableBody>

          </TableBody>
        </TableHead>
      </Table>
    </div>
  )
}
