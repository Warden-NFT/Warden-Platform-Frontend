import { useState } from "react"
import { client } from "../configs/axios/axiosConfig"
import { Event } from "../interfaces/event/event.interface"

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [currentEvent, setCurrentEvent] = useState<Event>()

  const getEventFromOrganizer = async () => {
    try {
      const res = await client.get<Event[]>("/event/getEventFromOrganizer")
      const events: Event[] = res.data
      setEvents(events)
    } catch (error) {
      // TODO: display error alert
    }
  }

  const getEvent = async (id: string): Promise<Event | undefined> => {
    try {
      const res = await client.get<Event>("/event/getEvent", { params: { id } })
      setCurrentEvent(res.data)
      return res.data
    } catch (error) {
      // TODO: display error alert
    }
  }

  return {
    events,
    setEvents,
    currentEvent,
    setCurrentEvent,
    getEventFromOrganizer,
    getEvent
  }
}
