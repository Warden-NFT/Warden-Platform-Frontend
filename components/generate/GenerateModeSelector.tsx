import { Container, Stack } from "@mui/material"
import React from "react"
import ImageLabelCard from "../UI/card/ImageLabelCard"
import { useRouter } from "next/router"

function GenerateModeSelector() {
  const router = useRouter()

  return (
    <Container>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" gap={4}>
          <div
            onClick={() => {
              router.push({
                pathname: "ticket/asset"
              })
            }}
          >
            <ImageLabelCard
              imgUrl="/images/generate/complete-colors.jpg"
              title="Complete Assets Mode"
              description="Ticket will be created with your uploaded assets such as image or video. You can also customize the quantity of each assets to be distributed to your customers."
              colorFrom="rgba(255,255,255,0.7)"
              colorTo="rgba(255,255,255,0.7)"
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
              title="Layered Assets Mode"
              description="Ticket will be created with your uploaded assets and randomly generate by its rarity. You can customize the rarity of each asset or layer."
              colorFrom="rgba(255,255,255,0.7)"
              colorTo="rgba(255,255,255,0.7)"
            />
          </div>
        </Stack>
      </Stack>
    </Container>
  )
}

export default GenerateModeSelector
