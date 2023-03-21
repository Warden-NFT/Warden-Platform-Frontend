import { Step, StepLabel, Stepper, Typography } from "@mui/material"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import React, { useContext, useEffect } from "react"
import { useAccount } from "wagmi"
import { SellTicketContext } from "../../../contexts/market/SellTicketContext"
import { UserContext } from "../../../contexts/user/UserContext"
import { MarketTickets } from "../../../interfaces/market/marketEvent.interface"
import ContainerCard from "../../UI/card/ContainerCard"
import SellTicketStep1 from "./steps/SellTicketStep1"
import SellTicketStep2 from "./steps/SellTicketStep2"
import SellTicketStep3 from "./steps/SellTicketStep3"

type Props = {
  ownedTickets: MarketTickets
}

function SellTicketSteps({ ownedTickets }: Props) {
  const { activeStep, ticketListingSuccess } = useContext(SellTicketContext)
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { user } = useContext(UserContext)
  const steps = [
    "Select the tickets to sell",
    "Set your price",
    "Ticket listing result"
  ]

  useEffect(() => {
    if (!address && openConnectModal) openConnectModal()
  }, [address])

  return (
    <ContainerCard sx={{ mt: [2, 2, 2, 12] }}>
      {user && address ? (
        <>
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
          <>
            {activeStep === 1 && (
              <SellTicketStep1 ownedTickets={ownedTickets} />
            )}
          </>
          <>{activeStep === 2 && <SellTicketStep2 />}</>
          <>
            {activeStep === 3 && (
              <SellTicketStep3 ticketListingSuccess={ticketListingSuccess} />
            )}
          </>
        </>
      ) : (
        <Typography>
          You need to log in and connect your wallet to continue.
        </Typography>
      )}
    </ContainerCard>
  )
}

export default SellTicketSteps
