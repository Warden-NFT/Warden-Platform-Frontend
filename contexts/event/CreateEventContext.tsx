import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from "react"
import { client } from "../../configs/axios/axiosConfig"
import { EVENT_STATUS, TICKET_TYPE } from "../../constants/event/event"
import { Event, EventStatusType } from "../../interfaces/event/event.interface"
import { UserContext } from "../user/UserContext"

interface CreateEventStruct {
  event: Event
  setEvent: Dispatch<SetStateAction<Event>>
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  onClickBack: () => void
  onClickNext: () => void
  isBackDisabled: boolean
  setIsBackDisabled: Dispatch<SetStateAction<boolean>>
  isNextDisabled: boolean
  setIsNextDisabled: Dispatch<SetStateAction<boolean>>
  isFirstVisit: boolean
  setIsFirstVisit: Dispatch<SetStateAction<boolean>>
  resetEvent: () => void
  saveEvent: () => Promise<Event | undefined>
}

export const CreateEventContext = createContext({} as CreateEventStruct)

const CreateEventContextProvider = ({ ...props }) => {
  const { user } = useContext(UserContext)

  const DEFAULT_EVENT = {
    eventStatus: EVENT_STATUS.NOT_STARTED as unknown as EventStatusType,
    eventKeywords: [],
    location: null,
    online_url: "",
    ticketSupply: {
      general: 0,
      vip: 0,
      reservedSeat: 0,
      total: 0
    },
    organizerId: "",
    subEventId: "",
    superEventId: "",
    description: "",
    identifier: "",
    image: "",
    name: "",
    url: "",
    doorTime: undefined,
    startDate: undefined,
    endDate: undefined,
    ticketType: TICKET_TYPE.GENERAL,
    ownerAddress: "",
    smartContractAddress: "",
    ticketsMetadata: undefined
  }
  const [event, setEvent] = useState<Event>(DEFAULT_EVENT)
  const [activeStep, setActiveStep] = useState<number>(1)
  const [isBackDisabled, setIsBackDisabled] = useState<boolean>(true)
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  const onClickBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1)
  }

  const onClickNext = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1)
  }

  const resetEvent = () => {
    setEvent(DEFAULT_EVENT)
  }

  const saveEvent = async (): Promise<Event | undefined> => {
    setEvent({ ...event, organizerId: user?._id ?? "" })
    const _event = { ...event }
    try {
      const formData = new FormData()
      type E = keyof Event
      for (const key in _event) {
        if (key === "ticketSupply") continue
        formData.append(key, JSON.stringify(_event[key as E]))
      }
      formData.append("ticketSupply", JSON.stringify(event.ticketSupply))
      const res = await client.post<Event>("event/createEvent", formData)
      setEvent(res.data)
      return res.data
    } catch (error) {
      // TODO display error alert
    }
  }

  const values: CreateEventStruct = {
    event,
    setEvent,
    activeStep,
    setActiveStep,
    onClickBack,
    onClickNext,
    isBackDisabled,
    setIsBackDisabled,
    isNextDisabled,
    setIsNextDisabled,
    isFirstVisit,
    setIsFirstVisit,
    resetEvent,
    saveEvent
  }

  return <CreateEventContext.Provider value={values} {...props} />
}

export default CreateEventContextProvider
