import { Stack } from "@mui/material"
import React from "react"
import ContainedButton from "../button/ContainedButton"

interface Props {
  handlePrevious?: () => void
  handleNext?: () => void
  isBackDisabled?: boolean
  isRightDisabled?: boolean
  backLabel?: string
  nextLabel?: string
}

function ControlledStepperButtons({
  handlePrevious,
  handleNext,
  isBackDisabled,
  isRightDisabled,
  backLabel,
  nextLabel
}: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ width: "100%", marginTop: 4 }}
    >
      <ContainedButton
        onClick={handlePrevious}
        disabled={isBackDisabled}
        variant="outlined"
        label={backLabel ?? "Back"}
        height="40px"
        width="200px"
      />
      <ContainedButton
        type="submit"
        onClick={handleNext}
        disabled={isRightDisabled}
        variant="contained"
        label={nextLabel ?? "Next"}
        height="40px"
        width="200px"
      />
    </Stack>
  )
}

export default ControlledStepperButtons
