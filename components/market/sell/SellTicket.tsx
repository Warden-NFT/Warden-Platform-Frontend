import { Step, StepLabel, Stepper } from "@mui/material"
import React, { useContext } from "react"
import { SellTicketContext } from "../../../contexts/market/SellTicketContext"
import { MarketTickets } from "../../../interfaces/market/marketEvent.interface"
import ContainerCard from "../../UI/card/ContainerCard"
import SellTicketStep1 from "./steps/SellTicketStep1"
import SellTicketStep2 from "./steps/SellTicketStep2"
import SellTicketStep3 from "./steps/SellTicketStep3"

type Props = {
  ownedTickets: MarketTickets
}

function SellTicketForm({ ownedTickets }: Props) {
  const { activeStep, ticketListingSuccess } = useContext(SellTicketContext)
  const steps = [
    "Select the tickets to sell",
    "Set your price",
    "Ticket listing result"
  ]

  return (
    <ContainerCard sx={{ mt: [2, 2, 2, 12] }}>
      <Stepper activeStep={activeStep - 1} nonLinear alternativeLabel>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <>{activeStep === 1 && <SellTicketStep1 ownedTickets={ownedTickets} />}</>
      <>{activeStep === 2 && <SellTicketStep2 />}</>
      <>
        {activeStep === 3 && (
          <SellTicketStep3 ticketListingSuccess={ticketListingSuccess} />
        )}
      </>
    </ContainerCard>
  )
}

export default SellTicketForm
