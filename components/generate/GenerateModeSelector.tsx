import { Container, Stack } from "@mui/material"
import React from "react"
import ImageLabelCard from "../UI/card/ImageLabelCard"
import { useRouter } from "next/router"
import { orange, pink } from "@mui/material/colors"

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
            <ImageLabelCard
              title="Complete Assets Mode"
              description="Ticket will be created with your uploaded assets such as image or video. You can also customize the quantity of each assets to be distributed to your customers."
              colorFrom={orange[300]}
              colorTo={orange[700]}
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
              title="Layered Assets Mode"
              description="Ticket will be created with your uploaded assets and randomly generate by its rarity. You can customize the rarity of each asset or layer."
              colorFrom={pink[300]}
              colorTo={pink[700]}
            />
          </div>
        </Stack>
      </Stack>
    </Container>
  )
}

export default GenerateModeSelector
