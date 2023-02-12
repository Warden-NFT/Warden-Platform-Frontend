import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Tooltip
} from "@mui/material"
import React from "react"
import { TICKET_TYPES } from "../../../constants/event/event"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"

interface Props {
  values: boolean[]
  handleChange: any
  names: string[]
}

function ControlledTicketTypeCheckBoxes({
  values,
  handleChange,
  names
}: Props) {
  return (
    <Stack direction="row">
      {TICKET_TYPES.map((ticket, i) => (
        <Stack key={i} direction="row" alignItems="center" marginRight={4}>
          <FormControlLabel
            control={
              <Checkbox
                name={names[i]}
                onChange={handleChange}
                checked={values[i]}
                value={ticket.type}
                disabled={ticket.disabled}
              />
            }
            label={ticket.type}
          />
          <Tooltip title={ticket.label}>
            <IconButton aria-label={ticket.type} color="secondary" size="small">
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}
    </Stack>
  )
}

export default ControlledTicketTypeCheckBoxes
