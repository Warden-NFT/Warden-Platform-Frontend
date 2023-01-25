import { Box, Container } from "@mui/material"
import { useFormik } from "formik"
import React, { useContext } from "react"
import { CREATE_EVENT_STEPS } from "../../../constants/generate/steps"
import { CreateEventContext } from "../../../contexts/event/CreateEventContext"
import ActiveStepper from "../../UI/navigation/ActiveStepper"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import CreateEventStep1 from "./Steps/CreateEventStep1"
import CreateEventStep2 from "./Steps/CreateEventStep2"
import CreateEventStep3 from "./Steps/CreateEventStep3"

function EventCreation() {
  const { activeStep, onClickBack, onClickNext } =
    useContext(CreateEventContext)
  useFormik({
    initialValues: {},
    enableReinitialize: true,
    // validationSchema: CompleteAssetTicketFormSchema,
    onSubmit: (data) => {
      console.log(data)
    }
  })

  // Page 2
  //   doorTime: Date
  //   location: string
  //   startDate: Date
  //   endDate: Date

  // Page 3
  //   ticketType: TicketType
  //   ticketSupply: {
  //     general: number
  //     vip: number
  //     reservedSeat: number
  //     total: number
  //   }

  return (
    <Container>
      <form>
        {activeStep && (
          <Box>
            <ActiveStepper steps={CREATE_EVENT_STEPS} activeStep={activeStep}>
              {activeStep === 1 && <CreateEventStep1 />}
              {activeStep === 2 && <CreateEventStep2 />}
              {activeStep === 3 && <CreateEventStep3 />}
            </ActiveStepper>
            <ControlledStepperButtons
              handlePrevious={onClickBack}
              handleNext={onClickNext}
              isBackDisabled={activeStep <= 1}
            />
          </Box>
        )}
      </form>
    </Container>
  )
}

export default EventCreation
