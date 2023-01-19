import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useFormik } from 'formik'
import queryString from 'query-string'
import React, { useContext, useEffect } from 'react'
import { SUPPORTED_DIGITAL_CURRENCIES } from '../../../constants/currencies/digital'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'
import { TicketTypes } from '../../../interfaces/ticket/ticket.interface'
import { CompleteAssetTicketFormSchema } from '../../../schema/generate/complete'
import ControlledStepperButtons from '../../UI/navigation/ControlledStepperButtons'
import EventCreationAlert from '../form/EventCreationAlert'

function CompleteAssetTicketForm() {
  const { formInfo, setActiveStep, setFormInfo } = useContext(
    GenerateCompleteContext
  )
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { ...formInfo },
      enableReinitialize: true,
      validationSchema: CompleteAssetTicketFormSchema,
      onSubmit: (data) => {
        setFormInfo(data)
        setActiveStep((prev) => prev + 1)
      }
    })

  useEffect(() => {
    const { query } = queryString.parseUrl(window.location.href)
    const { ticketType } = query
    setFieldValue('ticketType', ticketType as TicketTypes)
  }, [window.location])

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
        <EventCreationAlert />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <FormLabel>Ticket Type</FormLabel>
            <Typography variant="caption" color="gray">
              Selected ticket type
            </Typography>
          </Stack>
          <Typography variant="h6">{values.ticketType}</Typography>
        </Stack>

        <FormControl required>
          <FormLabel>Ticket Name</FormLabel>
          <Typography variant="caption" color="gray">
            What is the ticket name?
          </Typography>
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name-input"
            data-testid="price-input"
            placeholder="WARDEN Event Ticket"
            variant="outlined"
            size="small"
            error={errors.name != null}
            helperText={touched.name ? errors.name : undefined}
          />
        </FormControl>
        <FormControl fullWidth required>
          <FormLabel id="subject-of-label">Associated Event</FormLabel>
          <Select
            labelId="subject-of-label"
            id="subject-of-select"
            name="subjectOf"
            value={values.subjectOf}
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
            {errors.subjectOf && touched.subjectOf ? errors.subjectOf : ''}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth required>
          <FormLabel id="ticket-currency-label">Ticket Currency</FormLabel>
          <Select
            labelId="ticket-currency-label"
            name="currency"
            id="ticket-currency-select"
            value={values.currency}
            label="Associated Event"
            size="small"
            displayEmpty
            onChange={handleChange}
          >
            {SUPPORTED_DIGITAL_CURRENCIES.map((currency, i) => (
              <MenuItem value={currency.symbol} key={i}>
                {currency.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {errors.currency && touched.currency ? errors.currency : ''}
          </FormHelperText>
        </FormControl>
        <FormControl required>
          <FormLabel>Ticket Price</FormLabel>
          <Typography variant="caption" color="gray">
            How much does your ticket cost
          </Typography>
          <TextField
            name="price"
            value={values.price}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {values.currency}
                </InputAdornment>
              )
            }}
            id="price-input"
            data-testid="price-input"
            placeholder="Ticket's price"
            type="number"
            variant="outlined"
            size="small"
            error={errors.price != null}
            helperText={touched.price ? errors.price : undefined}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Ticket Description</FormLabel>
          <Typography variant="caption" color="gray">
            Description
          </Typography>
          <TextField
            name="description"
            value={values.description}
            onChange={handleChange}
            id="description-input"
            data-testid="description-input"
            placeholder="Description"
            variant="outlined"
            size="small"
            multiline
            maxRows={3}
            error={errors.description != null}
            helperText={touched.description ? errors.description : undefined}
          />
        </FormControl>
      </Stack>
      <ControlledStepperButtons
        isBackDisabled
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={handleSubmit}
      />
    </Box>
  )
}

export default CompleteAssetTicketForm
