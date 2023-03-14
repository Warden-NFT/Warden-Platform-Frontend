import { Alert, Container } from "@mui/material"
import { Box } from "@mui/system"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import EventInfoBanner from "../../../../components/market/event/EventInfoBanner"
import TicketCardList from "../../../../components/market/ticket/TicketCardList"
import BannerLayout from "../../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../../contexts/market/MarketContext"

function MarketEvent() {
  const router = useRouter()
  const { eventId } = router.query
  const { marketTickets, getMarketTickets } = useContext(MarketContext)

  useEffect(() => {
    if (!router.query) return
    if (!eventId) return
    getMarketTickets(eventId as string)
  }, [router.query])

  return (
    <>
      <Head>
        <title>{marketTickets?.event.name}</title>
      </Head>
      <BannerLayout
        backgroundImage={marketTickets?.event.image as string}
        title=""
        subtitle=""
        enableActionButton={false}
      >
        <Container>
          {marketTickets && (
            <EventInfoBanner
              event={marketTickets?.event}
              imgFallbackSrc={
                marketTickets?.organizerInfo.profileImage as string
              }
              organizationName={
                marketTickets?.organizerInfo.organizationName ?? ""
              }
              organizerId={marketTickets?.organizerInfo._id}
              marketTicketName={marketTickets?.event.name ?? ""}
              eventStartDate={marketTickets?.event.startDate ?? new Date(0)}
              eventName={marketTickets?.event.name ?? ""}
              location={
                marketTickets?.event.location?.structured_formatting
                  .main_text || marketTickets?.event.online_url
              }
              showBrowseEvents
              enabledResale={marketTickets.ticketCollection.enableResale}
            />
          )}
          <Box sx={{ height: 24 }} />
          {!marketTickets?.ticketCollection && (
            <Alert severity="warning">
              Tickets unavailable at the moment. Please check back later.
            </Alert>
          )}
          <TicketCardList
            tickets={marketTickets?.ticketCollection?.tickets.vip ?? []}
            ticketType="VIP Tickets"
            isHorizontal
          />
          <TicketCardList
            tickets={marketTickets?.ticketCollection?.tickets.general ?? []}
            ticketType="General Admission Tickets"
          />
        </Container>
      </BannerLayout>
    </>
  )
}

export default MarketEvent
