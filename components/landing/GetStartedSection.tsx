import { Box, Typography } from "@mui/material"
import router from "next/router"
import React from "react"
import ContainedButton from "../UI/button/ContainedButton"
import styles from "../../styles/landing/landing.module.css"

function GetStartedSection() {
  return (
    <Box className={styles.getStartedSection}>
      <Box sx={{ height: 220 }} />
      <Box className={styles.getStartedSectionBackground} />
      <Box className={styles.getStartedSectionContainer}>
        <Box className={styles.getStartedButtonContainer}>
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
        </Box>
        <Box className={styles.getStartedDescription}>
          <Typography color="#fff" align="center" fontSize={16}>
            Warden aims to develop a unified platform of an NFT collection
            generator, a native marketplace, and an events management system to
            address these issues using the capabilities of NFT and blockchain
            technology. We aim to bring back trust to the customers, regain
            control of the secondary market, and redirect ticket resale revenues
            back to the event organizers.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default GetStartedSection
