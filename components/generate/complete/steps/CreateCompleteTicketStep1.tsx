import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography
} from "@mui/material"
import { grey, pink, purple } from "@mui/material/colors"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { SUPPORTED_DIGITAL_CURRENCIES } from "../../../../constants/currencies/digital"
import { TICKET_TYPES } from "../../../../constants/event/event"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { TicketTypes } from "../../../../interfaces/ticket/ticket.interface"
import { CreateCompleteTicketStep1Schema } from "../../../../schema/generate/complete"
import ControlledCurrencyPriceSelect from "../../../UI/input/ControlledCurrencyPriceSelect"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import ControlledEventSelect from "../../form/ControlledEventSelect"
import EventCreationAlert from "../../form/EventCreationAlert"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import ControlledTicketTypeCheckBoxes from "../../form/ControlledTicketTypeCheckBoxes"
import ControlledTicketPriceFields from "../../form/ControlledTicketPriceFields"

function CreateCompleteTicketStep1() {
  const { formInfo, setActiveStep, setFormInfo } = useContext(
    GenerateCompleteContext
  )
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { ...formInfo },
      enableReinitialize: true,
      validationSchema: CreateCompleteTicketStep1Schema,
      onSubmit: (data) => {
        setFormInfo(data)
        setActiveStep((prev) => prev + 1)
      }
    })

  return (
    <Box>
      <div>{JSON.stringify(values)}</div>
      {/* <div>{JSON.stringify(errors)}</div> */}
      <Stack
        spacing={2}
        p={4}
        sx={{
          backgroundColor: "white",
          marginY: 4,
          border: 2
        }}
      >
        <EventCreationAlert
          title="Have you create an event yet?"
          href="/create/event"
          hrefDescription="Go to Create Event"
          description="Make sure to create an event before creating a ticket."
          sx={{ backgroundColor: purple[50] }}
          iconTheme={{ color: purple[100] }}
        />

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
        <ControlledEventSelect
          subjectOf={values.subjectOf}
          touched={touched.subjectOf}
          handleChange={handleChange}
          error={errors.subjectOf}
        />
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

        <Divider />

        <FormControl required>
          <FormLabel>Choose ticket types</FormLabel>
          <Typography variant="caption" color="gray">
            Select ticket types that suit your event. You may select more than
            one type.
          </Typography>
          <ControlledTicketTypeCheckBoxes
            names={[
              "generalAdmissionEnabled",
              "vipEnabled",
              "reservedSeatEnabled"
            ]}
            values={[
              values.generalAdmissionEnabled,
              values.vipEnabled,
              values.reservedSeatEnabled
            ]}
            handleChange={handleChange}
          />
          <Typography>{errors.generalAdmissionEnabled}</Typography>
          <Typography>{errors.vipEnabled}</Typography>
          <Typography>{errors.reservedSeatEnabled}</Typography>
        </FormControl>

        <FormControl required>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormLabel>Enable Resale</FormLabel>
            <Switch
              value={values.enableResale}
              defaultChecked
              name="enableResale"
              id="enableResale-switch"
              data-testid="enableResale-switch"
              onChange={(e) => {
                handleChange(e)
                setFieldValue("enableRoyaltyFee", false)
              }}
            />
          </Stack>
        </FormControl>
        {values.enableResale && (
          <FormControl required>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormLabel>Enable Loyalty Fee</FormLabel>
              <Switch
                value={values.enableRoyaltyFee}
                onChange={handleChange}
                name="enableRoyaltyFee"
                id="enableRoyaltyFee-switch"
                data-testid="enableRoyaltyFee-switch"
              />
            </Stack>
          </FormControl>
        )}
        {values.enableRoyaltyFee && values.enableResale && (
          <FormControl required>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <FormLabel>Select Loyalty Fee Percentage</FormLabel>
                <Typography variant="caption" color="gray">
                  What is the ticket name?
                </Typography>
              </Stack>
              <Slider
                aria-label="loyalty-fee"
                name="royaltyFeePercentage"
                value={values.royaltyFeePercentage}
                onChange={handleChange}
                marks={[
                  { value: 0, label: "0%" },
                  { value: 20, label: "20%" }
                ]}
                max={20}
                valueLabelDisplay="auto"
                sx={{ width: 300 }}
              />
            </Stack>
          </FormControl>
        )}
        <Divider />
        <ControlledTicketPriceFields
          values={[
            values.price.general?.default,
            values.price.general?.min,
            values.price.general?.max
          ]}
          names={[
            "price.general.default",
            "price.general.min",
            "price.general.max"
          ]}
          error={errors.price?.general}
          touched={Boolean(touched.price?.general)}
          handleChange={handleChange}
          currencyName="currency"
          currencyValue={values.currency}
          currencyError={errors?.currency}
          currencyTouched={Boolean(touched.currency)}
          enableResale={values.enableResale}
        />
        {/* <ControlledCurrencyPriceSelect
          label="General admission ticket cost"
          labelDescription="How much does your general admission ticket cost"
          amountName="price.general.default"
          amountValue={values.price.general?.default ?? 0}
          handleChange={handleChange}
          amountError={Boolean(errors.price?.general)}
          amountTouched={touched.price?.general}
          currencyName="currency"
          currencyValue={values.currency}
          currencyError={Boolean(errors.currency)}
          currencyTouched={touched.currency}
        /> */}
        {values.vipEnabled && (
          <ControlledCurrencyPriceSelect
            label="VIP ticket cost"
            labelDescription="How much does your VIP admission ticket cost"
            amountName="price.researchSeat.default"
            amountValue={values.price.reservedSeat?.default ?? 0}
            handleChange={handleChange}
            amountError={Boolean(errors.price?.reservedSeat)}
            amountTouched={touched.price?.reservedSeat}
            currencyName="currency"
            currencyValue={values.currency}
            currencyError={Boolean(errors.currency)}
            currencyTouched={touched.currency}
          />
        )}
      </Stack>
      <ControlledStepperButtons
        isBackDisabled
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={handleSubmit}
      />
    </Box>
  )
}

export default CreateCompleteTicketStep1
