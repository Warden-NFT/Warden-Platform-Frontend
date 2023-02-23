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
  getLatestEvents: () => Promise<Event[] | undefined>
  getFeaturedEvents: () => Promise<Event[] | undefined>
  searchEvents: (value: EventSearchParams) => Promise<Event[] | undefined>
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
        description:
          "Unable to register your account this time. Please try again later."
      })
      setSearchedEvents(undefined)
      return undefined
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
    getLatestEvents,
    getFeaturedEvents,
    searchEvents
  }
  return <MarketContext.Provider value={values} {...props} />
}

export default MarketContextProvider
