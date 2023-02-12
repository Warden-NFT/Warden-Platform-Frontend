import {
  FormControl,
  FormLabel,
  MenuItem,
  TextField,
  Typography
} from "@mui/material"
import React from "react"
import { SUPPORTED_DIGITAL_CURRENCIES } from "../../../constants/currencies/digital"

interface Props {
  label: string
  labelDescription: string
  amountName: string
  amountValue: number
  handleChange: any
  amountError?: boolean
  amountTouched?: boolean
  currencyName?: string
  currencyValue: string
  currencyError?: boolean
  currencyTouched?: boolean
  selectDisabled?: boolean
}

function ControlledCurrencyPriceSelect({
  label,
  labelDescription,
  amountName,
  amountValue,
  amountTouched,
  amountError,
  handleChange,
  currencyName,
  currencyValue,
  currencyError,
  currencyTouched,
  selectDisabled
}: Props) {
  return (
    <FormControl required>
      <FormLabel>{label}</FormLabel>
      <Typography variant="caption" color="gray">
        {labelDescription}
      </Typography>
      <TextField
        name={amountName}
        value={amountValue}
        onChange={handleChange}
        id={`${amountName}-input`}
        data-testid={`${amountName}-input`}
        type="number"
        variant="outlined"
        size="small"
        error={amountError != null}
        helperText={amountTouched && amountError ? amountError : undefined}
        InputProps={{
          endAdornment: (
            <TextField
              disabled={selectDisabled}
              name={currencyName}
              variant="filled"
              size="small"
              id={`${currencyName}-input`}
              select
              value={currencyValue}
              onChange={handleChange}
              error={currencyError != null}
              helperText={
                currencyTouched && currencyError ? currencyError : undefined
              }
              sx={{
                width: "300px",
                backgroundColor: "white",
                marginLeft: 4,
                marginRight: 0,
                "&.Mui-disabled": {
                  color: "orange"
                }
              }}
            >
              {SUPPORTED_DIGITAL_CURRENCIES.map((currency, key) => (
                <MenuItem key={key} value={currency.symbol}>
                  {currency.name}
                </MenuItem>
              ))}
            </TextField>
          )
        }}
      />
    </FormControl>
  )
}

export default ControlledCurrencyPriceSelect
