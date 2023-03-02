import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import EventInfoBanner from "../../components/market/event/EventInfoBanner"
import TicketCard from "../../components/market/ticket/TicketCard"
import MyTicketDetails from "../../components/ticket/myTickets/MyTicketDetails"
import ContainerCard from "../../components/UI/card/ContainerCard"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../contexts/market/MarketContext"
import { TicketTypeLabel } from "../../interfaces/event/event.interface"

function MyTicketView() {
  const router = useRouter()
  const { ticketId } = router.query
  const { ticketListing, getTicketListingFromTicketId } =
    useContext(MarketContext)

  useEffect(() => {
    if (!ticketId) return
    getTicketListingFromTicketId(ticketId as string)
  }, [router.query])

  return (
    <BannerLayout
      backgroundImage="/images/background/market-organizer-background.png"
      title=""
      subtitle=""
      enableActionButton={false}
    >
      <Container>
        <EventInfoBanner
          imgFallbackSrc={ticketListing?.organizerInfo.profileImage as string}
          organizationName={ticketListing?.organizerInfo.organizationName ?? ""}
          organizerId={ticketListing?.organizerInfo._id}
          marketTicketName={ticketListing?.event.name ?? ""}
          eventStartDate={ticketListing?.event.startDate ?? new Date(0)}
          eventName={ticketListing?.event.name ?? ""}
          location={
            ticketListing?.event.location?.structured_formatting.main_text ||
            ticketListing?.event.online_url
          }
          showBrowseEvents
        />
        <Box sx={{ my: 4 }} />
        <Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box>
              <TicketCard
                ticketId={ticketListing?.ticket._id}
                name={ticketListing?.ticket.name ?? ""}
                image={ticketListing?.ticket.ticketMetadata[0].image as string}
                ticketTypeLabel={
                  TicketTypeLabel[ticketListing?.ticket.ticketType ?? "GENERAL"]
                }
                price={ticketListing?.ticket.price?.amount.toString() ?? ""}
                enableRedirect
                isMyTicket
              />
              <ContainerCard
                sx={{
                  width: "184px",
                  height: 160,
                  background: "#fff",
                  mt: 4,
                  borderRadius: 1
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Event Admission
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  The QR Code for the event entrance will appear here, 10
                  minutes before the door time.
                </Typography>
              </ContainerCard>
            </Box>
            <MyTicketDetails ticketListing={ticketListing} />
          </Box>
        </Box>
      </Container>
    </BannerLayout>
  )
}

export default MyTicketView
