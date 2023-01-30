import { Box, Container } from "@mui/material"
import { LayoutGroup } from "framer-motion"
import React, { useContext } from "react"
import { CREATE_EVENT_STEPS } from "../../../constants/generate/steps"
import { CreateEventContext } from "../../../contexts/event/CreateEventContext"
import ActiveStepper from "../../UI/navigation/ActiveStepper"

import CreateEventStep1 from "./Steps/CreateEventStep1"
import CreateEventStep2 from "./Steps/CreateEventStep2"
import CreateEventStep3 from "./Steps/CreateEventStep3"
import { motion } from "framer-motion"

function EventCreation() {
  const { activeStep } = useContext(CreateEventContext)

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
        {activeStep && (
          <Box>
            <ActiveStepper steps={CREATE_EVENT_STEPS} activeStep={activeStep}>
              <LayoutGroup>
                <motion.div layout>
                  <>
                    {activeStep === 1 && <CreateEventStep1 />}
                    {activeStep === 2 && <CreateEventStep2 />}
                    {activeStep === 3 && <CreateEventStep3 />}
                  </>
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
