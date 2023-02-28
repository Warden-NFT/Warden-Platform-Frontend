import Navbar from "./NavBar"
import Footer from "./Footer"
import React, { useContext, useEffect } from "react"
import { Backdrop, Box, CircularProgress, Container } from "@mui/material"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import AlertModal from "../../alert/AlertModal"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showLoadingBackdrop } = useContext(LayoutContext)

  useEffect(() => {
    const blob = document.getElementById("blob")
    window.onpointermove = (event) => {
      const { clientX, clientY } = event

      blob?.animate(
        {
          left: `${clientX}px`,
          top: `${clientY + window.scrollY}px`
        },
        { duration: 3000, fill: "forwards" }
      )
    }
  }, [])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box id="blob" />
      <Container
        id="blur"
        sx={{
          padding: "0 !important",
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
        maxWidth={false}
      >
        <Box>
          <Navbar />
          <Box sx={{ height: "100%", display: "flex", flex: 1, mt: 8 }}>
            {children}
          </Box>
        </Box>
        <Footer />
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoadingBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AlertModal />
    </Box>
  )
}
