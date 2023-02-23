import { LocationOnOutlined, Search } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers"
import { FormControl, InputAdornment, TextField } from "@mui/material"
import { useFormik } from "formik"
import moment from "moment"
import React, { useContext } from "react"
import ContainerCard from "../../UI/card/ContainerCard"
import { TextFieldWrapper } from "../../UI/textfield/TextFieldWrapper"
import ContainedButton from "../../UI/button/ContainedButton"
import { MarketContext } from "../../../contexts/market/MarketContext"

function EventSearchBar() {
  const { searchEvents } = useContext(MarketContext)
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        location: "",
        startDate: null,
        endDate: null,
        searchTerm: ""
      },
      enableReinitialize: true,
      onSubmit: async (data) => {
        const payload = {
          location: data.location || undefined,
          startDate: data.startDate
            ? moment(data.startDate, "DD/MM/YYYY HH:mm:ss").format(
              "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            )
            : undefined,
          endDate: data.endDate
            ? moment(data.endDate, "DD/MM/YYYY HH:mm:ss").format(
              "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
            )
            : undefined,
          searchTerm: data.searchTerm || undefined
        }
        await searchEvents(payload)
      }
    })

  return (
    <form>
      <ContainerCard sx={{ height: 40, display: "flex", gap: 2 }}>
        <TextFieldWrapper
          name="location"
          label="Location"
          value={values.location}
          onChange={handleChange}
          id="location-input"
          data-testid="location-input"
          placeholder="Location"
          variant="outlined"
          size="small"
          multiline
          maxRows={3}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LocationOnOutlined />
              </InputAdornment>
            )
          }}
          error={errors.location != null}
          helperText={touched.location ? errors.location : undefined}
        />

        <FormControl required sx={{ width: "100%", height: 84, maxWidth: 180 }}>
          <DatePicker
            renderInput={(props) => (
              <TextField
                name="startDate"
                size="small"
                variant="outlined"
                {...props}
                error={Boolean(errors.startDate)}
                helperText={errors.startDate}
              />
            )}
            label="Event start date"
            value={values.startDate}
            onChange={(newValue) => {
              if (!newValue) setFieldValue("endDate", null)
              setFieldValue(
                "startDate",
                moment(newValue, "DD/MM/YYYY HH:mm:ss").toDate()
              )
            }}
          />
        </FormControl>

        <FormControl required sx={{ width: "100%", height: 84, maxWidth: 180 }}>
          <DatePicker
            renderInput={(props) => (
              <TextField
                name="endDate"
                size="small"
                variant="outlined"
                {...props}
                error={Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />
            )}
            label="Event end date"
            value={values.endDate}
            onChange={(newValue) => {
              if (!newValue) setFieldValue("endDate", null)
              setFieldValue(
                "endDate",
                moment(newValue, "DD/MM/YYYY HH:mm:ss").toDate()
              )
            }}
          />
        </FormControl>

        <FormControl sx={{ display: "flex", flex: 1 }}>
          <TextFieldWrapper
            name="searchTerm"
            label="searchTerm"
            value={values.searchTerm}
            onChange={handleChange}
            id="searchTerm-input"
            data-testid="searchTerm-input"
            placeholder="searchTerm"
            variant="outlined"
            size="small"
            error={errors.searchTerm != null}
            helperText={touched.searchTerm ? errors.searchTerm : undefined}
          />
        </FormControl>

        <ContainedButton
          type="submit"
          label="Search"
          variant="contained"
          icon={<Search />}
          onClick={handleSubmit}
        />
      </ContainerCard>
    </form>
  )
}

export default EventSearchBar
