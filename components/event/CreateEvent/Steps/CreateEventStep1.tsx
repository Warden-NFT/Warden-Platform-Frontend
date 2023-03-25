import { FormControl, FormLabel, Typography } from "@mui/material"
import { useFormik } from "formik"
import React, { useContext, useState } from "react"
import { MuiChipsInput } from "mui-chips-input"
import { CreateEventStep1Schema } from "../../../../schema/event/createEventStep1.schema"
import { TextFieldWrapper } from "../../../UI/textfield/TextFieldWrapper"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import FlatCard from "../../../UI/card/FlatCard"
import { Event } from "../../../../interfaces/event/event.interface"
import { isEmpty } from "../../../../utils/common/missing"
import { useRouter } from "next/router"
import ContainedButton from "../../../UI/button/ContainedButton"
import { Box } from "@mui/system"
import Image from "next/image"

function CreateEventStep1() {
  // Hooks

  const {
    setActiveStep,
    event: currentEvent,
    setEvent,
    isFirstVisit,
    setIsFirstVisit,
    resetEvent
  } = useContext(CreateEventContext)

  const router = useRouter()

  const { values, handleChange, errors, touched, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: currentEvent.name || "",
        description: currentEvent.description || "",
        url: currentEvent.url || ""
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: CreateEventStep1Schema,
      onSubmit: async (data) => {
        const updatedEvent: Event = {
          ...currentEvent,
          ...data,
          eventKeywords: eventKeywords,
          image: eventImage
        }
        setEvent(updatedEvent)
        setActiveStep((step) => step + 1)
        setIsFirstVisit(false)
      }
    })

  // States

  const [eventKeywords, setEventKeywords] = useState<string[]>(
    currentEvent.eventKeywords ?? []
  )
  const [eventImage, setEventImage] = useState<File>(currentEvent.image as File)

  // Event handlers

  const handleCancel = () => {
    resetEvent()
    router.push("/event/")
  }

  const handleKeywordsChange = (newChips: string[]) => {
    setEventKeywords(newChips)
  }

  const handleEventImageChange = (e: any) => {
    setEventImage(e.target.files[0])
  }

  return (
    <>
      <FlatCard>
        <FormControl required sx={{ width: "100%", height: 96 }}>
          <FormLabel>Event Name</FormLabel>
          <Typography variant="caption" color="gray">
            The name of your event. Searchable in the Warden Marketplace.
          </Typography>
          <TextFieldWrapper
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur("name")}
            id="event-name-input"
            data-testid="event-name-input"
            placeholder="ex: Event Name"
            variant="outlined"
            size="small"
            type="text"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </FormControl>

        <FormControl required sx={{ width: "100%", height: 96 }}>
          <FormLabel>Event Description</FormLabel>
          <Typography variant="caption" color="gray">
            Desription of your project. Searchable in Warden Marketplace.
          </Typography>
          <TextFieldWrapper
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur("description")}
            id="event-description-input"
            data-testid="event-description-input"
            placeholder="ex: Event description"
            variant="outlined"
            size="small"
            type="text"
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
        </FormControl>

        <FormControl sx={{ width: "100%", minHeight: 96 }}>
          <FormLabel>Event Image</FormLabel>
          <Typography variant="caption" color="gray">
            Cover photo for your event.
          </Typography>
          <Box sx={{ height: 12 }} />
          <Box sx={{ maxWidth: "100%" }}>
            {eventImage && (
              <Image
                src={URL.createObjectURL(eventImage)}
                width={1280}
                height={200}
                alt="event image"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            )}
          </Box>
          <ContainedButton
            variant="outlined"
            width="200px"
            component="label"
            label="Upload"
          >
            <Typography>Select Image</Typography>
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleEventImageChange}
            />
          </ContainedButton>
        </FormControl>

        <FormControl sx={{ width: "100%", height: 96 }}>
          <FormLabel>Event url</FormLabel>
          <Typography variant="caption" color="gray">
            Optional: an external URL to link to your event
          </Typography>
          <TextFieldWrapper
            name="url"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur("url")}
            id="event-url-input"
            data-testid="event-url-input"
            placeholder="ex: Event url"
            variant="outlined"
            size="small"
            type="text"
            error={touched.url && Boolean(errors.url)}
            helperText={touched.url && errors.url}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", height: 96 }}>
          <FormLabel>Event Keywords</FormLabel>
          <Typography variant="caption" color="gray">
            Optional: Provide keywords for your event. Searchable in the Warden
            Marketplace.
          </Typography>
          <MuiChipsInput
            value={
              eventKeywords.length ? eventKeywords : currentEvent.eventKeywords
            }
            onChange={handleKeywordsChange}
            size="small"
          />
        </FormControl>
      </FlatCard>
      <ControlledStepperButtons
        handlePrevious={handleCancel}
        handleNext={handleSubmit}
        isRightDisabled={(isFirstVisit && isEmpty(touched)) || !isEmpty(errors)}
        backLabel="Cancel"
      />
    </>
  )
}

export default CreateEventStep1
