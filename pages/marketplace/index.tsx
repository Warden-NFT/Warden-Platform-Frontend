import { Container } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import MarketEventList from "../../components/market/event/MarketEventList"
import EventSearch from "../../components/market/search/OrganizerEventSearch"
import BannerLayout from "../../components/UI/layout/BannerLayout"

import {
  EventListMode,
  EVENT_LIST_MODE
} from "../../interfaces/event/eventSearch.interface"

function MarketplacePage() {
  return (
    <BannerLayout
      backgroundImage="/images/background/market-home-background.png"
      title="Events"
      subtitle="Create and manage NFT-ticket based events"
      enableActionButton
      actionName="Sell Ticket"
    >
      <Container>
        <EventSearch />
        <Box sx={{ height: 24 }} />
        <MarketEventList mode={EVENT_LIST_MODE.FEATURED as EventListMode} />
        <Box sx={{ height: 24 }} />
        <MarketEventList mode={EVENT_LIST_MODE.LATEST as EventListMode} />
      </Container>
    </BannerLayout>
  )
}

export default MarketplacePage
