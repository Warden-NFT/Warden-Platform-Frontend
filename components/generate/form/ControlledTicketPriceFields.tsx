import { Stack } from "@mui/material"
import React from "react"
import { SupportedDigitalCurrency } from "../../../interfaces/currency/currency.interface"
import ControlledCurrencyPriceSelect from "../../UI/input/ControlledCurrencyPriceSelect"

interface Props {
  values: [number | undefined, number | undefined, number | undefined]
  names: [string, string, string]
  error?: any
  touched: boolean
  handleChange: any
  currencyName: string
  currencyValue: SupportedDigitalCurrency
  currencyError?: string
  currencyTouched: boolean
  enableResale: boolean
}

const LABELS = [
  "Ticket price",
  "Ticket's minimum resale price",
  "Ticket's maximum resale price"
]
const LABELS_DESC = [
  "Set your ticket price",
  "Set your minimum resale price",
  "Set your maximum resale price"
]

function ControlledTicketPriceFields({
  values,
  names,
  error,
  touched,
  handleChange,
  currencyName,
  currencyValue,
  currencyError,
  currencyTouched,
  enableResale
}: Props) {
  return (
    <Stack spacing={2}>
      {/* <div>{JSON.stringify(error)}</div> */}
      <ControlledCurrencyPriceSelect
        label={LABELS[0]}
        labelDescription={LABELS_DESC[0]}
        amountName={names[0]}
        amountValue={values[0] ?? 0}
        handleChange={handleChange}
        amountError={error && error.default}
        amountTouched={touched}
        currencyName={currencyName}
        currencyValue={currencyValue}
        currencyError={currencyTouched && Boolean(currencyError)}
        currencyTouched={currencyTouched}
      />
      {enableResale && (
        <>
          <ControlledCurrencyPriceSelect
            label={LABELS[1]}
            labelDescription={LABELS_DESC[1]}
            amountName={names[1]}
            amountValue={values[1] ?? 0}
            handleChange={handleChange}
            amountError={error && error?.min}
            amountTouched={touched}
            currencyName={currencyName}
            currencyValue={currencyValue}
            currencyError={currencyTouched && Boolean(currencyError)}
            currencyTouched={currencyTouched}
          />
          <ControlledCurrencyPriceSelect
            label={LABELS[2]}
            labelDescription={LABELS_DESC[2]}
            amountName={names[2]}
            amountValue={values[2] ?? 0}
            handleChange={handleChange}
            amountError={error && error.max}
            amountTouched={touched}
            currencyName={currencyName}
            currencyValue={currencyValue}
            currencyError={currencyTouched && Boolean(currencyError)}
            currencyTouched={currencyTouched}
          />
        </>
      )}
    </Stack>
  )
}

export default ControlledTicketPriceFields
