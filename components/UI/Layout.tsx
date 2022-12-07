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
                              <Container sx={{ minHeight: '640px', paddingTop: 4 }}>
                                    {children}
                              </Container>
                        </main>
                  </Container>
                  <Footer />
            </>
      )
}