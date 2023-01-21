import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import React from "react"
import AnimateWhenInView from "../motion/AnimateWhenInView"
import styles from "../../styles/landing/landing.module.css"

function IssuesSection() {
  return (
    <Box sx={{ maxWidth: "1200px" }}>
      <Typography variant="h4" component="h4">
        Issues with the ticketing industry
      </Typography>
      <Box sx={{ height: 24 }} />
      <Box className={styles.issuesSection}>
        <Box className={styles.issueCardBlack}>
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
        <Box className={styles.issueCardBlue}>
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
