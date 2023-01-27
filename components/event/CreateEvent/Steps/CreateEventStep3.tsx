import { Box } from "@mui/material"
import React, { useContext } from "react"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"

function CreateEventStep3() {
  const { onClickBack, onClickNext } = useContext(CreateEventContext)
  return (
    <>
      <FlatCard>
        <Box>CreateEventStep3</Box>
      </FlatCard>
      <ControlledStepperButtons
        handlePrevious={onClickBack}
        handleNext={onClickNext}
        isBackDisabled={false}
        isRightDisabled={Object.keys({}).length !== 0}
      />
    </>
  )
}

export default CreateEventStep3
