import { Stack, InputLabel, TextField, Box } from "@mui/material"

import React from "react"

function EventsSearch() {
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // TODO
    console.log(e.currentTarget.value)
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
      <Box>
        <InputLabel>Search Events</InputLabel>
        <TextField
          onChange={handleSearchChange}
          id="event-search-input"
          data-testid="event-search-input"
          placeholder="ex: My Concert"
          variant="outlined"
          size="small"
          sx={{ width: "280px" }}
        />
      </Box>
    </Stack>
  )
}

export default EventsSearch
