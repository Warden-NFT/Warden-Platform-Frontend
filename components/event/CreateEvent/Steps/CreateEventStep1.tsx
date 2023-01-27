import { FormControl, FormLabel, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useFormik } from "formik"
import React, { useEffect } from "react"
import { MuiChipsInput } from "mui-chips-input"
import { CreateEventSchema } from "../../../../schema/event/createEvent.schema"

function CreateEventStep1() {
  // Page 1
  //   name: string
  //   description: string
  //   image: string
  //   url: string
  //   eventKeywords: [string]

  const [eventKeywords, setEventKeywords] = React.useState<string[]>([])

  const { values, handleChange, errors, touched, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        url: ""
      },
      validationSchema: CreateEventSchema, // TODO
      onSubmit: async (data) => {
        // TODO
      }
    })

  const handleKeywordsChange = (newChips: string[]) => {
    setEventKeywords(newChips)
  }

  return (
    <Box>
      <FormControl required sx={{ width: "100%", height: 84 }}>
        <FormLabel>Event Name</FormLabel>
        <TextField
          name="name"
          value={values.name}
          onChange={handleChange}
          onKeyUp={handleBlur("name")}
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
        <TextField
          name="description"
          value={values.description}
          onChange={handleChange}
          onKeyUp={handleBlur("description")}
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
        <TextField
          name="url"
          value={values.url}
          onChange={handleChange}
          onKeyUp={handleBlur("url")}
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
          value={eventKeywords}
          onChange={handleKeywordsChange}
          size="small"
        />
      </FormControl>
    </Box>
  )
}

export default CreateEventStep1
