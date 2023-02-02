import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from "@mui/material"
import React, { useContext, useState } from "react"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import { useFormik } from "formik"
import {
  Event,
  TicketSupplySettings,
  TicketTypeKey
} from "../../../../interfaces/event/event.interface"
import { TextFieldWrapper } from "../../../UI/textfield/TextFieldWrapper"
import { CreateEventStep3Schema } from "../../../../schema/event/createEventStep3.schema"
import { useRouter } from "next/navigation"
import { UserContext } from "../../../../contexts/user/UserContext"

function CreateEventStep3() {
  // Hooks
  const {
    event: currentEvent,
    setEvent,
    setActiveStep,
    saveEvent
  } = useContext(CreateEventContext)
  const { user } = useContext(UserContext)
  const router = useRouter()
  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      enableGeneral: currentEvent.ticketSupply.general > 0,
      general: currentEvent.ticketSupply.general,
      enableVip: currentEvent.ticketSupply.vip > 0,
      vip: currentEvent.ticketSupply.vip,
      enableReservedSeat: currentEvent.ticketSupply.reservedSeat > 0,
      reservedSeat: currentEvent.ticketSupply.reservedSeat
    },
    validationSchema: CreateEventStep3Schema,
    onSubmit: async (data) => {
      if (!user || !user._id) return
      const _event: Event = {
        ...currentEvent,
        ticketSupply: data
      }
      setEvent(_event)
      const savedEvent: Event | undefined = await saveEvent(_event, user._id)
      if (savedEvent) router.push(`/event/detail/${savedEvent._id}`)
      // TODO: display error when failing to get a new event
    }
  })

  // States
  const [ticketSupply, setTicketSupply] = useState<TicketSupplySettings[]>([
    {
      checkName: "enableGeneral",
      type: "general",
      checked: currentEvent.ticketSupply.general > 0 || false,
      supply: 0,
      label: "General Admission Tickets"
    },
    {
      checkName: "enableVip",
      type: "vip",
      checked: currentEvent.ticketSupply.vip > 0 || false,
      supply: 0,
      label: "VIP Tickets"
    },
    {
      checkName: "enableReservedSeat",
      type: "reservedSeat",
      checked: currentEvent.ticketSupply.reservedSeat > 0 || false,
      supply: 0,
      label: "Reserved Seats Tickets"
    }
  ])

  // Event handlers

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTicketSupply = [...ticketSupply]

    setFieldValue(newTicketSupply[index].checkName, event.target.checked)
    newTicketSupply[index] = {
      ...ticketSupply[index],
      checked: event.target.checked,
      supply: event.target.checked ? ticketSupply[index].supply : 0
    }
    setTicketSupply(newTicketSupply)
  }

  const handleTicketAmountChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newTicketSupply = [...ticketSupply]
    newTicketSupply[index] = {
      ...ticketSupply[index],
      supply: parseInt(event.target.value)
    }
    setFieldValue(ticketSupply[index].type, event.target.value)
    setTicketSupply(newTicketSupply)
  }

  const handleClickBack = () => {
    const _event: Event = {
      ...currentEvent,
      ticketSupply: values
    }
    setEvent(_event)
    setActiveStep((step) => step - 1)
  }

  const ticketTypeCountError = ticketSupply.filter((v) => v.checked).length < 1

  return (
    <>
      <FlatCard>
        <FormControl
          required
          error={ticketTypeCountError}
          component="fieldset"
          variant="standard"
        >
          <FormLabel component="legend">
            Ticket Types (select at least 1)
          </FormLabel>
          <FormGroup>
            {ticketSupply.map((item: TicketSupplySettings, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    background: `${item.checked ? "#f1f1f1" : "transparent"}`,
                    px: 2,
                    py: 1,
                    my: 1,
                    transition: "all 0.3s ease",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={item.checkName}
                        checked={Boolean(item.checked)}
                        onChange={(e) => handleChange(e, index)}
                      />
                    }
                    label={item.label}
                  />
                  {item.checked && (
                    <TextFieldWrapper
                      name={item.type}
                      type="number"
                      value={values[item.type as TicketTypeKey]}
                      label="Ticket amount"
                      size="small"
                      InputProps={{ inputProps: { min: 1 } }}
                      onChange={(e) => handleTicketAmountChange(e, index)}
                      error={
                        touched[item.type as TicketTypeKey] &&
                        Boolean(errors[item.type as TicketTypeKey])
                      }
                      helperText={
                        touched[item.type as TicketTypeKey] &&
                        errors[item.type as TicketTypeKey]
                      }
                    />
                  )}
                </Box>
              )
            })}
          </FormGroup>
          {ticketTypeCountError && (
            <FormHelperText>
              You must select at least 1 type of ticket
            </FormHelperText>
          )}
        </FormControl>
      </FlatCard>
      <ControlledStepperButtons
        handlePrevious={handleClickBack}
        handleNext={handleSubmit}
        isBackDisabled={false}
        isRightDisabled={Object.keys({}).length !== 0}
      />
    </>
  )
}

export default CreateEventStep3
