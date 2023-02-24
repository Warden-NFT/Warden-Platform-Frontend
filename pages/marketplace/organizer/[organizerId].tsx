import { Container } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import OrganizerEventList from "../../../components/market/organizer/OrganizerEventList"
import OrganizerEventSearch from "../../../components/market/organizer/OrganizerEventSearch"
import OrganizerInfoCard from "../../../components/market/organizer/OrganizerInfoCard"
import BannerLayout from "../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../contexts/market/MarketContext"

function OrganizerEvents() {
  const router = useRouter()
  const { organizerId } = router.query
  const { filteredMarketEvents, getMarketEvents } = useContext(MarketContext)

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <OrganizerInfoCard marketEvents={filteredMarketEvents} />
          <OrganizerEventSearch />
        </Box>
        <Box sx={{ height: 40 }} />
        <OrganizerEventList
          events={filteredMarketEvents?.events}
          eventTicketPreviews={filteredMarketEvents?.eventTicketPreviews}
        />
      </Container>
    </BannerLayout>
  )
}

export default OrganizerEvents
