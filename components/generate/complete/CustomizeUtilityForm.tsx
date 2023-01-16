import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'
import ControlledStepperButtons from '../../UI/navigation/ControlledStepperButtons'

function CustomizeUtilityForm() {
  const { setActiveStep } = useContext(GenerateCompleteContext)

  const { values } = useFormik({
    initialValues: {

    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <Box>
      <Stack
        spacing={2}
        p={4}
        sx={{
          backgroundColor: 'white',
          marginY: 4,
          borderRadius: 6,
          border: 2
        }}
      >
        {/* <FormControl required>
          <FormLabel>Event Name</FormLabel>
          <Typography variant="caption" color="gray">
            Event name is a unique name that describe the event
          </Typography>
          <TextField
            name="eventName"
            value={values.eventName}
            onChange={handleChange}
            id="event-name-input"
            data-testid="event-name-input"
            placeholder="My Event"
            variant="outlined"
            size="small"
            error={errors.eventName != null}
            helperText={touched.eventName ? errors.eventName : undefined}
          />
        </FormControl> */}
      </Stack>
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        //   handleNext={}
      />
    </Box>
  )
}

export default CustomizeUtilityForm
