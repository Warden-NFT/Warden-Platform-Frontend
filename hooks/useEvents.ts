import { useContext, useState } from "react"
import { client } from "../configs/axios/axiosConfig"
import { LayoutContext } from "../contexts/layout/LayoutContext"
import { Event } from "../interfaces/event/event.interface"
import { AlertType } from "../interfaces/modal/alert.interface"

export const useEvents = () => {
  const [eventLoading, setEventLoading] = useState(false)
  // Hooks
  const { showErrorAlert } = useContext(LayoutContext)

  // States
  const [events, setEvents] = useState<Event[]>([])
  const [currentEvent, setCurrentEvent] = useState<Event>()

  const getEventFromOrganizer = async () => {
    setEventLoading(true)
    try {
      const res = await client.get<Event[]>("/event/organizer")
      const events: Event[] = res.data
      setEvents(events)
      setEventLoading(false)
      return events
    } catch (error) {
      setEventLoading(false)
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Error",
        description:
          "Unable to fetch your events at this time. Please try again later."
      })
    }
  }

  const getEvent = async (id: string): Promise<Event | undefined> => {
    try {
      const res = await client.get<Event>("/event", { params: { id } })
      const event = res.data
      setCurrentEvent(event)
      return event
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Error",
        description:
          "Unable to fetch event information at this time. Please try again later."
      })
    }
  }

  return {
    events,
    setEvents,
    currentEvent,
    setCurrentEvent,
    getEventFromOrganizer,
    getEvent,
    eventLoading
  }
}
