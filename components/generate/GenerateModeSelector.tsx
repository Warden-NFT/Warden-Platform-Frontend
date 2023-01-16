import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import ImageLabelCard from '../UI/card/ImageLabelCard'
import { TicketTypes } from '../../interfaces/ticket/ticket.interface'
import { useRouter } from 'next/router'

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
              router.push('/create/ticket/asset', {
                query: {
                  ticketType: selectedType
                }
              })
            }}
          >
            <ImageLabelCard
              imageSrc="/images/generate/event-scheduling.jpg"
              imageAlt="Create event completely"
              title="Create with Complete Assets"
              description="Ticket will be created with your uploaded assets such as image or video. You can also customize the quantity of each assets to be distributed to your customers."
              containerStyles={{ backgroundColor: 'white', width: '100%' }}
            />
          </div>

          <div
            onClick={() => {
              // FIXME: update route
              router.push('/generate/layer', {
                query: {
                  ticketType: selectedType
                }
              })
            }}
          >
            <ImageLabelCard
              imageSrc="/images/generate/complete-asset-card.avif"
              imageAlt="Create event completely"
              title="Create with Layered Assets"
              description="Ticket will be created with your uploaded assets and randomly generate by its rarity. You can customize the rarity of each asset or layer."
              containerStyles={{ backgroundColor: 'white', width: '100%' }}
            />
          </div>
        </Stack>
      </Stack>
    </Container>
  )
}

export default GenerateModeSelector
