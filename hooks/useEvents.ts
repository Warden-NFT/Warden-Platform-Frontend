import { useContext, useEffect, useState } from "react"
import { client } from "../configs/axios/axiosConfig"
import { LayoutContext } from "../contexts/layout/LayoutContext"
import {
  ResaleTicketPurchasePermissionRequestsList,
  TicketCollectionDTO
} from "../dtos/ticket/ticket.dto"
import { Event } from "../interfaces/event/event.interface"
import { AlertType } from "../interfaces/modal/alert.interface"

export const useEvents = () => {
  const [eventLoading, setEventLoading] = useState(false)
  // Hooks
  const { showErrorAlert } = useContext(LayoutContext)

  // States
  const [events, setEvents] = useState<Event[]>([])
  const [originalEvents, setOriginalEvents] = useState<Event[]>([])
  const [currentEvent, setCurrentEvent] = useState<Event>()
  const [resaleTicketPurchaseRequests, setResaleTicketPurchaseRequests] =
    useState<ResaleTicketPurchasePermissionRequestsList>({
      approved: [],
      notApproved: []
    })

  const getEventFromOrganizer = async (eventOrganizerId: string) => {
    setEventLoading(true)
    try {
      const res = await client.get<Event[]>("/event/organizer", {
        params: {
          id: eventOrganizerId
        }
      })
      const events: Event[] = res.data
      setEvents(events)
      setOriginalEvents(events)
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

  const getResaleTicketPurchaseRequests = async (collectionId: string) => {
    try {
      const ticketCollection = await client.get<TicketCollectionDTO>(
        "/ticket",
        { params: { collectionId } }
      )
      setResaleTicketPurchaseRequests({
        approved: ticketCollection.data.resaleTicketPurchasePermission.filter(
          (permission) => permission.approved
        ),
        notApproved:
          ticketCollection.data.resaleTicketPurchasePermission.filter(
            (permission) => !permission.approved
          )
      })
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Error",
        description:
          "Unable to fetch resale ticket purchase requests at this time. Please try again later."
      })
    }
  }

  const searchMyEvents = (searchValue: string) => {
    if (searchValue) {
      const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setEvents(filteredEvents)
    } else {
      setEvents(originalEvents)
    }
  }

  useEffect(() => {
    if (!currentEvent?.ticketCollectionId) return
    getResaleTicketPurchaseRequests(currentEvent?.ticketCollectionId)
  }, [currentEvent])

  return {
    events,
    setEvents,
    currentEvent,
    setCurrentEvent,
    getEventFromOrganizer,
    getEvent,
    eventLoading,
    resaleTicketPurchaseRequests,
    setResaleTicketPurchaseRequests,
    getResaleTicketPurchaseRequests,
    searchMyEvents
  }
}
