import Head from "next/head"
import React from "react"
import EventCreation from "../../../components/event/CreateEvent/EventCreation"
import { withEventOrganizerGuard } from "../../../guards/withAuth"

function CreateEvent() {
  return (
    <>
      <Head>
        <title>Create Event</title>
      </Head>
      <EventCreation />
    </>
  )
}

export default withEventOrganizerGuard(CreateEvent)
