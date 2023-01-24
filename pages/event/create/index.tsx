import { Box, Grid, Stack } from "@mui/material"
import { Container } from "@mui/system"
import { useFormik } from "formik"
import React, { useState } from "react"
import ActiveStepper from "../../../components/UI/navigation/ActiveStepper"
import ControlledStepperButtons from "../../../components/UI/navigation/ControlledStepperButtons"
import { CREATE_EVENT_STEPS } from "../../../constants/generate/steps"

function CreateEvent() {
  const [activeStep, setActiveStep] = useState(1)
  useFormik({
    initialValues: {},
    enableReinitialize: true,
    // validationSchema: CompleteAssetTicketFormSchema,
    onSubmit: (data) => {
      console.log(data)
    }
  })

  // Page 1
  //   name: string
  //   description: string
  //   image: string
  //   url: string
  //   eventKeywords: [string]

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
        <Box>
          <ActiveStepper steps={CREATE_EVENT_STEPS} activeStep={activeStep}>
            {activeStep === 1 && (
              <Stack
                spacing={2}
                p={4}
                sx={{
                  backgroundColor: "white",
                  marginY: 4,
                  borderRadius: 6,
                  border: 2
                }}
              >
                Step 1
              </Stack>
            )}
          </ActiveStepper>
          <ControlledStepperButtons
            handlePrevious={() => {
              console.log("HI")
            }}
            handleNext={() => {
              console.log("HI")
            }}
          />
        </Box>
      </form>
    </Container>
  )
}

export default CreateEvent
