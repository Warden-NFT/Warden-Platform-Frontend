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
import moment from "moment"
import { PlaceType } from "../../../../interfaces/event/location.interface"

function CreateEventStep2() {
  const {
    event: currentEvent,
    setEvent,
    setActiveStep
  } = useContext(CreateEventContext)
  const { values, handleChange, errors, touched, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        startDate: currentEvent.startDate
          ? moment(currentEvent.startDate).toDate()
          : null,
        endDate: currentEvent.endDate
          ? moment(currentEvent.endDate).toDate()
          : null,
        doorTime: currentEvent.doorTime
          ? moment(currentEvent.doorTime).toDate()
          : null,
        location: currentEvent.location
      },
      // validationSchema: CreateEventSchema,
      onSubmit: async (data) => {
        const _event: Event = {
          ...currentEvent,
          ...data,
          location: locationValue
        }
        setEvent(_event)
        setActiveStep((step) => step + 1)
      }
    })
  const [locationValue, setLocationValue] = useState<PlaceType | null>(
    currentEvent.location ?? null
  )

  const { onClickBack } = useContext(CreateEventContext)

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
            value={values.startDate}
            onChange={(newValue) => {
              if (!newValue) return
              setFieldValue("startDate", moment(newValue).toDate())
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
            value={values.endDate}
            onChange={(newValue) => {
              if (!newValue) return
              setFieldValue("endDate", moment(newValue).toDate())
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
            value={values.doorTime}
            onChange={(newValue) => {
              if (!newValue) return
              setFieldValue("doorTime", moment(newValue).toDate())
            }}
          />
        </FormControl>

        <FormControl sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Location</FormLabel>
          <GoogleMaps
            name="location"
            locationValue={locationValue}
            setLocationValue={setLocationValue}
          />
        </FormControl>
      </FlatCard>
      <ControlledStepperButtons
        handlePrevious={onClickBack}
        handleNext={handleSubmit}
        isBackDisabled={false}
        isRightDisabled={(false && isEmpty(touched)) || !isEmpty(errors)}
        nextLabel="Save and Continue"
      />
    </LocalizationProvider>
  )
}

export default CreateEventStep2
