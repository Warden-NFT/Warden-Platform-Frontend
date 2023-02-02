import React from "react"
import EventCreation from "../../../components/event/CreateEvent/EventCreation"
import { withEventOrganizerGuard } from "../../../guards/withAuth"

function CreateEvent() {
  return <EventCreation />
}

export default withEventOrganizerGuard(CreateEvent)
