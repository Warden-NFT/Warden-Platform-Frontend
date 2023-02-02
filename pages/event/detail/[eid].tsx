import { Container } from "@mui/system"
import { useRouter } from "next/router"
import React from "react"
import EventSummary from "../../../components/event/Detail/EventSummary"
import { withEventOrganizerGuard } from "../../../guards/withAuth"

function PublishEvent() {
  const router = useRouter()
  const { eid } = router.query
  return (
    <Container>{eid && <EventSummary eventId={eid.toString()} />}</Container>
  )
}

export default withEventOrganizerGuard(PublishEvent)
