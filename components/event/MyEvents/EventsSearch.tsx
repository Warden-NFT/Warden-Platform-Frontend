import { Stack, InputLabel, TextField, Box } from "@mui/material"

import React from "react"
import { Event } from "../../../interfaces/event/event.interface"

type Props = {
  events: Event[]
  searchMyEvents: (search: string) => void
}

function EventsSearch({ events, searchMyEvents }: Props) {
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    searchMyEvents(e.target.value)
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
      <Box>
        <InputLabel>Search Events</InputLabel>
        <TextField
          onChange={(e) => handleSearchChange(e)}
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
