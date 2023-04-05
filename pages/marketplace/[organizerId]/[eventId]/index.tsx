import { Alert, Container, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
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

  const ticketQuotaText = () => {
    let text = `The event organizer has set the limit of ${marketTickets?.ticketCollection?.ticketQuota?.general} general ticket`
    if ((marketTickets?.ticketCollection?.ticketQuota?.general ?? 0) > 1)
      text += "s "
    if ((marketTickets?.ticketCollection?.ticketQuota?.vip ?? 0) > 0)
      text += `and ${
        marketTickets?.ticketCollection?.ticketQuota?.vip ?? 0
      } VIP ticket`
    if (marketTickets?.ticketCollection?.ticketQuota?.vip ?? 0 ?? 0 > 1)
      text += "s "
    text += "per user."
    return text
  }

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
              enabledResale={
                marketTickets?.ticketCollection?.enableResale ?? false
              }
            />
          )}
          <Box sx={{ height: 24 }} />
          {marketTickets && !marketTickets?.ticketCollection && (
            <Alert severity="warning">
              Tickets unavailable at the moment. Please check back later.
            </Alert>
          )}
          {marketTickets && (
            <Alert severity="info" sx={{ border: `2px solid ${blue[100]}` }}>
              <Typography>{ticketQuotaText()}</Typography>
            </Alert>
          )}
          <TicketCardList
            tickets={
              marketTickets?.ticketCollection?.tickets.vip?.filter(
                (_ticket) =>
                  _ticket.ownerHistory.at(-1) ===
                    marketTickets.event.ownerAddress ||
                  _ticket.ownerHistory.length === 1
              ) ?? []
            }
            ticketType="VIP Tickets ✨"
            isVip
          />
          <TicketCardList
            tickets={
              marketTickets?.ticketCollection?.tickets.general?.filter(
                (_ticket) =>
                  _ticket.ownerHistory.at(-1) ===
                    marketTickets.event.ownerAddress ||
                  _ticket.ownerHistory.length === 1
              ) ?? []
            }
            ticketType="General Admission Tickets"
          />
        </Container>
      </BannerLayout>
    </>
  )
}

export default MarketEvent
