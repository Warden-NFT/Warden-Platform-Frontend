import { Alert, AlertTitle } from '@mui/material'
import { grey } from '@mui/material/colors'
import Link from 'next/link'
import React from 'react'

function EventCreationAlert() {
  return (
    <Alert
      variant="outlined"
      severity="info"
      sx={{ borderColor: grey[300], backgroundColor: grey[100] }}
    >
      <AlertTitle sx={{ color: 'black' }}>
        Have you create an event yet?
      </AlertTitle>
      Make sure to create an event before creating a ticket.{' '}
      <strong>
        You can create an event by
        <Link href="/create/event" style={{ marginLeft: 6 }}>
          clicking here!
        </Link>
      </strong>
    </Alert>
  )
}

export default EventCreationAlert
