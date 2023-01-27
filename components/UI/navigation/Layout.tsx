import Navbar from "./NavBar"
import Footer from "./Footer"
import React from "react"
import { Box, Container } from "@mui/material"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Container
        sx={{ padding: "0 !important", width: "100vw" }}
        maxWidth={false}
      >
        <Navbar />
        <Box sx={{ my: 8 }} />
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
