import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'
import ControlledStepperButtons from '../../UI/navigation/ControlledStepperButtons'
import { CompleteAssetCustomizeUtilitySchema } from '../../../schema/generate/complete'

function CustomizeUtilityForm() {
  const { setActiveStep } = useContext(GenerateCompleteContext)

  const { values, handleChange, touched, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: {
        publicationDatetime: null
      },
      validationSchema: CompleteAssetCustomizeUtilitySchema,
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
        <div>{JSON.stringify(errors)}</div>
        <FormControl required>
          <FormLabel>Publication date</FormLabel>
          <Typography variant="caption" color="gray">
            The Publication date of this ticket. A ticket must be publicize at
            least 1 day from now.
          </Typography>
          <DateTimePicker
            value={values.publicationDatetime}
            onChange={(val) => setFieldValue('publicationDatetime', val)}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          {errors.publicationDatetime && touched.publicationDatetime && (
            <FormHelperText>{errors.publicationDatetime}</FormHelperText>
          )}
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
