import Navbar from './NavBar'
import Footer from './Footer'
import React from 'react'
import { Container } from '@mui/material'

export default function Layout({ children }: { children: React.ReactNode }) {
      return (
            <>
                  <Container>
                        <Navbar />
                        <main>
                              <Container sx={{ minHeight: '640px' }}>
                                    {children}
                              </Container>
                        </main>
                  </Container>
                  <Footer />
            </>
      )
}