import { Container } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import OrganizerEventList from "../../../components/market/event/OrganizerEventList"
import OrganizerInfoCard from "../../../components/market/organizer/OrganizerInfoCard"
import BannerLayout from "../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../contexts/market/MarketContext"

function OrganizerEvents() {
  const router = useRouter()
  const { organizerId } = router.query
  const { marketEvents, getMarketEvents } = useContext(MarketContext)

  useEffect(() => {
    if (!organizerId) return
    getMarketEvents(organizerId as string)
  }, [router.query])

  return (
    <BannerLayout
      backgroundImage="/images/background/market-organizer-background.png"
      title=""
      subtitle=""
      enableActionButton={false}
    >
      <Container sx={{ mt: 10 }}>
        <OrganizerInfoCard marketEvents={marketEvents} />
        <Box sx={{ height: 40 }} />
        <OrganizerEventList
          events={marketEvents?.events}
          eventTicketPreviews={marketEvents?.eventTicketPreviews}
        />
      </Container>
    </BannerLayout>
  )
}

export default OrganizerEvents
