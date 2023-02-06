import { Grid, Typography, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import ContainedButton from "../UI/button/ContainedButton"
import Ticket from "../UI/ticket/Ticket"

function LandingTopSection() {
  const router = useRouter()
  const controls = useAnimation()

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.6,
          type: "tween"
        }}
      >
        <Image
          src="/images/landing/background.webp"
          height="640"
          width="2500"
          alt="background"
          draggable={false}
          style={{
            position: "absolute",
            left: 0,
            objectFit: "cover",
            width: "100vw",
            height: "640px"
          }}
        />
      </motion.div>
      <Grid
        container
        justifyContent="center"
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          margin: "0 auto",
          maxWidth: "1200px"
        }}
      >
        <Grid item xs={4} maxWidth="xl">
          <Box sx={{ height: 120 }} />
          <Typography variant="h3" component="h1">
            Warden
          </Typography>
          <Box sx={{ height: 12 }} />
          <Typography component="p" color={grey[700]}>
            A one-stop event-ticketing platform that mitigates the issue of
            ticket authenticity, and the lack of secondary market control over
            ticket transactions
          </Typography>
          <Box sx={{ height: 20 }} />
          <ContainedButton
            onClick={() => {
              router.push("/home")
            }}
            disabled={false}
            variant="contained"
            label="Get started"
            height="40px"
            width="200px"
          />
        </Grid>
        <Grid
          item
          xs={7}
          maxWidth="xl"
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <motion.div animate={controls} transition={{ staggerChildren: 0.5 }}>
            <motion.div
              key={1}
              initial={{ opacity: 0, transform: "rotate(20deg)" }}
              animate={{ opacity: 0.6, transform: "rotate(20deg)" }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                type: "spring",
                bounce: 0.4
              }}
              id="card1"
            >
              <Ticket
                assetSrc="/images/background/ticket-cover-test.jpg"
                assetName="Test1"
                eventName="Among Us Party"
                eventOrganizer="Warden"
                ticketType="GENERAL"
                date={new Date()}
                seat="A 14"
                location="MIRA HQ"
                codeDisplayMode="QR"
                codeValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
            </motion.div>
            <motion.div
              key={2}
              initial={{ opacity: 0, transform: "rotate(10deg)" }}
              animate={{ opacity: 0.8, transform: "rotate(10deg)" }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                type: "spring",
                bounce: 0.4
              }}
              id="card2"
            >
              <Ticket
                assetSrc="/images/background/ticket-cover-test.jpg"
                assetName="Test1"
                eventName="Among Us Party"
                eventOrganizer="Warden"
                ticketType="GENERAL"
                date={new Date()}
                seat="A 14"
                location="MIRA HQ"
                codeDisplayMode="QR"
                codeValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
            </motion.div>
            <motion.div
              key={3}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.4
              }}
              id="card3"
            >
              <Ticket
                assetSrc="/images/background/ticket-cover-test.jpg"
                assetName="Test1"
                eventName="Among Us Party"
                eventOrganizer="Warden"
                ticketType="GENERAL"
                date={new Date()}
                seat="A 14"
                location="MIRA HQ"
                codeDisplayMode="QR"
                codeValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
            </motion.div>
          </motion.div>
        </Grid>
      </Grid>
      <Box sx={{ height: "700px" }} />
    </Box>
  )
}

export default LandingTopSection
