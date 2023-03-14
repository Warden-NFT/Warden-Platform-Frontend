import { Box } from "@mui/material"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import EventSummary from "../../../components/event/Detail/EventSummary"
import { withEventOrganizerGuard } from "../../../guards/withAuth"
import DeployEventBanner from "../../../components/event/CreateEvent/DeployEvent/DeployEventBanner"
import { useEvents } from "../../../hooks/useEvents"
import useAsyncEffect from "../../../hooks/useAsyncEffect"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import ViewEventBanner from "../../../components/event/CreateEvent/DeployEvent/ViewEventBanner"
import Head from "next/head"

function PublishEvent() {
  const router = useRouter()
  const { eid } = router.query
  const { getEvent, currentEvent: event, setCurrentEvent } = useEvents()
  const { setShowLoadingBackdrop } = useContext(LayoutContext)

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
        {event && !event.smartContractAddress && (
          <DeployEventBanner event={event} setCurrentEvent={setCurrentEvent} />
        )}
        {event && event.smartContractAddress && (
          <ViewEventBanner smartContractAddress={event.smartContractAddress} />
        )}
        {event && <EventSummary event={event} />}
      </Container>
    </>
  )
}

export default withEventOrganizerGuard(PublishEvent)
