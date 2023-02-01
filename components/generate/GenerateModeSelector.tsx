import { Container, Stack, Typography } from "@mui/material"
import React from "react"
import ImageLabelCard from "../UI/card/ImageLabelCard"
import { TicketTypes } from "../../interfaces/ticket/ticket.interface"
import { useRouter } from "next/router"
import { cyan, orange } from "@mui/material/colors"
import Image from "next/image"

interface Props {
  selectedType: TicketTypes | null
}

function GenerateModeSelector({ selectedType }: Props) {
  const router = useRouter()

  return (
    <Container>
      <Stack direction="column" spacing={2}>
        <Typography variant="body1"></Typography>
        <Stack direction="column" gap={4}>
          <div
            onClick={() => {
              router.push({
                pathname: "ticket/asset",
                query: {
                  ticketType: selectedType
                }
              })
            }}
          >
            <ImageLabelCard
              LeftMotionedComponent={() => (
                <Image
                  alt="Upload Assets and Mint"
                  src="/images/generate/picture-placeholder.png"
                  width="160"
                  height="160"
                  style={{ objectFit: "contain" }}
                  draggable={false}
                />
              )}
              title="Create with Complete Assets"
              description="Ticket will be created with your uploaded assets such as image or video. You can also customize the quantity of each assets to be distributed to your customers."
              containerStyles={{ backgroundColor: orange[400], width: "100%" }}
            />
          </div>

          <div
            onClick={() => {
              // FIXME: update route
              router.push("/ticket/layer", {
                query: {
                  ticketType: selectedType
                }
              })
            }}
          >
            <ImageLabelCard
              LeftMotionedComponent={() => (
                <Image
                  alt="Upload Assets and Mint"
                  src="/images/generate/dimensions.png"
                  width="140"
                  height="140"
                  draggable={false}
                />
              )}
              title="Create with Layered Assets"
              description="Ticket will be created with your uploaded assets and randomly generate by its rarity. You can customize the rarity of each asset or layer."
              containerStyles={{ backgroundColor: cyan[500], width: "100%" }}
            />
          </div>
        </Stack>
      </Stack>
    </Container>
  )
}

export default GenerateModeSelector
