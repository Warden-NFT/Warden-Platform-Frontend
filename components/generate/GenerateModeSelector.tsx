import { Container, Stack } from "@mui/material"
import React from "react"
import TextDescriptionCard from "../UI/card/TextDescriptionCard"
import { useRouter } from "next/router"

function GenerateModeSelector() {
  const router = useRouter()

  return (
    <Container>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" justifyContent="center" gap={4}>
          <div
            onClick={() => {
              router.push({
                pathname: "ticket/asset"
              })
            }}
          >
            <TextDescriptionCard
              title="Complete Assets Mode"
              description="Ticket will be created with your uploaded assets such as image. You can also customize the quantity of each assets to match the amount of attendees."
            />
          </div>

          <div
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
          </div>
        </Stack>
      </Stack>
    </Container>
  )
}

export default GenerateModeSelector
