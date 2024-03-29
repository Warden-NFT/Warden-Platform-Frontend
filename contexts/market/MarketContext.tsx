import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react"
import { client } from "../../configs/axios/axiosConfig"
import { Event } from "../../interfaces/event/event.interface"
import { EventSearchParams } from "../../interfaces/event/eventSearch.interface"
import {
  MarketEvents,
  MarketTickets,
  TicketListing
} from "../../interfaces/market/marketEvent.interface"
import { AlertType } from "../../interfaces/modal/alert.interface"
import { LayoutContext } from "../layout/LayoutContext"

interface MarketContextStruct {
  featuredEvents: Event[] | undefined
  setFeaturedEvents: Dispatch<SetStateAction<Event[] | undefined>>
  latestEvents: Event[] | undefined
  setLatestEvents: Dispatch<SetStateAction<Event[] | undefined>>
  EventSearch: Event[] | undefined
  setEventSearch: Dispatch<SetStateAction<Event[] | undefined>>
  searchedEvents: Event[] | undefined
  setSearchedEvents: Dispatch<SetStateAction<Event[] | undefined>>
  marketEvents: MarketEvents | undefined
  setMarketEvents: Dispatch<SetStateAction<MarketEvents | undefined>>
  filteredMarketEvents: MarketEvents | undefined
  setFilteredMarketEvents: Dispatch<SetStateAction<MarketEvents | undefined>>
  marketTickets: MarketTickets | undefined
  setMarketTickets: Dispatch<SetStateAction<MarketTickets | undefined>>
  ticketListing: TicketListing | undefined
  setTicketListing: Dispatch<SetStateAction<TicketListing | undefined>>

  getLatestEvents: () => Promise<Event[] | undefined>
  getFeaturedEvents: () => Promise<Event[] | undefined>
  searchEvents: (value: EventSearchParams) => Promise<Event[] | undefined>
  getMarketEvents: (organizerId: string) => Promise<MarketEvents | undefined>
  searchOrganizerEvents: (searchTerm: string, sortBy: string) => void
  getMarketTickets: (organizerId: string) => Promise<MarketTickets | undefined>
  getOwnedMarketTickets: (
    organizerId: string,
    walletAddress: string
  ) => Promise<MarketTickets | undefined>
  getTicketListingFromTicketId: (
    ticketId: string
  ) => Promise<TicketListing | undefined>
}

export const MarketContext = createContext({} as MarketContextStruct)

const MarketContextProvider = ({ ...props }) => {
  const { showErrorAlert } = useContext(LayoutContext)

  const [featuredEvents, setFeaturedEvents] = useState<Event[] | undefined>(
    undefined
  )
  const [latestEvents, setLatestEvents] = useState<Event[] | undefined>(
    undefined
  )
  const [searchedEvents, setSearchedEvents] = useState<Event[] | undefined>(
    undefined
  )
  const [EventSearch, setEventSearch] = useState<Event[] | undefined>([])
  const [marketEvents, setMarketEvents] = useState<MarketEvents | undefined>()
  const [filteredMarketEvents, setFilteredMarketEvents] = useState<
    MarketEvents | undefined
  >()
  const [marketTickets, setMarketTickets] = useState<
    MarketTickets | undefined
  >()
  const [ticketListing, setTicketListing] = useState<
    TicketListing | undefined
  >()

  const getLatestEvents = async () => {
    try {
      const _latestEventRes = await client.get<Event[]>("market/latest", {
        params: {
          limit: 10
        }
      })
      setLatestEvents(_latestEventRes.data)
      return _latestEventRes.data
    } catch (error) {
      setLatestEvents(undefined)
      return undefined
    }
  }
  const getFeaturedEvents = async () => {
    try {
      const _featuredEventRes = await client.get<Event[]>("market/featured")
      setFeaturedEvents(_featuredEventRes.data)
      return _featuredEventRes.data
    } catch (error) {
      setFeaturedEvents(undefined)
      return undefined
    }
  }

  const searchEvents = async (searchParams: EventSearchParams) => {
    try {
      const _searchResults = await client.post("market/search", searchParams)
      setSearchedEvents(_searchResults.data)
      return _searchResults.data
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Authentication error",
        description: "Unable to search for events. Please try again later."
      })
      setSearchedEvents(undefined)
      return undefined
    }
  }

  const getMarketEvents = async (organizerId: string) => {
    try {
      const _marketEvents = await client.get<MarketEvents>("/market/events", {
        params: {
          organizerId: organizerId
        }
      })
      setMarketEvents(_marketEvents.data)
      setFilteredMarketEvents(_marketEvents.data)
      return _marketEvents.data
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Authentication error",
        description: "Unable to search for events. Please try again later."
      })
      setMarketEvents(undefined)
      setFilteredMarketEvents(undefined)
      return undefined
    }
  }

  const getTicketListingFromTicketId = async (
    ticketId: string
  ): Promise<TicketListing | undefined> => {
    try {
      const _ticketListing = await client.get<TicketListing>(
        `/market/ticket/${ticketId}`
      )
      setTicketListing(_ticketListing.data)
      return _ticketListing.data
    } catch (error) {
      setTicketListing(undefined)
      return undefined
    }
  }

  const searchOrganizerEvents = (searchTerm: string) => {
    if (!filteredMarketEvents) return
    if (!marketEvents) return
    if (!marketEvents.organizerInfo) return
    if (!marketEvents.events) return
    if (!marketEvents.eventTicketPreviews) return

    const _filteredMarketEvents = { ...marketEvents }

    // find the index of events where the event matches the search query
    const matchingEventIndices = marketEvents.events.map((event, index) => {
      const match = event.name.toLowerCase().includes(searchTerm.toLowerCase())
      if (match) return index
    })

    // filter out irrelevant events
    _filteredMarketEvents.events = marketEvents.events.filter(
      (event, index) => {
        return matchingEventIndices.includes(index)
      }
    )
    _filteredMarketEvents.eventTicketPreviews =
      marketEvents.eventTicketPreviews.filter((event, index) => {
        return matchingEventIndices.includes(index)
      })

    setFilteredMarketEvents(_filteredMarketEvents)
    return _filteredMarketEvents
  }

  const getMarketTickets = async (eventId: string) => {
    try {
      const _marketTickets = await client.get<MarketTickets>(
        "/market/tickets",
        {
          params: {
            eventId: eventId
          }
        }
      )
      setMarketTickets(_marketTickets.data)
      return _marketTickets.data
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Error error",
        description: "Unable to search for tickets. Please try again later."
      })
    }
  }

  const getOwnedMarketTickets = async (
    eventId: string,
    walletAddress: string
  ) => {
    try {
      const _marketTickets = await client.get<MarketTickets>(
        "/market/tickets/owned",
        {
          params: {
            eventId,
            walletAddress
          }
        }
      )
      setMarketTickets(_marketTickets.data)
      return _marketTickets.data
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Error error",
        description: "Unable to search for tickets. Please try again later."
      })
    }
  }

  const values: MarketContextStruct = {
    featuredEvents,
    setFeaturedEvents,
    latestEvents,
    setLatestEvents,
    EventSearch,
    setEventSearch,
    searchedEvents,
    setSearchedEvents,
    marketEvents,
    filteredMarketEvents,
    marketTickets,
    setMarketTickets,
    setFilteredMarketEvents,
    setMarketEvents,
    getLatestEvents,
    getFeaturedEvents,
    searchEvents,
    getMarketEvents,
    searchOrganizerEvents,
    getMarketTickets,
    getOwnedMarketTickets,
    ticketListing,
    setTicketListing,
    getTicketListingFromTicketId
  }
  return <MarketContext.Provider value={values} {...props} />
}

export default MarketContextProvider
