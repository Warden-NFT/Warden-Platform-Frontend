import React, { Dispatch, SetStateAction, useContext } from "react"
import {
  Modal,
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  IconButton
} from "@mui/material"
import { grey } from "@mui/material/colors"
import { Close } from "@mui/icons-material"
import { EventTicket } from "../../../dtos/ticket/ticket.dto"
import Link from "next/link"
import { BotPreventionContext } from "../../../contexts/user/BotPreventionContext"

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2
}

interface P {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  ticket: EventTicket
}

function TicketPurchaseModal({ open, setOpen, ticket }: P) {
  const { showRecaptcha } = useContext(BotPreventionContext)

  function handlePayment() {
    showRecaptcha()
    // add is loading layout
    alert(`Paying for ${ticket.name} ~`)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="purchase-ticket"
      aria-describedby="purchase-ticket-modal"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            id="purchase-ticket-title"
            variant="h4"
            component="h1"
            sx={{ marginBottom: 2 }}
          >
            Purchase this Ticket
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            color="primary"
            aria-label="close"
            component="label"
            disableRipple
          >
            <Close />
          </IconButton>
        </Stack>
        <Stack direction="row">
          <Stack direction="column" flex="1" sx={{ marginRight: 2 }}>
            <Box sx={{ border: 2, p: 2, borderRadius: 2, marginBottom: 2 }}>
              <Typography variant="h6" fontWeight="600">
                Payment
              </Typography>
              <Typography fontSize={18} fontWeight="500">
                Using Decentralized Wallet
              </Typography>
              <Typography variant="body2" sx={{ marginY: 1 }}>
                You will be prompted to pay in-full with a tiny amount of
                additional gas fee for using the blockchain.
              </Typography>
              <Typography variant="caption" color={grey[500]}>
                By purchasing Warden Tickets, you have read and accepted the
                Terms and Conditions
              </Typography>
            </Box>
            <Box sx={{ border: 2, p: 2, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="600">
                View your Purchases
              </Typography>
              <Typography fontSize={18} fontWeight="500">
                With Warden's Ticket Viewer
              </Typography>
              <Typography variant="body2" sx={{ marginY: 1 }}>
                Once the transaction is complete, you may view your NFT ticket
                at anytime through your decentralized wallet or via Warden.
              </Typography>
            </Box>
          </Stack>
          <Box flex="1">
            <Box sx={{ border: 2, p: 2, borderRadius: 2 }}>
              <Stack justifyContent="space-between">
                <Typography variant="h6" fontWeight="700">
                  Summary
                </Typography>
                <Box sx={{ height: "195px" }}>
                  <Typography fontWeight="700" sx={{ marginTop: 2 }}>
                    Ticket
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Ticket Name</Typography>
                    <Typography>
                      {ticket.price.amount} {ticket.price.currency}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Box>
                <Box
                  sx={{ width: "100%", display: "grid", placeItems: "center" }}
                >
                  <Typography variant="caption">
                    *** This price does not include gas fee ***
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="h6" fontWeight="300">
                    Estimated Total
                  </Typography>
                  <Stack alignItems="flex-end">
                    <Typography variant="h6" fontWeight="700">
                      {ticket.price.amount} {ticket.price.currency}
                    </Typography>
                    <Link
                      href={`https://www.google.com/search?q=${ticket.price.amount}+${ticket.price.currency}+to+thb`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View price in Google
                    </Link>
                  </Stack>
                </Stack>
              </Box>
            </Box>
            <Button
              onClick={handlePayment}
              variant="contained"
              sx={{ marginTop: 1, width: "100%" }}
            >
              <Typography>Advance to Payment</Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
}

export default TicketPurchaseModal
