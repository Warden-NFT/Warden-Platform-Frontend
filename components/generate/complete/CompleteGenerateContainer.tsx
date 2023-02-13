import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { COMPLETE_MODE_STEPS } from "../../../constants/generate/steps"
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext"
import ActiveStepper from "../../UI/navigation/ActiveStepper"
import CreateCompleteTicketStep2 from "./steps/CreateCompleteTicketStep2"
import CreateCompleteTicketStep3 from "./steps/CreateCompleteTicketStep3"
import CreateCompleteTicketStep1 from "./steps/CreateCompleteTicketStep1"
import CreateCompleteTicketStep4 from "./steps/CreateCompleteTicketStep4"

function CompleteGenerateContainer() {
  const { activeStep, formInfo, setFormInfo } = useContext(
    GenerateCompleteContext
  )
  const router = useRouter()

  useEffect(() => {
    const { ticketType } = router.query
    const _form = { ...formInfo }
    if (ticketType) {
      setFormInfo(_form)
    }
  }, [])

  return (
    <ActiveStepper
      steps={COMPLETE_MODE_STEPS}
      activeStep={activeStep}
      sx={{ backgroundColor: "#fff" }}
    >
      {activeStep === 1 && <CreateCompleteTicketStep1 />}
      {activeStep === 2 && <CreateCompleteTicketStep2 />}
      {activeStep === 3 && <CreateCompleteTicketStep3 />}
      {activeStep === 4 && <CreateCompleteTicketStep4 />}
    </ActiveStepper>
  )
}

export default CompleteGenerateContainer
