import { FormControl, FormLabel, TextField } from "@mui/material"
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
import { CreateEventStep2Schema } from "../../../../schema/event/createEventStep2.schema"

function CreateEventStep2() {
  // Hooks

  const {
    event: currentEvent,
    setEvent,
    setActiveStep
  } = useContext(CreateEventContext)
  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
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
    validationSchema: CreateEventStep2Schema,
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

  // States

  const [locationValue, setLocationValue] = useState<PlaceType | null>(
    currentEvent.location ?? null
  )

  // Event handlers

  const handleClickBack = () => {
    const _event: Event = {
      ...currentEvent,
      ...values,
      location: locationValue
    }
    setEvent(_event)
    setActiveStep((step) => step - 1)
  }

  const handleLocationSelect = (value: PlaceType | null) => {
    setLocationValue(value)
    setFieldValue("location", value)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FlatCard>
        <FormControl required sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Start Date</FormLabel>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                name="startDate"
                size="small"
                variant="outlined"
                {...props}
                error={touched.startDate && Boolean(errors.startDate)}
                helperText={touched.startDate && errors.startDate}
              />
            )}
            value={values.startDate}
            onChange={(newValue) => {
              if (!newValue) return
              setFieldValue("startDate", moment(newValue).toDate())
            }}
          />
        </FormControl>

        <FormControl required sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event End Date</FormLabel>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                name="endDate"
                size="small"
                variant="outlined"
                {...props}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />
            )}
            value={values.endDate}
            onChange={(newValue) => {
              if (!newValue) return
              setFieldValue("endDate", moment(newValue).toDate())
            }}
          />
        </FormControl>

        <FormControl required sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Door Time</FormLabel>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                name="doorTime"
                size="small"
                variant="outlined"
                {...props}
                error={touched.doorTime && Boolean(errors.doorTime)}
                helperText={touched.doorTime && errors.doorTime}
              />
            )}
            value={values.doorTime}
            onChange={(newValue) => {
              if (!newValue) return
              setFieldValue("doorTime", moment(newValue).toDate())
            }}
          />
        </FormControl>

        <FormControl required sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Location</FormLabel>
          <GoogleMaps
            name="location"
            locationValue={locationValue}
            setLocationValue={handleLocationSelect}
            hasError={touched.location && Boolean(errors.location)}
            errorMessage={touched.location ? errors.location : undefined}
          />
        </FormControl>
      </FlatCard>
      <ControlledStepperButtons
        handlePrevious={handleClickBack}
        handleNext={handleSubmit}
        isBackDisabled={false}
        isRightDisabled={(false && isEmpty(touched)) || !isEmpty(errors)}
      />
    </LocalizationProvider>
  )
}

export default CreateEventStep2
