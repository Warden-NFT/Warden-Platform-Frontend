import React, { useContext } from "react"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import ActiveStepper from "../../UI/navigation/ActiveStepper"
import CreateLayeredTicketStep3 from "./steps/CreateLayeredTicketStep3"
import CreateLayeredTicketStep2 from "./steps/CreateLayeredTicketStep2"
import CreateLayeredTicketStep1 from "./steps/CreateLayeredTicketStep1"
import CreateLayeredTicketStep4 from "./steps/CreateLayeredTicketStep4"
import { LAYERED_MODE_STEPPER } from "../../../constants/generate/steps"
import CreateLayeredTicketStep5 from "./steps/CreateLayeredTicketStep5"
import CreateLayeredTicketStep6 from "./steps/CreateLayeredTicketStep6"
import FlatCard from "../../UI/card/FlatCard"

function LayeredGenerateContainer() {
  const { activeStep } = useContext(GenerateLayerContext)
  return (
    <ActiveStepper
      steps={LAYERED_MODE_STEPPER}
      activeStep={activeStep}
      sx={{ backgroundColor: "white" }}
    >
      <FlatCard>
        {activeStep === 1 && <CreateLayeredTicketStep1 />}
        {activeStep === 2 && <CreateLayeredTicketStep2 />}
        {activeStep === 3 && <CreateLayeredTicketStep3 />}
        {activeStep === 4 && <CreateLayeredTicketStep4 />}
        {activeStep === 5 && <CreateLayeredTicketStep5 />}
        {activeStep === 6 && <CreateLayeredTicketStep6 />}
      </FlatCard>
    </ActiveStepper>
  )
}

export default LayeredGenerateContainer
