import React from "react"
import EventCreation from "../../../components/event/CreateEvent/EventCreation"
import CreateEventContextProvider from "../../../contexts/event/CreateEventContext"

function CreateEvent() {
  return (
    <CreateEventContextProvider>
      <EventCreation />
    </CreateEventContextProvider>
  )
}

export default CreateEvent
