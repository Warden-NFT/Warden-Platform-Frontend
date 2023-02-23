import { Container } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import MarketEventList from "../../components/market/MarketEventList"
import EventSearch from "../../components/market/search/MarketEventSearch"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import MarketContextProvider from "../../contexts/market/MarketContext"
import {
  EventListMode,
  EVENT_LIST_MODE
} from "../../interfaces/event/eventSearch.interface"

function MarketplacePage() {
  return (
    <MarketContextProvider>
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
    </MarketContextProvider>
  )
}

export default MarketplacePage
