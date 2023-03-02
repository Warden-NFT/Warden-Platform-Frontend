import { Box, Divider, Typography } from "@mui/material"
import { useFormik } from "formik"
import React, { useContext } from "react"
import { MarketContext } from "../../../../contexts/market/MarketContext"
import { SellTicketContext } from "../../../../contexts/market/SellTicketContext"
import { TicketTypeKey } from "../../../../interfaces/event/event.interface"
import { SellTicketFormSchema } from "../../../../schema/market/sellTicket.schema"
import ContainedButton from "../../../UI/button/ContainedButton"
import { ImageWithFallback } from "../../../UI/image/ImageWithFallback"
import ControlledCurrencyPriceSelect from "../../../UI/input/ControlledCurrencyPriceSelect"

function SellTicketStep2() {
  const { selectedTicket, setActiveStep } = useContext(SellTicketContext)
  const { marketTickets } = useContext(MarketContext)

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      resalePrice: 0,
      currency: "ETH",
      minResalePrice:
        marketTickets?.ticketCollection.ticketPrice[
          TicketTypeKey[
            selectedTicket?.ticketType ?? "GENERAL"
          ] as TicketTypeKey
        ]?.min ?? 0,
      maxResalePrice:
        marketTickets?.ticketCollection.ticketPrice[
          TicketTypeKey[
            selectedTicket?.ticketType ?? "GENERAL"
          ] as TicketTypeKey
        ]?.max ?? 0
    },
    validationSchema: SellTicketFormSchema,
    onSubmit: (data) => {
      console.log(data)
    }
  })

  if (!selectedTicket) return null
  return (
    <Box>
      <Box sx={{ my: 2, width: "100%" }} />
      <Typography variant="h6">Set your price</Typography>
      <Box sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{selectedTicket.name}</Typography>
        <ImageWithFallback
          src={selectedTicket.ticketMetadata[0].image}
          width={40}
          height={40}
          alt={selectedTicket.name}
          style={{ borderRadius: "8px" }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <ControlledCurrencyPriceSelect
        label="Ticket resale price"
        labelDescription={`The event organizer has allowed the resale price between ${values.minResalePrice} and ${values.maxResalePrice} ${marketTickets?.ticketCollection.currency}`}
        amountName="resalePrice"
        amountValue={values.resalePrice ?? 0}
        handleChange={handleChange}
        amountError={errors && errors?.resalePrice}
        currencyName="currency"
        currencyValue={values.currency}
      />
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ContainedButton
          label="Back"
          variant="outlined"
          disabled={!selectedTicket}
          onClick={() => setActiveStep((value) => value - 1)}
        />
        <ContainedButton
          label="Next"
          variant="contained"
          disabled={!selectedTicket}
          onClick={handleSubmit}
        />
      </Box>
    </Box>
  )
}

export default SellTicketStep2
