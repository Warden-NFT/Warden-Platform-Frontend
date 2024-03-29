import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material"
import React, { useContext, useState } from "react"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { useFormik } from "formik"
import GoogleMaps from "../../../UI/textfield/GoogleMapsAuthComplete"
import { Event } from "../../../../interfaces/event/event.interface"
import moment from "moment"
import { PlaceType } from "../../../../interfaces/event/location.interface"
import { CreateEventStep2Schema } from "../../../../schema/event/createEventStep2.schema"
import { TextFieldWrapper } from "../../../UI/textfield/TextFieldWrapper"
import { useRouter } from "next/router"
import { UserContext } from "../../../../contexts/user/UserContext"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"

function CreateEventStep2() {
  // Hooks

  const {
    event: currentEvent,
    setEvent,
    setActiveStep,
    saveEvent,
    resetEvent
  } = useContext(CreateEventContext)
  const { user } = useContext(UserContext)
  const { setShowLoadingBackdrop } = useContext(LayoutContext)
  const router = useRouter()
  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleBlur,
    handleChange
  } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
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
      location: currentEvent.location,
      online_url: currentEvent.online_url
    },
    validationSchema: CreateEventStep2Schema,
    onSubmit: async (data) => {
      const _event: Event = {
        ...currentEvent,
        ...data,
        location: locationValue
      }
      setEvent(_event)
      try {
        setShowLoadingBackdrop(true)
        if (!user || !user._id) {
          throw new Error("Invalid user. Please authenticate again.")
        }
        const savedEvent: Event | undefined = await saveEvent(_event, user._id)
        if (savedEvent && savedEvent._id) {
          resetEvent()
          setShowLoadingBackdrop(false)
          router.push(`/event/detail/${savedEvent._id}`)
        }
      } catch (error) {
        // TODO: display error when failing to get a new event
        setShowLoadingBackdrop(false)
      }
    }
  })

  // States

  const [locationValue, setLocationValue] = useState<PlaceType | null>(
    currentEvent.location ?? null
  )
  const [isOnlineEvent, setIsOnlineEvent] = useState<boolean>(
    currentEvent.online_url !== ""
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

  const handleChangeLocationMode = (
    // MUI radio button event type
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const _isOnlineEvent = value === "true"
    if (_isOnlineEvent) {
      setFieldValue("location", null)
      setLocationValue(null)
    } else setFieldValue("online_url", "")
    setIsOnlineEvent(_isOnlineEvent)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FlatCard>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <FormControl required sx={{ width: "100%", height: 108 }}>
              <FormLabel>Event Start Date</FormLabel>
              <Typography variant="caption" color="gray">
                The date and time when your event begins.
              </Typography>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    name="startDate"
                    size="small"
                    variant="outlined"
                    sx={{ maxWidth: "400px" }}
                    {...props}
                    error={Boolean(errors.startDate)}
                    helperText={errors.startDate}
                  />
                )}
                value={values.startDate}
                onChange={(newValue) => {
                  if (!newValue) return
                  setFieldValue(
                    "startDate",
                    moment(newValue, "DD/MM/YYYY HH:mm:ss").toDate()
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl required sx={{ width: "100%", height: 108 }}>
              <FormLabel>Event End Date</FormLabel>
              <Typography variant="caption" color="gray">
                The date and time when your event ends.
              </Typography>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField
                    name="endDate"
                    size="small"
                    variant="outlined"
                    sx={{ maxWidth: "400px" }}
                    {...props}
                    error={Boolean(errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                  />
                )}
                value={values.endDate}
                onChange={(newValue) => {
                  if (!newValue) return
                  setFieldValue(
                    "endDate",
                    moment(newValue, "DD/MM/YYYY HH:mm:ss").toDate()
                  )
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <FormControl required sx={{ width: "100%", height: 108 }}>
          <FormLabel>Event Door Time</FormLabel>
          <Typography variant="caption" color="gray">
            The date and time when your event starts admitting event attendees.
          </Typography>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                name="doorTime"
                size="small"
                variant="outlined"
                sx={{ maxWidth: "400px" }}
                {...props}
                error={Boolean(errors.doorTime)}
                helperText={errors.doorTime}
              />
            )}
            value={values.doorTime}
            onChange={(newValue) => {
              if (!newValue) return
              setFieldValue(
                "doorTime",
                moment(newValue, "DD/MM/YYYY HH:mm:ss").toDate()
              )
            }}
          />
        </FormControl>

        <FormControl required sx={{ width: "100%", height: 184 }}>
          <FormLabel>Event Location</FormLabel>
          <Typography variant="caption" color="gray">
            Google Maps location or online meeting URL
          </Typography>
          <Box>
            <RadioGroup
              value={isOnlineEvent}
              onChange={handleChangeLocationMode}
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="I'm hosting an on-site event"
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="I'm hosting an online event"
              />
            </RadioGroup>
          </Box>
          <Box sx={{ my: 1 }} />
          {!isOnlineEvent && (
            <GoogleMaps
              name="location"
              locationValue={locationValue}
              setLocationValue={handleLocationSelect}
              hasError={Boolean(errors.location)}
              errorMessage={errors.location}
            />
          )}

          {isOnlineEvent && (
            <TextFieldWrapper
              name="online_url"
              value={values.online_url}
              onChange={handleChange}
              onBlur={() => {
                handleBlur("online_url")
                if (values.online_url === "https://")
                  setFieldValue("online_url", "", true)
              }}
              onFocus={() => {
                setFieldValue("online_url", "https://", false)
              }}
              id="event-online_url-input"
              data-testid="event-online_url-input"
              placeholder="ex: http://your-event.com"
              variant="outlined"
              size="small"
              type="text"
              error={Boolean(errors.online_url)}
              helperText={errors.online_url}
            />
          )}
        </FormControl>
      </FlatCard>
      <ControlledStepperButtons
        handlePrevious={handleClickBack}
        handleNext={handleSubmit}
        nextLabel="Save and Continue"
        isBackDisabled={false}
        // isRightDisabled={(false && isEmpty(touched)) || !isEmpty(errors)}
      />
    </LocalizationProvider>
  )
}

export default CreateEventStep2
