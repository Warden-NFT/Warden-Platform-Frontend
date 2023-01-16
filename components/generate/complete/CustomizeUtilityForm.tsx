import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
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

  const { values, handleChange, touched, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: {
        publicationDatetime: null
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
        <div>{JSON.stringify(values)}</div>
        <FormControl required>
          <FormLabel>Publicize date</FormLabel>
          <Typography variant="caption" color="gray">
            The Publication date of this ticket
          </Typography>
          <DateTimePicker
            value={values.publicationDatetime}
            onChange={(val) => setFieldValue('publicationDatetime', val)}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </FormControl>
      </Stack>
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={handleSubmit}
      />
    </Box>
  )
}

export default CustomizeUtilityForm
