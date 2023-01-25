import { createContext, Dispatch, SetStateAction, useState } from "react"
import { Event } from "../../interfaces/event/event.interface"

interface CreateEventStruct {
  event: Event | undefined
  setEvent: Dispatch<SetStateAction<Event | undefined>>
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  onClickBack: () => void
  onClickNext: () => void
}

export const CreateEventContext = createContext({} as CreateEventStruct)

const CreateEventContextProvider = ({ ...props }) => {
  const [event, setEvent] = useState<Event>()
  const [activeStep, setActiveStep] = useState<number>(1)

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
    onClickNext
  }

  return <CreateEventContext.Provider value={values} {...props} />
}

export default CreateEventContextProvider
