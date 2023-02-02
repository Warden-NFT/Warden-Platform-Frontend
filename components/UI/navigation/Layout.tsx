import Navbar from "./NavBar"
import Footer from "./Footer"
import React, { useContext } from "react"
import { Backdrop, Box, CircularProgress, Container } from "@mui/material"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showLoadingBackdrop } = useContext(LayoutContext)
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoadingBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
