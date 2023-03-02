import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material"
import { grey } from "@mui/material/colors"
import React, { useContext } from "react"
import { SellTicketContext } from "../../../../contexts/market/SellTicketContext"
import { MarketTickets } from "../../../../interfaces/market/marketEvent.interface"
import ContainedButton from "../../../UI/button/ContainedButton"
import { ImageWithFallback } from "../../../UI/image/ImageWithFallback"

type Props = {
  ownedTickets: MarketTickets
}

function SellTicketStep1({ ownedTickets }: Props) {
  const { selectedTicket, setSelectedTicket, setActiveStep } =
    useContext(SellTicketContext)

  // computed value
  const getAllOwnedTickets = (ownedTickets: MarketTickets) => {
    return [
      ...(ownedTickets.ticketCollection.tickets.general ?? []),
      ...(ownedTickets.ticketCollection.tickets.vip ?? []),
      ...(ownedTickets.ticketCollection.tickets.reservedSeat ?? [])
    ]
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ticketId = (event.target as HTMLInputElement).value
    const _selectedTicket = getAllOwnedTickets(ownedTickets).find(
      (ticket) => ticket._id === ticketId
    )
    setSelectedTicket(_selectedTicket)
  }

  const handleNext = () => {
    setActiveStep((value) => value + 1)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "spce-between"
      }}
    >
      <Box>
        <Box sx={{ my: 2 }} />
        <Typography variant="h6">Select the tickets to sell</Typography>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={selectedTicket?._id ?? ""}
          onChange={handleChange}
        >
          {getAllOwnedTickets(ownedTickets).map((ticket, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                ...(selectedTicket?._id === ticket._id
                  ? { background: grey[100], p: 1, m: 0 }
                  : { p: 1, m: 0 })
              }}
            >
              <FormControlLabel
                value={ticket._id}
                control={<Radio />}
                label={ticket.name}
              />
              <ImageWithFallback
                src={ticket.ticketMetadata[0].image}
                width={40}
                height={40}
                alt={ticket.name}
                style={{ borderRadius: "8px" }}
              />
            </Box>
          ))}
        </RadioGroup>
        <Box sx={{ my: 8 }} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ContainedButton
          label="Next"
          variant="contained"
          disabled={!selectedTicket}
          onClick={handleNext}
        />
      </Box>
    </Box>
  )
}

export default SellTicketStep1
