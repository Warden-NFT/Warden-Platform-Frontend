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
import { AlertType } from "../../interfaces/modal/alert.interface"
import { LayoutContext } from "../layout/LayoutContext"

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
  saveEvent: (value: Event, organizerId: string) => Promise<Event | undefined>
  openEventDeployModal: boolean
  setOpenEventDeployModal: Dispatch<SetStateAction<boolean>>
}

export const CreateEventContext = createContext({} as CreateEventStruct)

const CreateEventContextProvider = ({ ...props }) => {
  // Hooks
  const { showErrorAlert } = useContext(LayoutContext)

  // States
  const DEFAULT_EVENT: Event = {
    _id: "",
    eventStatus: EVENT_STATUS.NOT_STARTED as unknown as EventStatusType,
    eventKeywords: [],
    location: null,
    online_url: "",
    ticketSupply: {
      general: 0,
      vip: 0,
      reservedSeat: 0
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
    ticketCollectionId: ""
  }
  const [event, setEvent] = useState<Event>(DEFAULT_EVENT)
  const [activeStep, setActiveStep] = useState<number>(1)
  const [isBackDisabled, setIsBackDisabled] = useState<boolean>(true)
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  // Event publish
  const [openEventDeployModal, setOpenEventDeployModal] = useState(false)

  const onClickBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1)
  }

  const onClickNext = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1)
  }

  const resetEvent = () => {
    setEvent(DEFAULT_EVENT)
  }

  const saveEvent = async (event: Event, organizerId: string) => {
    setEvent({ ...event, organizerId: organizerId ?? "" })
    const data = { ...event, organizerId: organizerId ?? "" }
    const eventImage = data.image
    data.image = ""

    try {
      const res = await client.post<Event>("event", data)
      const eventId = res.data._id
      const updatedEvent = res.data

      if (eventImage) {
        const formData = new FormData()
        formData.append("image", eventImage)
        formData.append("eventId", eventId ?? "")
        const res = await client.post("/event/image", formData)
        updatedEvent.image = res.data
      }
      return updatedEvent
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Save event unsuccessful",
        description:
          "Unable to save yoru event at this time. Please try again later."
      })
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
    saveEvent,
    openEventDeployModal,
    setOpenEventDeployModal
  }

  return <CreateEventContext.Provider value={values} {...props} />
}

export default CreateEventContextProvider
