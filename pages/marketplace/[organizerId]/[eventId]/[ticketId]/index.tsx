import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import EventInfoBanner from "../../../../../components/market/event/EventInfoBanner"
import BannerLayout from "../../../../../components/UI/layout/BannerLayout"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { GetServerSideProps } from "next"
import { EventTicket } from "../../../../../dtos/ticket/ticket.dto"
import TicketCard from "../../../../../components/market/ticket/TicketCard"
import axios, { AxiosError } from "axios"
import { Event } from "../../../../../interfaces/event/event.interface"
import { EventOrganizerUser } from "../../../../../interfaces/auth/user.interface"
import { MarketTickets } from "../../../../../interfaces/market/marketEvent.interface"
import { blue, grey } from "@mui/material/colors"
import moment from "moment"
import Head from "next/head"
import TicketPurchaseModal from "../../../../../components/market/ticket/TicketPurchaseModal"
import { useAccount } from "wagmi"
import { useSmartContract } from "../../../../../hooks/useSmartContract"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventId = params?.eventId
  const ticketId = params?.ticketId

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
  const { address } = useAccount()
  const router = useRouter()
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [isOwnedTicket, setIsOwnedTicket] = useState(false)
  const { abi, bytecode, web3 } = useSmartContract()

  function isSold(address: `0x${string}` | undefined) {
    return ticket.ownerHistory.length > 1 && ticket.ownerHistory[-1] !== address
  }

  function isResaleTicket() {
    return (
      ticket.ownerHistory.length > 1 &&
      ticket.ownerHistory[-1] !== ticket.ownerHistory[0]
    )
  }

  function getEventLocationUrl() {
    if (event.online_url) {
      return event.online_url
    } else if (event.location?.place_id) {
      return `https://www.google.com/maps/place/?q=place_id:${event.location.place_id}`
    }

    return "/marketplace"
  }

  useEffect(() => {
    if (!web3 || !abi) return
    const contract = new web3.eth.Contract(abi.abi)
    contract.options.address = event.smartContractAddress
    contract.methods
      .getTicket(0)
      .call()
      .then((result: any, error: any) => {
        console.log({ error, result })
        // TODO: check owner status using the actual smartContractTicketId
        // setIsOwnedTicket(result.owner === address)
      })
  }, [web3, abi, address])

  return (
    <>
      <Head>
        <title>Purchase a Ticket</title>
      </Head>
      <TicketPurchaseModal
        event={event}
        ticket={ticket}
        open={showPurchaseModal}
        setOpen={setShowPurchaseModal}
      />
      <Container>
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
              event.location?.structured_formatting.main_text ||
              event.online_url
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
          <Box
            sx={{
              border: 2,
              borderRadius: 2,
              padding: 2,
              backgroundColor: "white"
            }}
          >
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Box sx={{ position: "relative" }}>
                <TicketCard
                  ticketId={ticket?._id ?? ""}
                  image={ticket?.ticketMetadata[0].image as string}
                  name={ticket?.name ?? ""}
                  ticketTypeLabel={ticket?.ticketType ?? ""}
                  price={(ticket?.price?.amount ?? "").toString()}
                  sx={
                    isSold(address)
                      ? { filter: "saturate(0.5)", opacity: 0.7 }
                      : undefined
                  }
                />
                {isSold(address) && (
                  <Typography
                    variant="h3"
                    fontWeight="600"
                    color={grey[100]}
                    sx={{ position: "absolute", top: "80px", left: "40px" }}
                  >
                    SOLD
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "100%", marginLeft: 4 }}>
                {isResaleTicket() && (
                  <Alert
                    severity="info"
                    sx={{
                      backgroundColor: blue[500],
                      color: "white",
                      marginBottom: 2
                    }}
                  >
                    This is a resale ticket by #addressId
                  </Alert>
                )}
                <Stack spacing={2}>
                  <Typography variant="h6" component="h1">
                    Ticket Details
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color={grey[500]}>Ticket Name</Typography>
                    <Typography>{ticket.name}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color={grey[500]}>Description</Typography>
                    <Typography>{ticket.description}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color={grey[500]}>Type</Typography>
                    <Typography>{ticket.ticketType}</Typography>
                  </Stack>
                  <Typography variant="h6" component="h1">
                    Event Details
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color={grey[500]}>Event Date</Typography>
                    <Typography>
                      {moment(event.startDate).format("lll")}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color={grey[500]}>Door Time</Typography>
                    <Typography>
                      {moment(event.doorTime).format("lll")}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color={grey[500]}>Location</Typography>
                    <a
                      target="_blank"
                      href={getEventLocationUrl()}
                      rel="noopener noreferrer"
                    >
                      <Typography>
                        {event.location?.structured_formatting.main_text ||
                          event.online_url}
                      </Typography>
                    </a>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              marginY: 4,
              border: 2,
              borderRadius: 2,
              padding: 2,
              backgroundColor: "white"
            }}
          >
            {isOwnedTicket ? (
              <Typography fontWeight="700">
                You are the owner of this ticket
              </Typography>
            ) : (
              <>
                <Stack alignItems="start">
                  <Typography>Want to claim this ticket? Buy now</Typography>
                  <Typography fontWeight="700">
                    {ticket.price.amount} {ticket.price.currency}
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowPurchaseModal(true)
                  }}
                >
                  <Typography>Purchase Ticket</Typography>
                </Button>
              </>
            )}
          </Stack>
        </BannerLayout>
      </Container>
    </>
  )
}

export default MarketTicket
