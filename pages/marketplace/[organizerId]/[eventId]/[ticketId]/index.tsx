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
import React, { useContext, useEffect, useState } from "react"
import EventInfoBanner from "../../../../../components/market/event/EventInfoBanner"
import BannerLayout from "../../../../../components/UI/layout/BannerLayout"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { GetServerSideProps } from "next"
import { EventTicket } from "../../../../../dtos/ticket/ticket.dto"
import TicketCard from "../../../../../components/market/ticket/TicketCard"
import axios from "axios"
import { Event } from "../../../../../interfaces/event/event.interface"
import { EventOrganizerUser } from "../../../../../interfaces/auth/user.interface"
import { MarketTickets } from "../../../../../interfaces/market/marketEvent.interface"
import { blue, green, grey, purple } from "@mui/material/colors"
import moment from "moment"
import Head from "next/head"
import TicketPurchaseModal from "../../../../../components/market/ticket/TicketPurchaseModal"
import { useAccount } from "wagmi"
import { useSmartContract } from "../../../../../hooks/useSmartContract"
import Web3 from "web3"
import { ABIItem } from "../../../../../interfaces/smartContract/smartContract.interface"
import { UserContext } from "../../../../../contexts/user/UserContext"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventId = params?.eventId
  const ticketId = params?.ticketId

  try {
    const marketTicketRes = await axios.get<MarketTickets>(
      `${process.env.NEXT_PUBLIC_WARDEN_API_URL}market/tickets`,
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
  const [isResaleTicket, setIsResaleTicket] = useState(false)
  const [isSold, setIsSold] = useState(false)
  const { abi, web3 } = useSmartContract()
  const { user } = useContext(UserContext)

  function checkResaleTicket(forSale: boolean) {
    return (
      // This ticket has been sold before
      ticket.ownerHistory.length > 1 &&
      ticket.ownerHistory.at(-1) !== ticket.ownerHistory.at(0) &&
      // The user is not the ticket's most recent owner
      ticket.ownerHistory.at(-1) !== address &&
      // Ticket is marked as for sale in the smart contract
      forSale
    )
  }

  const checkTicketOwnership = (
    web3: Web3,
    abi: { abi: ABIItem[] },
    address: string,
    force?: boolean
  ) => {
    // If the ticket hasn't been bought yet (no smartContractTicketId), no need to check for ownership
    const smartContractTicketId = ticket.smartContractTicketId
    if (!force && smartContractTicketId === undefined) return

    const contract = new web3.eth.Contract(abi.abi)
    contract.options.address = event.smartContractAddress
    contract.methods
      .getTicket(smartContractTicketId)
      .call()
      .then((result: any) => {
        setIsOwnedTicket(result.owner === address)
        setIsResaleTicket(checkResaleTicket(result.forSale))
      })
  }

  function getEventLocationUrl() {
    if (event.online_url) {
      return event.online_url
    } else if (event.location?.place_id) {
      return `https://www.google.com/maps/place/?q=place_id:${event.location.place_id}`
    }

    return "/marketplace"
  }

  // Checks ticket ownership
  useEffect(() => {
    // If the dependencies aren't ready, don't do anything
    if (!web3 || !abi || !event.smartContractAddress || !address) return
    checkTicketOwnership(web3, abi, address)
    setIsSold(
      ticket.ownerHistory.length > 1 && ticket.ownerHistory.at(-1) !== address
    )
  }, [web3, abi, address])

  return (
    <>
      <Head>
        <title>Purchase a Ticket</title>
      </Head>
      {web3 && abi && address && (
        <TicketPurchaseModal
          event={event}
          ticket={ticket}
          open={showPurchaseModal}
          setOpen={setShowPurchaseModal}
        />
      )}
      <Container>
        <BannerLayout
          backgroundImage={event.image as string}
          title=""
          subtitle=""
          actionName=""
        >
          <EventInfoBanner
            event={event}
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
                    isSold
                      ? { filter: "saturate(0.5)", opacity: 0.7 }
                      : undefined
                  }
                />
                {isSold && (
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
                {isResaleTicket && (
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
          {isOwnedTicket && (
            <Alert
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => router.push(`/me/${ticket._id}`)}
                >
                  View Ticket
                </Button>
              }
              sx={{ border: `2px solid ${green[100]}`, mt: 2 }}
            >
              You are the owner of this ticket
            </Alert>
          )}
          {!isOwnedTicket && !isSold && (
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
              <Stack alignItems="start">
                <Typography>Want to claim this ticket? Buy now</Typography>
                <Typography fontWeight="700">
                  {ticket.price.amount} {ticket.price.currency}
                </Typography>
              </Stack>
              {user ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowPurchaseModal(true)
                  }}
                  sx={{
                    background: purple[400],
                    "&:hover": {
                      background: purple[500]
                    }
                  }}
                >
                  <Typography fontWeight={600}>Purchase Ticket</Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push({
                      pathname: "/auth/login",
                      query: {
                        referrer: window.location.pathname
                      }
                    })
                  }}
                >
                  <Typography>Log in to purchase</Typography>
                </Button>
              )}
            </Stack>
          )}
        </BannerLayout>
      </Container>
    </>
  )
}

export default MarketTicket
