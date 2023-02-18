import { Container, Stack, Typography } from "@mui/material"
import React from "react"
import ImageLabelCard from "../UI/card/ImageLabelCard"
import { useRouter } from "next/router"
import { cyan, orange } from "@mui/material/colors"
import Image from "next/image"

function GenerateModeSelector() {
  const router = useRouter()

  return (
    <Container>
      <Stack direction="column" spacing={2}>
        <Typography variant="body1"></Typography>
        <Stack direction="column" gap={4}>
          <div
            onClick={() => {
              router.push({
                pathname: "ticket/asset"
              })
            }}
          >
            <ImageLabelCard
              imgUrl="/images/generate/complete-colors.jpg"
              title="Create with Complete Assets"
              description="Ticket will be created with your uploaded assets such as image or video. You can also customize the quantity of each assets to be distributed to your customers."
              colorFrom="rgba(255,255,255,0.6)"
              colorTo="rgba(255,255,255,0.6)"
            />
          </div>

          <div
            onClick={() => {
              router.push({
                pathname: "ticket/layer"
              })
            }}
          >
            <ImageLabelCard
              imgUrl="/images/generate/layer-colors.avif"
              title="Create with Layered Assets"
              description="Ticket will be created with your uploaded assets and randomly generate by its rarity. You can customize the rarity of each asset or layer."
              containerStyles={{ backgroundColor: cyan[500] }}
            />
          </div>
        </Stack>
      </Stack>
    </Container>
  )
}

export default GenerateModeSelector
