import { FormControl, FormLabel, TextField } from "@mui/material"
import { useFormik } from "formik"
import React from "react"
import { string } from "yup"
import FlatCard from "../../../UI/card/FlatCard"

function CreateEventStep1() {
  // Page 1
  //   name: string
  //   description: string
  //   image: string
  //   url: string
  //   eventKeywords: [string]

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
      url: string,
      eventKeywords: []
    },
    validationSchema: {}, // TODO
    onSubmit: async (data) => {
      // TODO
    }
  })

  return (
    <FlatCard>
      <FormControl required sx={{ width: "100%", height: 84 }}>
        <FormLabel>Event Name</FormLabel>
        <TextField
          name="password"
          value={values.name}
          onChange={handleChange}
          id="event-name-input"
          data-testid="event-name-input"
          placeholder="ex: Event Name"
          variant="outlined"
          size="small"
          type="text"
          error={errors.name != null}
          helperText={touched.name ? errors.name : undefined}
        />
      </FormControl>
    </FlatCard>
  )
}

export default CreateEventStep1
