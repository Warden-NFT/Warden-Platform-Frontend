import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import React from "react"
import AnimateWhenInView from "../motion/AnimateWhenInView"

const blackGradient = `radial-gradient(
  116.3% 117.1% at 93.9% 40.4%,
  rgb(43, 46, 49) 0%,
  rgb(0, 0, 0) 100%
);`

const blueGradient = `radial-gradient(
  116.3% 117.1% at 93.9% 40.4%,
  rgb(146, 196, 255) 0%,
  rgb(255, 255, 255) 100%
);`

function IssuesSection() {
  return (
    <Box sx={{ maxWidth: "1200px" }}>
      <Typography variant="h4" component="h4">
        Issues with the ticketing industry
      </Typography>
      <Box sx={{ height: 24 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: ["wrap", "wrap", "inherit"]
        }}
      >
        <Box
          sx={{
            height: "fit-content",
            width: ["100%", "100%", "50%"],
            padding: 4,
            color: "#fff",
            background: blackGradient
          }}
        >
          <AnimateWhenInView>
            <Image
              src="/images/landing/trust.png"
              width={100}
              height={100}
              alt="trust"
            />
          </AnimateWhenInView>
          <Box sx={{ height: 24 }} />
          <Typography variant="h6" component="h6">
            Issues of Authenticity and Customer Trust
          </Typography>
          <Box sx={{ height: 24 }} />
          <Typography component="p">
            Need to track the authenticity and history of tickets
          </Typography>
          <Typography component="p">
            Event organizers need to verify the authenticity of the ticket and
            ticket holders
          </Typography>
        </Box>
        <Box
          sx={{
            height: "fit-content",
            width: ["100%", "100%", "50%"],
            padding: 4,
            color: "#000",
            background: blueGradient
          }}
        >
          <AnimateWhenInView>
            <Image
              src="/images/landing/control.png"
              width={100}
              height={100}
              alt="trust"
            />
          </AnimateWhenInView>
          <Box sx={{ height: 24 }} />
          <Typography variant="h6" component="h6">
            Issues of Authenticity and Customer Trust
          </Typography>
          <Box sx={{ height: 24 }} />
          <Typography component="p">
            Need to track the authenticity and history of tickets
          </Typography>
          <Typography component="p">
            Event organizers need to verify the authenticity of the ticket and
            ticket holders
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default IssuesSection
