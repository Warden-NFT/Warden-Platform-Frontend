import { Box, Typography } from "@mui/material"
import router from "next/router"
import React from "react"
import ContainedButton from "../UI/button/ContainedButton"

function GetStartedSection() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ height: 220 }} />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "240px",
          backgroundColor: "#1f1f1f"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100vw",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Box sx={{ position: "absolute", top: "-20px" }}>
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
        </Box>
        <Box sx={{ mt: 8, width: "600px" }}>
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
