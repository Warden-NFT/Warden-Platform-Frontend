import { Box, MenuItem, Select } from "@mui/material"
import React, { useContext, useState } from "react"
import { MarketContext } from "../../../contexts/market/MarketContext"
import { EVENT_STATUS_TYPE } from "../../../interfaces/event/event.interface"
import { TextFieldWrapper } from "../../UI/textfield/TextFieldWrapper"

function OrganizerEventSearch() {
  const { searchOrganizerEvents } = useContext(MarketContext)
  const [sortBy, setSortBy] = useState<EVENT_STATUS_TYPE>(
    EVENT_STATUS_TYPE.NOT_STARTED
  )
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextFieldWrapper
        label="Search events"
        onChange={(e) => searchOrganizerEvents(e.target.value, sortBy)}
        sx={{ width: "100%" }}
      />
      <Select
        labelId="organizer-event-search-by"
        id="organizer-event-search-by"
        value={sortBy}
        size="medium"
        sx={{ width: 200 }}
        onChange={(e) => setSortBy(e.target.value as EVENT_STATUS_TYPE)}
      >
        <MenuItem value={EVENT_STATUS_TYPE.NOT_STARTED}>Upcoming</MenuItem>
        <MenuItem value={EVENT_STATUS_TYPE.EVENT_ENDED}>Event Ended</MenuItem>
      </Select>
    </Box>
  )
}

export default OrganizerEventSearch
