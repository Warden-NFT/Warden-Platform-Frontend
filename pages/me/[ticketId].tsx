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

function MyTicketView() {
  const router = useRouter()
  const { ticketId } = router.query
  const { address } = useAccount()
  const { user } = useContext(UserContext)
  const { ticketListing, getTicketListingFromTicketId } =
    useContext(MarketContext)

  useEffect(() => {
    if (!ticketId) return
    getTicketListingFromTicketId(ticketId as string)
  }, [router.query])

  const [qrCodeValue, setQrCodeValue] = useState({} as TicketQRUtilizeValue)
  useEffect(() => {
    if (!user || !address || !ticketId) return
    setQrCodeValue({
      userId: user?._id ?? "",
      eventId: ticketListing?.event._id ?? "",
      walletAddress: address,
      ticketId: ticketId as string
    })
  }, [address, user, ticketId, ticketListing])

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
          <Ticket
            hasUsed={ticketListing?.ticket.hasUsed}
            assetSrc={ticketListing?.ticket.ticketMetadata[0].image as string}
            assetName={ticketListing?.ticket.name ?? ""}
            eventName={ticketListing?.event.name ?? ""}
            eventOrganizer={ticketListing?.organizerInfo.organizationName ?? ""}
            ticketType={ticketListing?.ticket.ticketType ?? "GENERAL"}
            date={ticketListing?.event.startDate ?? new Date(0)}
            location={
              (ticketListing?.event.location?.structured_formatting.main_text ||
                ticketListing?.event.online_url) as string
            }
            codeDisplayMode="QR"
            codeValue={JSON.stringify(qrCodeValue)}
            cardSx={{ boxShadow: "5px 10px 10px #C397FE", height: "600px" }}
          />
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
                  width: "80px",
                  height: "80px"
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
                  width: "80px",
                  height: "80px"
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
                  width: "80px",
                  height: "80px"
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
            width: "400px"
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

export default MyTicketView
