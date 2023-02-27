import { CalendarToday, LocationOnOutlined } from "@mui/icons-material"
import { Container, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import EventInfoBanner from "../../../../components/market/event/EventInfoBanner"
import TicketCardList from "../../../../components/market/ticket/TicketCardList"
import ContainedButton from "../../../../components/UI/button/ContainedButton"
import ContainerCard from "../../../../components/UI/card/ContainerCard"
import { ImageWithFallback } from "../../../../components/UI/image/ImageWithFallback"
import BannerLayout from "../../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../../contexts/market/MarketContext"

function MarketEvent() {
  const router = useRouter()
  const { organizerId, eventId } = router.query
  const { marketTickets, getMarketTickets } = useContext(MarketContext)

  const onClickBrowseEvent = () => {
    if (!organizerId) return
    router.push(`/marketplace/${organizerId}`)
  }

  useEffect(() => {
    if (!router.query) return
    if (!eventId) return
    getMarketTickets(eventId as string)
  }, [router.query])

  return (
    <BannerLayout
      backgroundImage={marketTickets?.event.image as string}
      title=""
      subtitle=""
      enableActionButton={false}
    >
      <Container>
        <EventInfoBanner
          imgFallbackSrc={marketTickets?.organizerInfo.profileImage as string}
          organizationName={marketTickets?.organizerInfo.organizationName ?? ""}
          organizerId={marketTickets?.organizerInfo._id}
          marketTicketName={marketTickets?.event.name ?? ""}
          eventStartDate={marketTickets?.event.startDate ?? new Date(0)}
          eventName={marketTickets?.event.name ?? ""}
          location={
            marketTickets?.event.location?.structured_formatting.main_text ||
            marketTickets?.event.online_url
          }
        />
        <Box sx={{ height: 24 }} />
        <TicketCardList
          tickets={marketTickets?.ticketCollection.tickets.vip}
          ticketType="VIP Tickets"
          isHorizontal
        />
        <TicketCardList
          tickets={marketTickets?.ticketCollection.tickets.general}
          ticketType="General Admission Tickets"
        />
      </Container>
    </BannerLayout>
  )
}

export default MarketEvent
