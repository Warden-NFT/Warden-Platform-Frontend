import { Box, IconButton, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import EventInfoBanner from "../../../../../components/market/event/EventInfoBanner"
import BannerLayout from "../../../../../components/UI/layout/BannerLayout"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { GetServerSideProps, NextPage } from "next"
import { EventTicket } from "../../../../../dtos/ticket/ticket.dto"
import TicketCard from "../../../../../components/market/ticket/TicketCard"
import axios, { AxiosError } from "axios"
import { Event } from "../../../../../interfaces/event/event.interface"
import { EventOrganizerUser } from "../../../../../interfaces/auth/user.interface"
import { MarketTickets } from "../../../../../interfaces/market/marketEvent.interface"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventId = params?.eventId
  const ticketId = params?.ticketId

  // todo: add event org and fetch
  try {
    const marketTicketRes = await axios.get<MarketTickets>(
      `${process.env.NEXT_PUBLIC_WARDEN_API_URL}/market/tickets`,
      {
        params: {
          eventId
        }
      }
    )

    const { organizerInfo, event, ticketCollection } = marketTicketRes.data
    const tickets = [
      ...(ticketCollection.tickets.general ?? []),
      ...(ticketCollection.tickets.vip ?? [])
    ]
    console.log({ tickets })
    const ticket = tickets.find((ticket) => ticket._id === ticketId)
    if (!ticket) {
      throw Error("No ticket found")
    }

    return {
      props: {
        ticket: ticket,
        event: event,
        organizer: organizerInfo
      }
    }
  } catch (e) {
    const err = e as AxiosError
    console.log(err)
    return {
      notFound: true
    }
  }
}

interface PageProps {
  ticket: EventTicket
  event: Event
  organizer: EventOrganizerUser
}

const MarketTicket = ({ ticket, event, organizer }: PageProps) => {
  const router = useRouter()

  return (
    <div>
      <BannerLayout
        backgroundImage={event.image as string}
        title=""
        subtitle=""
        actionName=""
      >
        <EventInfoBanner
          imgFallbackSrc={organizer.profileImage as string}
          organizationName={organizer.organizationName ?? ""}
          organizerId={organizer._id}
          marketTicketName={event.name}
          eventStartDate={event.startDate ?? new Date(0)}
          eventName={event.name}
          location={
            event.location?.structured_formatting.main_text || event.online_url
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
