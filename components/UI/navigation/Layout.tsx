import Navbar from "./NavBar"
import Footer from "./Footer"
import React, { useContext, useEffect, useState } from "react"
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Modal,
  Typography
} from "@mui/material"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import AlertModal from "../../alert/AlertModal"
import { BotPreventionContext } from "../../../contexts/user/BotPreventionContext"
import Reaptcha from "reaptcha"
import { modalStyle } from "../../../styles/muiStyles"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showLoadingBackdrop } = useContext(LayoutContext)
  const { isRecaptchaShown, token, setToken, setIsRecaptchaShown } =
    useContext(BotPreventionContext)
  const [isSafari, setIsSafari] = useState(false)

  // This useEffect solve performance issue in Safari
  useEffect(() => {
    const _isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    setIsSafari(_isSafari)

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
      <Modal
        open={isRecaptchaShown}
        onClose={() => {
          if (token) setIsRecaptchaShown(false)
        }}
        aria-labelledby="recaptcha-modal"
        aria-describedby="confirm-recaptcha-modal"
      >
        <Box sx={{ ...modalStyle, width: "400px" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            RECAPTCHA
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            Please verify if you are a human
          </Typography>
          <Reaptcha
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onVerify={(response) => {
              setToken(response)
              setIsRecaptchaShown(false)
            }}
          />
        </Box>
      </Modal>
      <Box id={isSafari ? "" : "blob"} />
      <Container
        id={isSafari ? "" : "blur"}
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
