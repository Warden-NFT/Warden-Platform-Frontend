import Navbar from './NavBar'
import Footer from './Footer'
import React from 'react'
import { Box, Container } from '@mui/material'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Container>
        <Navbar />
        <main>
          <Container sx={{ minHeight: '640px', padding: '12px !important' }}>
            {children}
          </Container>
        </main>
      </Container>
      <Footer />
    </Box>
  )
}
