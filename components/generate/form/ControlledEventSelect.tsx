import React from 'react'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select
} from '@mui/material'
import { red } from '@mui/material/colors'
import { FormikTouched } from 'formik'

interface Props {
  subjectOf: string
  handleChange: any
  touched?: boolean
  error?: string
}

function ControlledEventSelect({
  subjectOf,
  handleChange,
  touched,
  error
}: Props) {
  return (
    <FormControl fullWidth required>
      <FormLabel id="subject-of-label">Associated Event</FormLabel>
      <Select
        labelId="subject-of-label"
        id="subject-of-select"
        name="subjectOf"
        value={subjectOf}
        label="Associated Event"
        size="small"
        displayEmpty
        onChange={handleChange}
      >
        <MenuItem value="" disabled>
          <em>Select the event that this ticket is meant for</em>
        </MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      <FormHelperText sx={{ color: red[600] }}>
        {error && touched ? error : ''}
      </FormHelperText>
    </FormControl>
  )
}

export default ControlledEventSelect
