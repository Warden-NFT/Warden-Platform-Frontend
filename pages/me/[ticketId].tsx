import { Alert, AlertTitle, Container, Stack, Typography } from "@mui/material"
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

const TIME_LIMIT_SECONDS = 10 * 60

function MyTicketView() {
  const [seconds, setSeconds] = useState(TIME_LIMIT_SECONDS)

  const router = useRouter()
  const { ticketId } = router.query
  const { address } = useAccount()
  const { user } = useContext(UserContext)
  const { ticketListing, getTicketListingFromTicketId } =
    useContext(MarketContext)

  useEffect(() => {
    resetQrCode()
  }, [user, address, ticketId])

  useEffect(() => {
    if (!ticketId) return
    getTicketListingFromTicketId(ticketId as string)
  }, [router.query])

  useEffect(() => {
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
    if (!user || !address || !ticketId) return

    setQrCodeValue({
      userId: user?._id ?? "",
      eventId: ticketListing?.event._id ?? "",
      walletAddress: address,
      ticketId: ticketId as string,
      generateSince: new Date()
    })
  }

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Head>
        <title>Utilize Ticket</title>
      </Head>
      <Stack sx={{ alignItems: "center", height: "100vh" }}>
        <Typography variant="h3" component="h1">
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
            />
            <Box sx={{ display: "grid", placeItems: "center" }}>
              <Typography>This QR Code is valid until {seconds}</Typography>
            </Box>
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
            maxWidth: "320px"
          }}
        >
          <AlertTitle>Want to sell this ticket?</AlertTitle>
          If you no longer need this ticket{" "}
          <Link
            href={`/marketplace/sell/${ticketListing?.event?._id}`}
            style={{ color: "white" }}
          >
            Sell it here!
          </Link>
        </Alert>
        <MyTicketDetails ticketListing={ticketListing} />
      </Box>
    </Container>
  )
}

export default withCustomerGuard(MyTicketView)
