import { CalendarToday, LocationOnOutlined } from "@mui/icons-material"
import { Container, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
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
        <ContainerCard sx={{ mt: 12 }}>
          <Box
            sx={{
              marginTop: -7,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 2
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
              <ImageWithFallback
                src={marketTickets?.organizerInfo.profileImage as string}
                width={100}
                height={100}
                alt={marketTickets?.organizerInfo.organizationName ?? ""}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid #000"
                }}
              />
              <Stack>
                <Typography>Event Organizer</Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 600 }}
                >
                  {marketTickets?.organizerInfo.organizationName}
                </Typography>
              </Stack>
            </Box>
            <ContainedButton
              label="Browse Events"
              variant="contained"
              onClick={onClickBrowseEvent}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "#F4F4F0",
              mx: -2,
              mt: 2,
              mb: -2,
              p: 2,
              borderTop: "1px solid #000"
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {marketTickets?.event.name}
              </Typography>
              <ContainedButton label="Sell Tickets" variant="outlined" />
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <CalendarToday sx={{ fontSize: 18 }} />
              <Typography>
                {moment(marketTickets?.event.startDate).format("lll")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <LocationOnOutlined sx={{ fontSize: 18 }} />
              <Typography>
                {marketTickets?.event.location?.structured_formatting
                  .main_text || marketTickets?.event.online_url}
              </Typography>
            </Box>
          </Box>
        </ContainerCard>
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
