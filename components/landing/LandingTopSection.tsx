import { Grid, Typography, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import ContainedButton from "../UI/button/ContainedButton"
import Ticket from "../ticket/Ticket"
import Link from "next/link"
import { GitHub, LinkOutlined } from "@mui/icons-material"
import { dark } from "@mui/material/styles/createPalette"

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
          maxWidth: "1200px",
          px: 3
        }}
      >
        <Grid item xs={10} md={5} lg={5} maxWidth="xl">
          <Box sx={{ height: [20, 20, 120] }} />
          <Typography variant="h3" component="h1" fontWeight={500}>
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
              router.push("/marketplace")
            }}
            disabled={false}
            variant="contained"
            label="Get started"
            height="40px"
            width="200px"
          />
          <Box sx={{ width: 200, mt: [2, 2, 30] }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeOut", duration: 0.1 }}
              style={{ border: `2px solid ${grey[900]}`, padding: "8px" }}
            >
              <Link
                href="https://github.com/Warden-NFT"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: grey[900],
                  display: "flex",
                  gap: "12px"
                }}
              >
                <GitHub />
                <Typography>View on Github</Typography>
              </Link>
            </motion.div>
          </Box>
        </Grid>
        <Grid
          item
          xs={10}
          md={7}
          maxWidth="xl"
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            transform: ["scale(0.7)", "scale(0.7)", "scale(1)", "scale(1)"],
            right: [40, 40, "inherit", "inherit"]
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
                assetSrc="/images/landing/ticket-image-conference.jpg"
                assetName="Chicken Conference"
                eventName="Among Us Party"
                eventOrganizer="Gus Fring"
                ticketType="GENERAL"
                date={new Date()}
                seat="A 14"
                location="LOS POLOS HEMANOS"
                codeDisplayMode="QR"
                codeValue="https://www.youtube.com/watch?v=B9RgougnhiE"
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
                assetSrc="/images/landing/ticket-image-theatre.jpg"
                assetName="Test1"
                eventName="Batman Begins"
                eventOrganizer="Chill"
                ticketType="GENERAL"
                date={new Date()}
                location="Monarch Theatre"
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
                assetSrc="/images/landing/ticket-image-dj.jpg"
                assetName="Test1"
                eventName="Among Us Party"
                eventOrganizer="Warden"
                ticketType="GENERAL"
                date={new Date()}
                location="CHULALONGKORN"
                codeDisplayMode="QR"
                codeValue="https://goo.gl/maps/z9UQha4fGgmPHghv7"
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
