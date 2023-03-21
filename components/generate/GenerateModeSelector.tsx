import { Box, Container, Stack } from "@mui/material"
import React from "react"
import TextDescriptionCard from "../UI/card/TextDescriptionCard"
import { useRouter } from "next/router"
import BannerLayout from "../UI/layout/BannerLayout"

function GenerateModeSelector() {
  const router = useRouter()

  return (
    <BannerLayout
      backgroundImage="/images/background/event-background.jpeg"
      title="NFT Ticket Generator"
      subtitle="What mode would you like to use to generate your event ticket"
    >
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mt: 2,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)"]
        }}
      >
        <Box
          onClick={() => {
            router.push({
              pathname: "ticket/asset"
            })
          }}
          sx={{ width: "100%" }}
        >
          <TextDescriptionCard
            title="Complete Assets Mode"
            description="Ticket will be created with your uploaded assets such as image. You can also customize the quantity of each assets to match the amount of attendees."
          />
        </Box>

        <Box
          onClick={() => {
            router.push({
              pathname: "ticket/layer"
            })
          }}
        >
          <TextDescriptionCard
            title="Layered Assets Mode"
            description="Ticket will be created with your uploaded assets and randomly generate by its rarity. You can customize the rarity of each asset or layer."
          />
        </Box>
      </Box>
    </BannerLayout>
  )
}

export default GenerateModeSelector
