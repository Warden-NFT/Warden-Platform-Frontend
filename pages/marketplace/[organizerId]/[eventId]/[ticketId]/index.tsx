import { Container, IconButton, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import EventInfoBanner from "../../../../../components/market/event/EventInfoBanner"
import BannerLayout from "../../../../../components/UI/layout/BannerLayout"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { GetServerSideProps } from "next"
import {
  EventTicket,
  TicketQuotaCheckResultDTO
} from "../../../../../dtos/ticket/ticket.dto"
import axios from "axios"
import {
  Event,
  TicketTypeKey
} from "../../../../../interfaces/event/event.interface"
import { EventOrganizerUser } from "../../../../../interfaces/auth/user.interface"
import { MarketTickets } from "../../../../../interfaces/market/marketEvent.interface"
import Head from "next/head"
import TicketPurchaseModal from "../../../../../components/market/ticket/TicketPurchaseModal"
import { useAccount } from "wagmi"
import { useSmartContract } from "../../../../../hooks/useSmartContract"
import Web3 from "web3"
import { ABIItem } from "../../../../../interfaces/smartContract/smartContract.interface"
import { UserContext } from "../../../../../contexts/user/UserContext"
import { client } from "../../../../../configs/axios/axiosConfig"
import { LayoutContext } from "../../../../../contexts/layout/LayoutContext"
import TicketListingDetails from "../../../../../components/market/ticket/listing/TicketListingDetails"
import TicketListingActions from "../../../../../components/market/ticket/listing/TicketListingActions"

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
  const { abi, web3 } = useSmartContract()
  const { user } = useContext(UserContext)
  const { setShowLoadingBackdrop } = useContext(LayoutContext)
  const router = useRouter()

  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [isOwnedTicket, setIsOwnedTicket] = useState(false)
  const [isResaleTicket, setIsResaleTicket] = useState(false)
  const [isSold, setIsSold] = useState(false)
  const [statusChecked, setStatusChecked] = useState(false)
  const [ticketQuotaCheckResult, setTicketQuotaCheckResult] =
    useState<TicketQuotaCheckResultDTO>()

  function checkResaleTicket(forSale: boolean) {
    return (
      // This ticket has been sold before
      ticket.ownerHistory.length > 1 &&
      // The user is not the ticket's most recent owner
      ticket.ownerHistory.at(-1) !== address &&
      // Ticket is marked as for sale in the smart contract
      forSale
    )
  }

  const checkTicketOwnership = async (
    web3: Web3,
    abi: { abi: ABIItem[] },
    address: string,
    force?: boolean
  ) => {
    // Show loading backdrop
    setShowLoadingBackdrop(true)

    // Check the user's ticket purchase quota
    const _ticketQuotaCheckResult = await client.get("/ticket/quota/check", {
      params: {
        address,
        ticketCollectionId: event.ticketCollectionId,
        ticketType: TicketTypeKey[ticket.ticketType]
      }
    })
    setTicketQuotaCheckResult(_ticketQuotaCheckResult.data)

    // If the ticket hasn't been bought yet (no smartContractTicketId), no need to check for ownership
    const smartContractTicketId = ticket.smartContractTicketId
    if (!force && smartContractTicketId === undefined) {
      return
    }

    const contract = new web3.eth.Contract(abi.abi)
    contract.options.address = event.smartContractAddress
    contract.methods
      .getTicket(smartContractTicketId)
      .call()
      .then((result: any) => {
        setIsOwnedTicket(result.owner === address)
        setIsResaleTicket(checkResaleTicket(result.forSale))
        setIsSold(
          ticket.ownerHistory.length > 1 &&
            ticket.ownerHistory.at(-1) !== address &&
            !isResaleTicket
        )
        setTimeout(() => {
          setStatusChecked(true)
        }, 1000)
      })
      .catch(() => setStatusChecked(true))
      .finally(() => {
        setShowLoadingBackdrop(false)
      })
  }

  // Checks ticket ownership
  useEffect(() => {
    // If the dependencies aren't ready, don't do anything
    if (!web3 || !abi || !event.smartContractAddress || !address) return
    checkTicketOwnership(web3, abi, address)
  }, [web3, abi, address, isResaleTicket])

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
      <BannerLayout
        backgroundImage={event.image as string}
        title=""
        subtitle=""
        actionName=""
      >
        <Container>
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
          <TicketListingDetails
            ticket={ticket}
            event={event}
            statusChecked={statusChecked}
            isSold={isSold}
            isResaleTicket={isResaleTicket}
          />
          <TicketListingActions
            user={user}
            ticket={ticket}
            statusChecked={statusChecked}
            isSold={isSold}
            isResaleTicket={isResaleTicket}
            isOwnedTicket={isOwnedTicket}
            ticketQuotaCheckResult={ticketQuotaCheckResult}
            setShowPurchaseModal={setShowPurchaseModal}
          />
        </Container>
      </BannerLayout>
    </>
  )
}

export default MarketTicket
