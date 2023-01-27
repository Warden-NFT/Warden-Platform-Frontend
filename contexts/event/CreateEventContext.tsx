import { createContext, Dispatch, SetStateAction, useState } from "react"
import { EVENT_STATUS, TICKET_TYPE } from "../../constants/event/event"
import { Event } from "../../interfaces/event/event.interface"

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
}

export const CreateEventContext = createContext({} as CreateEventStruct)

const CreateEventContextProvider = ({ ...props }) => {
  const [event, setEvent] = useState<Event>({
    eventStatus: EVENT_STATUS.NOT_STARTED,
    eventKeywords: [],
    location: "",
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
  })
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
    setIsFirstVisit
  }

  return <CreateEventContext.Provider value={values} {...props} />
}

export default CreateEventContextProvider
