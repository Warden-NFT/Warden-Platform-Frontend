import { Box } from "@mui/material"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import EventSummary from "../../../components/event/Detail/EventSummary"
import DeployEventBanner from "../../../components/event/CreateEvent/DeployEvent/DeployEventBanner"
import { useEvents } from "../../../hooks/useEvents"
import useAsyncEffect from "../../../hooks/useAsyncEffect"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import ViewEventBanner from "../../../components/event/CreateEvent/DeployEvent/ViewEventBanner"
import Head from "next/head"
import { UserContext } from "../../../contexts/user/UserContext"

function EventDetailPage() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { eid } = router.query
  const {
    getEvent,
    currentEvent: event,
    setCurrentEvent,
    resaleTicketPurchaseRequests,
    getResaleTicketPurchaseRequests
  } = useEvents()
  const { setShowLoadingBackdrop } = useContext(LayoutContext)

  const isEventOrganizer = () => {
    return Boolean(user && user.accountType === "EVENT_ORGANIZER")
  }

  useAsyncEffect(async () => {
    if (!eid) return
    setShowLoadingBackdrop(true)
    const _event = await getEvent(eid as string)
    setCurrentEvent(_event)
    setShowLoadingBackdrop(false)
  }, [eid])

  return (
    <>
      <Head>
        <title>Warden | {event?.name}</title>
      </Head>
      <Container>
        <Box sx={{ height: 16 }} />
        {isEventOrganizer() && event && !event.smartContractAddress && (
          <DeployEventBanner event={event} setCurrentEvent={setCurrentEvent} />
        )}
        {isEventOrganizer() && event && event.smartContractAddress && (
          <ViewEventBanner smartContractAddress={event.smartContractAddress} />
        )}
        {event && (
          <EventSummary
            event={event}
            isOrganizerView={isEventOrganizer}
            resaleTicketPurchaseRequests={resaleTicketPurchaseRequests}
            getResaleTicketPurchaseRequests={getResaleTicketPurchaseRequests}
          />
        )}
      </Container>
    </>
  )
}

export default EventDetailPage
