import { Container } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import FeaturedEvents from "../../components/market/FeaturedEvents"
import LatestEvents from "../../components/market/LatestEvents"
import EventSearch from "../../components/market/search/MarketEventSearch"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import MarketContextProvider from "../../contexts/market/MarketContext"

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
          <FeaturedEvents />
          <Box sx={{ height: 24 }} />
          <LatestEvents />
        </Container>
      </BannerLayout>
    </MarketContextProvider>
  )
}

export default MarketplacePage
