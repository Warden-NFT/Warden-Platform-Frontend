import {
  Stack,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Box
} from "@mui/material"

import React, { useState } from "react"
import { SORT_BY } from "../../../constants/search/sort"

function EventsSearch() {
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.lastCreated)
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
          sx={{ width: "400px" }}
        />
      </Box>
      <Box>
        <InputLabel>Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          size="small"
          onChange={(e) => setSortBy(e.target.value as SORT_BY)}
        >
          <MenuItem value={SORT_BY.lastCreated}>Last Created</MenuItem>
          <MenuItem value={SORT_BY.alphabetical}>Alphabetical</MenuItem>
        </Select>
      </Box>
    </Stack>
  )
}

export default EventsSearch
