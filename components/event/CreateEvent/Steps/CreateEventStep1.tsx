import { FormControl, FormLabel } from "@mui/material"
import { useFormik } from "formik"
import React, { useContext, useState } from "react"
import { MuiChipsInput } from "mui-chips-input"
import { CreateEventSchema } from "../../../../schema/event/createEvent.schema"
import { TextFieldWrapper } from "../../../UI/textfield/TextFieldWrapper"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import FlatCard from "../../../UI/card/FlatCard"
import { Event } from "../../../../interfaces/event/event.interface"
import { isEmpty } from "../../../../utils/common/objectChecks"

function CreateEventStep1() {
  const [eventKeywords, setEventKeywords] = React.useState<string[]>([])

  const {
    onClickBack,
    setActiveStep,
    event: currentEvent,
    setEvent,
    isFirstVisit,
    setIsFirstVisit
  } = useContext(CreateEventContext)

  const { values, handleChange, errors, touched, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: currentEvent.name || "",
        description: currentEvent.description || "",
        url: currentEvent.url || ""
      },
      validationSchema: CreateEventSchema,
      onSubmit: async (data) => {
        const updatedEvent: Event = {
          ...currentEvent,
          ...data,
          eventKeywords: eventKeywords
        }
        setEvent(updatedEvent)
        setActiveStep((step) => step + 1)
        setIsFirstVisit(false)
      }
    })

  const handleKeywordsChange = (newChips: string[]) => {
    setEventKeywords(newChips)
  }

  return (
    <>
      <FlatCard>
        <FormControl required sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Name</FormLabel>
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

        <FormControl required sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Description</FormLabel>
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

        <FormControl sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event url</FormLabel>
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
        <FormControl sx={{ width: "100%", height: 84 }}>
          <FormLabel>Event Keywords</FormLabel>
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
        handlePrevious={onClickBack}
        handleNext={handleSubmit}
        isBackDisabled={true}
        isRightDisabled={(isFirstVisit && isEmpty(touched)) || !isEmpty(errors)}
      />
    </>
  )
}

export default CreateEventStep1
