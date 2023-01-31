import { Container } from "@mui/system"
import React from "react"
import EventSummary from "../../../components/event/CreateEvent/Steps/EventSummary"
import { withEventOrganizerGuard } from "../../../guards/withAuth"

function PublishEvent() {
  return (
    <Container>
      <EventSummary />
    </Container>
  )
}

export default withEventOrganizerGuard(PublishEvent)
