import Navbar from './NavBar'
import Footer from './Footer'
import React from 'react'
import { Container } from '@mui/material'

export default function Layout({ children }: { children: React.ReactNode }) {
      return (
            <>
                  <Container>
                        <Navbar />
                        <main>{children}</main>
                  </Container>
                  <Footer />
            </>
      )
}