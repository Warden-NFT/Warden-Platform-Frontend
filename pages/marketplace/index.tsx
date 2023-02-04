import { Container } from "@mui/material"
import React from "react"
import Ticket from "../../components/UI/ticket/Ticket"

function MarketplacePage() {
  return (
    <Container>
      <Ticket
        assetSrc="/images/background/ticket-cover-test.jpg"
        assetName="Test1"
        eventName="Among Us Party"
        eventOrganizer="Warden"
        ticketType="GENERAL"
        date={new Date()}
        seat="A 14"
        location="MIRA HQ"
        codeDisplayMode="QR"
        codeValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
      <Ticket
        assetSrc="/images/background/ticket-cover-test.jpg"
        assetName="Test1"
        eventName="Among Us Party"
        eventOrganizer="Warden"
        ticketType="GENERAL"
        date={new Date()}
        seat="A 14"
        location="MIRA HQ"
        codeDisplayMode="BAR"
        codeValue="12312847199879"
      />
      <Ticket
        assetSrc="/images/background/ticket-cover-test.jpg"
        assetName="Test2"
        eventName="Among Us Party"
        eventOrganizer="Warden"
        ticketType="GENERAL"
        date={new Date()}
        seat="A 14"
        location="MIRA HQ"
        isDisabled
        codeDisplayMode="BAR"
        codeValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
    </Container>
  )
}

export default MarketplacePage
