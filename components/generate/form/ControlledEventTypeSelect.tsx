import { FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import React, { useEffect, useState } from "react";
import { TICKET_TYPES_SELECTS } from "../../../constants/tickets/select";
import { TicketTypes } from "../../../interfaces/ticket/ticket.interface";

//             General Admission
// VIP
// Reserved Seating
// Multi-day Pass
// One-day Pass

interface Values {
      [key: string]: any;
      ticketType: TicketTypes
}

interface Props {
      values: Values;
      handleChange: (val: any) => void;
      touched: FormikTouched<Values>;
      errors: FormikErrors<Values>;
}

function ControlledEventTypeSelect({
      values,
      handleChange,
      touched,
      errors,
}: Props) {

      const [helperText, setHelperText] = useState('');
      useEffect(() => {
            TICKET_TYPES_SELECTS.find((type) => type.value === values.ticketType)
      }, [values])

      return (
            <FormControl fullWidth required>
                  <FormLabel>Ticket type</FormLabel>
                  <Typography variant="caption" color="gray">
                        What is your ticket for?
                  </Typography>
                  <Select
                        size='small'
                        id="demo-simple-select"
                        value={values.ticketType}
                        onChange={handleChange}
                        placeholder='Select ticket type'
                  >
                        {TICKET_TYPES_SELECTS.map((type, i) => <MenuItem key={i} value={type.value} disabled={type.isDisabled}>
                              <Stack>
                                    <Typography lineHeight={1}>{type.name}</Typography>
                                    <Typography color='gray' fontSize={12}>{type.label}</Typography>
                              </Stack>
                        </MenuItem>)}
                        <FormHelperText>{values.ticketType}</FormHelperText>
                  </Select>
            </FormControl>
      );
}

export default ControlledEventTypeSelect;
