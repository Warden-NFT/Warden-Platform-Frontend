import { Box, IconButton, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import EventInfoBanner from "../../../../../components/market/event/EventInfoBanner"
import BannerLayout from "../../../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../../../contexts/market/MarketContext"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { GetServerSideProps, NextPage } from "next"
import { EventTicket } from "../../../../../dtos/ticket/ticket.dto"
import TicketCard from "../../../../../components/market/ticket/TicketCard"
import axios, { AxiosError } from "axios"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventId = params?.eventId
  const ticketId = params?.ticketId

  // todo: add event org and fetch
  try {
    const res = await axios.get<EventTicket>(
      `${process.env.NEXT_PUBLIC_WARDEN_API_URL}/ticket/single`,
      {
        params: {
          eventId,
          ticketId
        }
      }
    )

    return {
      props: {
        ticket: res.data
      }
    }
  } catch (e) {
    const err = e as AxiosError
    return {
      notFound: true
    }
  }
}

interface PageProps {
  ticket: EventTicket | undefined
}

const MarketTicket: NextPage<PageProps> = ({ ticket }) => {
  const router = useRouter()
  const { eventId, ticketId } = router.query
  const { marketTickets, getMarketTickets } = useContext(MarketContext)

  return (
    <div>
      <BannerLayout
        backgroundImage={marketTickets?.event.image as string}
        title=""
        subtitle=""
        actionName=""
      >
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
        <Stack direction="row" sx={{ alignItems: "center", marginY: 3 }}>
          <IconButton
            aria-label="back"
            onClick={() => router.back()}
            sx={{ marginRight: 1 }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography>Back to all tickets</Typography>
        </Stack>
        <Box sx={{ border: 2, borderRadius: 2, padding: 4 }}>
          <TicketCard
            ticketId={ticket?._id ?? ""}
            image={ticket?.ticketMetadata[0].image as string}
            name={ticket?.name ?? ""}
            ticketTypeLabel={ticket?.ticketType ?? ""}
            price={(ticket?.price?.amount ?? "").toString()}
          />
        </Box>
      </BannerLayout>
    </div>
  )
}

export default MarketTicket
