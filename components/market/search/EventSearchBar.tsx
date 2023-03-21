import { LocationOnOutlined, Search } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers"
import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  TextField
} from "@mui/material"
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
        if (
          !data.location &&
          !data.startDate &&
          !data.endDate &&
          !data.searchTerm
        ) {
          return
        }
        await searchEvents(payload)
      }
    })

  return (
    <form>
      <ContainerCard sx={{ display: "flex" }}>
        <Grid container gap={0} spacing={2}>
          <Grid item xs={6} lg={4} sx={{ height: 40 }}>
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
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6} lg={4} sx={{ height: 40 }}>
            <FormControl required sx={{ width: "100%", height: 84 }}>
              <DatePicker
                renderInput={(props) => (
                  <TextField
                    name="startDate"
                    size="small"
                    variant="outlined"
                    {...props}
                    error={Boolean(errors.startDate)}
                    helperText={errors.startDate}
                    sx={{ width: "100% !important" }}
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
          </Grid>
          <Grid item xs={6} lg={4}>
            <FormControl required sx={{ width: "100%", height: 40 }}>
              <DatePicker
                renderInput={(props) => (
                  <TextField
                    name="endDate"
                    size="small"
                    variant="outlined"
                    {...props}
                    error={Boolean(errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                    sx={{ width: "100%" }}
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
          </Grid>

          <Grid item xs={6} lg={10}>
            <Box sx={{ display: "flex" }}>
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
                  helperText={
                    touched.searchTerm ? errors.searchTerm : undefined
                  }
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ContainedButton
              type="submit"
              label="Search"
              variant="contained"
              icon={<Search />}
              width="120px"
              onClick={handleSubmit}
              sx={{ height: 40 }}
            />
          </Grid>
        </Grid>
      </ContainerCard>
    </form>
  )
}

export default EventSearchBar
