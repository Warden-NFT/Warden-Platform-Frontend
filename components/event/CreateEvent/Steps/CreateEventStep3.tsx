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

function CreateEventStep3() {
  // Hooks
  const {
    event: currentEvent,
    setEvent,
    setActiveStep
  } = useContext(CreateEventContext)
  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      general: currentEvent.ticketSupply.general,
      vip: currentEvent.ticketSupply.vip,
      reservedSeat: currentEvent.ticketSupply.reservedSeat
    },
    validationSchema: CreateEventStep3Schema,
    onSubmit: async (data) => {
      console.log(data)
      const _event: Event = {
        ...currentEvent,
        ticketSupply: data
      }
      setEvent(_event)
    }
  })

  // States

  const [ticketSupply, setTicketSupply] = useState<TicketSupplySettings[]>([
    {
      type: "general",
      checked: currentEvent.ticketSupply.general > 0 || true,
      supply: 0,
      label: "General Admission Tickets"
    },
    {
      type: "vip",
      checked: currentEvent.ticketSupply.vip > 0 || false,
      supply: 0,
      label: "VIP Tickets"
    },
    {
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
    newTicketSupply[index] = {
      ...ticketSupply[index],
      checked: event.target.checked
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
