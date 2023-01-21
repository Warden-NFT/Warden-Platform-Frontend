import { Container } from '@mui/material'
import React from 'react'
import withUserGuard from '../../../guards/user.guard'

function EventCreationPage() {
  return <Container>EventCreationPage</Container>
}

export default withUserGuard(EventCreationPage)
