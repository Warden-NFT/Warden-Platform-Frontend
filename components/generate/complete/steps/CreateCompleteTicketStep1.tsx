import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Slider,
  Stack,
  Switch,
  Typography
} from "@mui/material"
import { red, purple } from "@mui/material/colors"
import { useFormik } from "formik"
import React, { useContext } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { CreateTicketInfoSchema } from "../../../../schema/generate/complete"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import ControlledEventSelect from "../../form/ControlledEventSelect"
import EventCreationAlert from "../../form/EventCreationAlert"
import ControlledTicketTypeCheckBoxes from "../../form/ControlledTicketTypeCheckBoxes"
import ControlledTicketPriceFields from "../../form/ControlledTicketPriceFields"
import { TextFieldWrapper } from "../../../UI/textfield/TextFieldWrapper"

function CreateCompleteTicketStep1() {
  const { formInfo, setActiveStep, setFormInfo } = useContext(
    GenerateCompleteContext
  )
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { ...formInfo },
      enableReinitialize: true,
      validationSchema: CreateTicketInfoSchema,
      onSubmit: (data) => {
        setFormInfo(data)
        setActiveStep((prev) => prev + 1)
      }
    })

  return (
    <Box>
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
          href="/event"
          hrefDescription="Go to Create Event"
          description="Make sure to create an event before creating a ticket."
          sx={{ backgroundColor: purple[50] }}
          iconTheme={{ color: purple[100] }}
        />

        <Typography variant="h6" component="h2">
          About the Ticket
        </Typography>
        <FormControl required>
          <FormLabel>Ticket Name</FormLabel>
          <Typography variant="caption" color="gray">
            What is the ticket name? (Be as specific as possible)
          </Typography>
          <TextFieldWrapper
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
            A brief description about the ticket and the event.
          </Typography>
          <TextFieldWrapper
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

        <Typography variant="h6" component="h2">
          Ticket's Type & Rules
        </Typography>
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
          <Typography variant="caption" color={red[500]}>
            {errors.generalAdmissionEnabled}
          </Typography>
          <Typography variant="caption" color={red[500]}>
            {errors.vipEnabled}
          </Typography>
          <Typography variant="caption" color={red[500]}>
            {errors.reservedSeatEnabled}
          </Typography>
        </FormControl>
        {values.vipEnabled && (
          <FormControl required>
            <FormLabel>VIP Ticket Benefit</FormLabel>
            <Typography variant="caption">
              What is the benefit of VIP tickets?
            </Typography>
            <TextFieldWrapper
              name="vipBenefit"
              value={values.vipBenefit}
              onChange={handleChange}
              id="vipBenefit-input"
              data-testid="vipBenefit-input"
              placeholder="Describe about the benefits of VIP ticket"
              variant="outlined"
              size="small"
              error={errors.vipBenefit != null}
              helperText={touched.vipBenefit ? errors.vipBenefit : undefined}
            />
          </FormControl>
        )}
        <FormControl required>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <FormLabel>Enable Resale</FormLabel>
              <Typography variant="caption" color="gray">
                Do you want ticket buyers the ability to resell the ticket? The
                resale tickets will be based upon your rules.
              </Typography>
            </Stack>

            <Switch
              value={values.enableResale}
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
              <Stack>
                <FormLabel>Enable Loyalty Fee</FormLabel>
                <Typography variant="caption" color="gray">
                  Would you like to get any monery benefit when ticket resale
                  occurs? The benefit amount will be a % of the resale price.
                </Typography>
              </Stack>
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
        {values.enableResale && (
          <FormControl required>
            <FormLabel>Ticket quota per user</FormLabel>
            <Typography variant="caption" color="gray">
              Limit the amount of tickets that user could purchase
            </Typography>
            <TextFieldWrapper
              name="ticketQuota.general"
              value={values.ticketQuota.general}
              onChange={handleChange}
              id="ticketQuota.general-input"
              data-testid="ticketQuota.general-input"
              variant="outlined"
              size="small"
              type="number"
              error={errors.ticketQuota?.general != null}
              helperText={
                touched.ticketQuota?.general
                  ? errors.ticketQuota?.general
                  : undefined
              }
            />
          </FormControl>
        )}
        {values.enableResale && values.vipEnabled && (
          <FormControl required>
            <FormLabel>VIP ticket quota per user</FormLabel>
            <Typography variant="caption" color="gray">
              Limit the amount of VIP tickets that user could purchase
            </Typography>
            <TextFieldWrapper
              name="ticketQuota.vip"
              value={values.ticketQuota.vip}
              onChange={handleChange}
              id="ticketQuota.vip-input"
              data-testid="ticketQuota.vip-input"
              placeholder="1"
              variant="outlined"
              size="small"
              type="number"
              error={errors.ticketQuota?.vip != null}
              helperText={
                touched.ticketQuota?.vip ? errors.ticketQuota?.vip : undefined
              }
            />
          </FormControl>
        )}
        <Divider />
        {values.generalAdmissionEnabled && (
          <>
            <Typography variant="h6" component="h2">
              General Admission Pricings
            </Typography>
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
              // @ts-ignore
              error={errors.price?.general}
              touched={Boolean(touched.price?.general)}
              handleChange={handleChange}
              currencyName="currency"
              currencyValue={values.currency}
              currencyError={errors?.currency}
              currencyTouched={Boolean(touched.currency)}
              enableResale={values.enableResale}
            />
          </>
        )}

        {values.vipEnabled && (
          <>
            <Typography variant="h6" component="h2">
              VIP Tickets Pricings
            </Typography>
            <ControlledTicketPriceFields
              values={[
                values.price.vip?.default,
                values.price.vip?.min,
                values.price.vip?.max
              ]}
              names={["price.vip.default", "price.vip.min", "price.vip.max"]}
              error={errors.price?.vip}
              touched={Boolean(touched.price?.vip)}
              handleChange={handleChange}
              currencyName="currency"
              currencyValue={values.currency}
              currencyError={errors?.currency}
              currencyTouched={Boolean(touched.currency)}
              enableResale={values.enableResale}
            />
          </>
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
