import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import React, { useContext, useEffect } from "react"
import { GenerateLayerContext } from "../../../../contexts/generate/GenerateLayerContext"
import ControlledEventSelect from "../../form/ControlledEventSelect"
import { TicketTypes } from "../../../../interfaces/ticket/ticket.interface"
import EventCreationAlert from "../../form/EventCreationAlert"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { SUPPORTED_DIGITAL_CURRENCIES } from "../../../../constants/currencies/digital"
import { CreateLayeredTicketStep1Schema } from "../../../../schema/generate/layered"
import { useRouter } from "next/router"
import { pink } from "@mui/material/colors"

function CreateLayeredTicketStep1() {
  const { formInfo, setFormInfo, setActiveStep } =
    useContext(GenerateLayerContext)

  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { ...formInfo },
      enableReinitialize: true,
      validationSchema: CreateLayeredTicketStep1Schema,
      onSubmit: (data) => {
        setFormInfo(data)
        setActiveStep((prev) => prev + 1)
      }
    })

  const router = useRouter()
  useEffect(() => {
    if (values.ticketType) return

    const { ticketType } = router.query
    setFieldValue("ticketType", ticketType as TicketTypes)
  }, [router])

  return (
    <Stack width="100%">
      <Stack spacing={2}>
        <EventCreationAlert
          title="Have you create an event yet?"
          href="/create/event"
          hrefDescription="clicking here!"
          description="Make sure to create an event before creating a ticket. You can create an event by"
          sx={{ backgroundColor: pink[200] }}
          iconTheme={{ color: pink[500] }}
        />
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
            error={touched.name && errors.name != null}
            helperText={touched.name ? errors.name : undefined}
          />
        </FormControl>
        <ControlledEventSelect
          subjectOf={values.subjectOf}
          touched={touched.subjectOf}
          handleChange={handleChange}
          error={errors.subjectOf}
        />

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
            {errors.currency && touched.currency ? errors.currency : ""}
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
    </Stack>
  )
}

export default CreateLayeredTicketStep1