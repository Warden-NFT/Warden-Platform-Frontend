import React, { useState } from "react"
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material"
import { red } from "@mui/material/colors"
import { useEvents } from "../../../hooks/useEvents"
import { Event } from "../../../interfaces/event/event.interface"
import useAsyncEffect from "../../../hooks/useAsyncEffect"

interface Props {
  subjectOf: string
  handleChange: any
  touched?: boolean
  error?: string
}

function ControlledEventSelect({
  subjectOf,
  handleChange,
  touched,
  error
}: Props) {
  const { getEventFromOrganizer } = useEvents()
  const [events, setEvents] = useState<Event[]>([])

  useAsyncEffect(async () => {
    const _events = await getEventFromOrganizer()
    const filtered = _events?.filter((event) => event.ticketCollectionId == "")
    if (filtered) {
      setEvents(filtered)
    }
  }, [])

  return (
    <FormControl fullWidth required>
      <FormLabel id="subject-of-label">Associated Event</FormLabel>
      <Typography variant="caption" color="gray">
        What event is this ticket for?
      </Typography>
      <Select
        labelId="subject-of-label"
        id="subject-of-select"
        name="subjectOf"
        value={subjectOf}
        label="Associated Event"
        size="small"
        displayEmpty
        onChange={handleChange}
      >
        <MenuItem value="" disabled>
          <em>Select the event that this ticket is meant for</em>
        </MenuItem>
        {events.map((event, i) => (
          <MenuItem value={event._id} key={i}>
            {event.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ color: red[600] }}>
        {error && touched ? error : ""}
      </FormHelperText>
    </FormControl>
  )
}

export default ControlledEventSelect
