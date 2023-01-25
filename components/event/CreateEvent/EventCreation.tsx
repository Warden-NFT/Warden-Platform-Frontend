import { Box, Container } from "@mui/material"
import { useFormik } from "formik"
import { LayoutGroup } from "framer-motion"
import React, { useContext } from "react"
import { CREATE_EVENT_STEPS } from "../../../constants/generate/steps"
import { CreateEventContext } from "../../../contexts/event/CreateEventContext"
import FlatCard from "../../UI/card/FlatCard"
import ActiveStepper from "../../UI/navigation/ActiveStepper"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import CreateEventStep1 from "./Steps/CreateEventStep1"
import CreateEventStep2 from "./Steps/CreateEventStep2"
import CreateEventStep3 from "./Steps/CreateEventStep3"
import { motion } from "framer-motion"

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
              <LayoutGroup>
                <motion.div layout>
                  <FlatCard>
                    <>
                      {activeStep === 1 && <CreateEventStep1 />}
                      {activeStep === 2 && <CreateEventStep2 />}
                      {activeStep === 3 && <CreateEventStep3 />}
                    </>
                  </FlatCard>
                  <ControlledStepperButtons
                    handlePrevious={onClickBack}
                    handleNext={onClickNext}
                    isBackDisabled={activeStep <= 1}
                  />
                </motion.div>
              </LayoutGroup>
            </ActiveStepper>
          </Box>
        )}
      </form>
    </Container>
  )
}

export default EventCreation
