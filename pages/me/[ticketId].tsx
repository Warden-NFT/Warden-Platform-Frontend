import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Stack,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import MyTicketDetails from "../../components/ticket/myTickets/MyTicketDetails"
import Ticket from "../../components/ticket/Ticket"
import { MarketContext } from "../../contexts/market/MarketContext"
import Link from "next/link"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
import { motion } from "framer-motion"
import { TicketQRUtilizeValue } from "../../interfaces/ticket/ticket.interface"
import { useAccount } from "wagmi"
import { UserContext } from "../../contexts/user/UserContext"
import Head from "next/head"
import { withCustomerGuard } from "../../guards/withAuth"
import { checkResaleTicket } from "../../utils/ownership"

const TIME_LIMIT_SECONDS = 15

function MyTicketView() {
  const [seconds, setSeconds] = useState(TIME_LIMIT_SECONDS)

  const router = useRouter()
  const { ticketId } = router.query
  const { address } = useAccount()
  const { user } = useContext(UserContext)
  const [isResaleTicket, setIsResaleTicket] = useState(false)
  const { ticketListing, getTicketListingFromTicketId } =
    useContext(MarketContext)

  useEffect(() => {
    resetQrCode()
  }, [user, address, ticketId])

  useEffect(() => {
    const isResale = checkResaleTicket(ticketListing?.ticket, address)
    setIsResaleTicket(isResale)
  }, [address, ticketListing])

  useEffect(() => {
    if (!ticketId) return
    getTicketListingFromTicketId(ticketId as string)
  }, [router.query])

  useEffect(() => {
    if (ticketListing?.ticket?.hasUsed) return

    let interval: NodeJS.Timer | null = null
    if (seconds === 0) {
      setSeconds(TIME_LIMIT_SECONDS)
      resetQrCode()
    } else {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [seconds])

  const [qrCodeValue, setQrCodeValue] = useState<TicketQRUtilizeValue>()

  function resetQrCode() {
    if (!user || !address || !ticketId || isResaleTicket) return

    setQrCodeValue({
      userId: user?._id ?? "",
      eventId: ticketListing?.event._id ?? "",
      walletAddress: address,
      ticketId: ticketId as string,
      generateSince: new Date(),
      isVip: ticketListing?.ticket?.ticketType === "VIP"
    })
  }

  const getTicketResaleDisabledText = (
    hasUsed: boolean,
    isResaleTicket: boolean
  ) => {
    if (hasUsed && !isResaleTicket) {
      return "This ticket has been used. It cannot be resold."
    } else if (!hasUsed && isResaleTicket) {
      return "This ticket is already listed for sale."
    } else {
      return "This ticket cannot be resold."
    }
  }

  return (
    <Container sx={{ mb: 6 }}>
      <Head>
        <title>Utilize Ticket</title>
      </Head>
      <Stack sx={{ alignItems: "center", mt: 4 }}>
        <Typography variant="h4" component="h1">
          Scan QR Code to Use
        </Typography>
        {qrCodeValue && (
          <Box sx={{ position: "relative" }}>
            <Ticket
              hasUsed={ticketListing?.ticket.hasUsed}
              assetSrc={ticketListing?.ticket.ticketMetadata[0].image as string}
              assetName={ticketListing?.ticket.name ?? ""}
              eventName={ticketListing?.event.name ?? ""}
              eventOrganizer={
                ticketListing?.organizerInfo.organizationName ?? ""
              }
              ticketType={ticketListing?.ticket.ticketType ?? "GENERAL"}
              date={ticketListing?.event.startDate ?? new Date(0)}
              location={
                (ticketListing?.event.location?.structured_formatting
                  .main_text || ticketListing?.event.online_url) as string
              }
              codeDisplayMode="QR"
              codeValue={JSON.stringify(qrCodeValue)}
              cardSx={{ boxShadow: "5px 10px 10px #C397FE", height: "600px" }}
              isDisabled={
                address === ticketListing?.event?.ownerAddress || isResaleTicket
              }
              isOrganizer={address === ticketListing?.event?.ownerAddress}
            />
            {(!ticketListing?.ticket.hasUsed || !isResaleTicket) && (
              <Box sx={{ display: "grid", placeItems: "center" }}>
                <Typography>This QR Code is valid until {seconds}</Typography>
              </Box>
            )}
          </Box>
        )}

        <motion.div
          animate={{
            y: [0, 20],
            transition: { repeat: Infinity, repeatType: "reverse", duration: 1 }
          }}
        >
          <Stack spacing={-6} sx={{ width: "100%", alignItems: "center" }}>
            <motion.div
              animate={{
                color: ["#e1bee7", "#f3e5f5"],
                transition: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1
                }
              }}
            >
              <ArrowForwardIosRoundedIcon
                sx={{
                  transform: "rotate(90deg)",
                  width: "40px",
                  height: "40px"
                }}
              />
            </motion.div>
            <motion.div
              animate={{
                color: ["#f3e5f5", "#e1bee7"],
                transition: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1
                }
              }}
            >
              <ArrowForwardIosRoundedIcon
                sx={{
                  transform: "rotate(90deg)",
                  width: "40px",
                  height: "40px"
                }}
              />
            </motion.div>
            <motion.div
              animate={{
                color: ["#f3e5f5", "#e1bee7"],
                transition: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1
                }
              }}
            >
              <ArrowForwardIosRoundedIcon
                sx={{
                  transform: "rotate(90deg)",
                  width: "40px",
                  height: "40px"
                }}
              />
            </motion.div>
          </Stack>
        </motion.div>
      </Stack>
      {/* Event */}
      {address !== ticketListing?.event.ownerAddress && (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            placeItems: "center",
            paddingY: 10
          }}
        >
          <Alert
            severity="info"
            sx={{
              maginY: 4,
              background: "black",
              color: "white",
              marginBottom: 2,
              width: "100%",
              maxWidth: "360px"
            }}
          >
            {ticketListing?.ticket?.hasUsed || isResaleTicket ? (
              <Typography>
                {getTicketResaleDisabledText(
                  Boolean(ticketListing?.ticket?.hasUsed),
                  isResaleTicket
                )}
              </Typography>
            ) : (
              <>
                <AlertTitle>Want to sell this ticket?</AlertTitle>
                <span style={{ marginRight: 4, marginBottom: 4 }}>
                  If you no longer need this ticket
                </span>
                <Box sx={{ my: 2 }} />
                <Link
                  href={`/marketplace/sell/${ticketListing?.event?._id}`}
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                    marginTop: "16px"
                  }}
                >
                  <Button
                    variant="contained"
                    color="info"
                    data-testid="sell-ticket-button"
                  >
                    Sell it here!
                  </Button>
                </Link>
              </>
            )}
          </Alert>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <MyTicketDetails ticketListing={ticketListing} />
      </Box>
    </Container>
  )
}

export default withCustomerGuard(MyTicketView)
