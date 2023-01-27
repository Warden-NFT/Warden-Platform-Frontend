import { Box, FormControl, FormLabel, TextField } from "@mui/material"
import React, { useContext, useState } from "react"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { useFormik } from "formik"
import { isEmpty } from "../../../../utils/common/objectChecks"
import GoogleMaps from "../../../UI/textfield/GoogleMapsAuthComplete"
import { Event } from "../../../../interfaces/event/event.interface"

function CreateEventStep2() {
  // Page 2
  //   doorTime: Date
  //   location: string
  //   startDate: Date
  //   endDate: Date
  const [eventStartDate, setEventStartDate] = useState<Date | null>(null)
  const [eventEndDate, setEventEndDate] = useState<Date | null>(null)
  const [eventDoorTime, setEventDoorTime] = useState<Date | null>(null)

  const { event: currentEvent, setEvent } = useContext(CreateEventContext)
  const { values, handleChange, errors, touched, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        startDate: null,
        endDate: null,
        doorTime: null,
        location: ""
      },
      // validationSchema: CreateEventSchema,
      onSubmit: async (data) => {
        const _event: Event = { ...currentEvent, ...data }
        setEvent(_event)
      }
    })

  const { onClickBack, onClickNext } = useContext(CreateEventContext)
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FlatCard>
        <FormControl sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Start Date</FormLabel>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                name="startDate"
                size="small"
                variant="outlined"
                {...props}
              />
            )}
            value={eventStartDate}
            onChange={(newValue) => {
              if (newValue !== null) setEventStartDate(newValue)
            }}
          />
        </FormControl>

        <FormControl sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event End Date</FormLabel>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                name="endDate"
                size="small"
                variant="outlined"
                {...props}
              />
            )}
            value={eventEndDate}
            onChange={(newValue) => {
              if (newValue !== null) setEventEndDate(newValue)
            }}
          />
        </FormControl>

        <FormControl sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Door Time</FormLabel>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                name="doorTime"
                size="small"
                variant="outlined"
                {...props}
              />
            )}
            value={eventDoorTime}
            onChange={(newValue) => {
              setEventDoorTime(newValue)
            }}
          />
        </FormControl>

        <FormControl sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Location</FormLabel>
          <GoogleMaps />
        </FormControl>
      </FlatCard>
      <ControlledStepperButtons
        handlePrevious={onClickBack}
        handleNext={handleSubmit}
        isBackDisabled={false}
        isRightDisabled={(false && isEmpty(touched)) || !isEmpty(errors)}
      />
    </LocalizationProvider>
  )
}

export default CreateEventStep2
