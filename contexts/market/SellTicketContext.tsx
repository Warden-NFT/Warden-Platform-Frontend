import { createContext, Dispatch, SetStateAction, useState } from "react"
import { EventTicket } from "../../dtos/ticket/ticket.dto"

interface SellTicketContextStruct {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  selectedTicket: EventTicket | undefined
  setSelectedTicket: Dispatch<SetStateAction<EventTicket | undefined>>
  resalePrice: number | undefined
  setResalePrice: Dispatch<SetStateAction<number | undefined>>
}

export const SellTicketContext = createContext({} as SellTicketContextStruct)

const SellTicketContextProvider = ({ ...props }) => {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedTicket, setSelectedTicket] = useState<EventTicket>()
  const [resalePrice, setResalePrice] = useState<number>()

  const values: SellTicketContextStruct = {
    activeStep,
    setActiveStep,
    selectedTicket,
    setSelectedTicket,
    resalePrice,
    setResalePrice
  }
  return <SellTicketContext.Provider value={values} {...props} />
}

export default SellTicketContextProvider
