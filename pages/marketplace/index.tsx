import { Container } from "@mui/material"
import { Box } from "@mui/system"
import Head from "next/head"
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
    <>
      <Head>
        <title>Warden Marketplace</title>
      </Head>
      <BannerLayout
        backgroundImage="/images/background/market-home-background.png"
        title="Events"
        subtitle="Create and manage NFT-ticket based events"
      >
        <Container>
          <EventSearch />
          <Box sx={{ height: 24 }} />
          <MarketEventList mode={EVENT_LIST_MODE.FEATURED as EventListMode} />
          <Box sx={{ height: 24 }} />
          <MarketEventList mode={EVENT_LIST_MODE.LATEST as EventListMode} />
        </Container>
      </BannerLayout>
    </>
  )
}

export default MarketplacePage
