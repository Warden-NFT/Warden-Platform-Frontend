import { Stack } from '@mui/material'
import React from 'react'
import ContainedButton from '../button/ContainedButton'

interface Props {
  handlePrevious?: () => void
  handleNext?: () => void
  isBackDisabled?: boolean
  isRightDisabled?: boolean
}

function ControlledStepperButtons({
  handlePrevious,
  handleNext,
  isBackDisabled,
  isRightDisabled
}: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ width: '100%' }}
    >
      <ContainedButton
        onClick={handlePrevious}
        disabled={isBackDisabled}
        variant="outlined"
        label="Back"
        height="40px"
        width="200px"
      />
      <ContainedButton
        onClick={handleNext}
        disabled={isRightDisabled}
        variant="contained"
        label="Next"
        height="40px"
        width="200px"
      />
    </Stack>
  )
}

export default ControlledStepperButtons
