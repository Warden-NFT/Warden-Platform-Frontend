import { Stack, Typography, Button, Alert, Box } from "@mui/material"
import { purple, orange, green } from "@mui/material/colors"
import router from "next/router"
import React, { Dispatch, SetStateAction } from "react"
import {
  EventTicket,
  TicketQuotaCheckResultDTO
} from "../../../../dtos/ticket/ticket.dto"
import { User } from "../../../../interfaces/auth/user.interface"

type Props = {
  user: User | undefined
  ticket: EventTicket
  statusChecked: boolean
  isSold: boolean
  isResaleTicket: boolean
  isOwnedTicket: boolean
  ticketQuotaCheckResult: TicketQuotaCheckResultDTO | undefined
  setShowPurchaseModal: Dispatch<SetStateAction<boolean>>
}

function TicketListingActions({
  user,
  ticket,
  statusChecked,
  isSold,
  isResaleTicket,
  isOwnedTicket,
  ticketQuotaCheckResult,
  setShowPurchaseModal
}: Props) {
  const handleRequestTicketPurchase = () => {
    // TODO: Connect backend
  }

  if (!user) return null
  return (
    <>
      {isOwnedTicket && (
        <Alert
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => router.push(`/me/${ticket._id}`)}
            >
              View Ticket
            </Button>
          }
          sx={{ border: `2px solid ${green[100]}`, mt: 2 }}
        >
          You are the owner of this ticket
        </Alert>
      )}
      {statusChecked && !isOwnedTicket && !isSold && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: 4,
            border: 2,
            borderRadius: 2,
            px: 2,
            py: 1,
            backgroundColor: "white"
          }}
        >
          <Stack alignItems="start">
            <Typography>Want to claim this ticket? Buy now</Typography>
            <Typography fontWeight="700">
              {ticket.price.amount} {ticket.price.currency}
            </Typography>
          </Stack>
          {user && !isResaleTicket && (
            <Button
              size="small"
              variant="contained"
              disabled={!ticketQuotaCheckResult?.allowPurchase}
              onClick={() => {
                setShowPurchaseModal(true)
              }}
              sx={{
                background: purple[400],
                "&:hover": {
                  background: purple[500]
                }
              }}
            >
              <Typography fontWeight={600}>Purchase Ticket</Typography>
            </Button>
          )}
          {!user && (
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                router.push({
                  pathname: "/auth/login",
                  query: {
                    referrer: window.location.pathname
                  }
                })
              }}
            >
              <Typography>Log in to purchase</Typography>
            </Button>
          )}
          {user && isResaleTicket && (
            <Box sx={{ display: "flex", gap: 2, height: "fit-content" }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => router.back()}
              >
                Find other tickets
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={handleRequestTicketPurchase}
              >
                <Typography>Request for ticket purchase</Typography>
              </Button>
            </Box>
          )}
        </Box>
      )}
      {statusChecked && !ticketQuotaCheckResult?.allowPurchase && (
        <Alert
          severity="warning"
          sx={{
            mt: 2,
            border: `2px solid ${orange[100]}`
          }}
        >
          You have purchased{" "}
          {ticketQuotaCheckResult?.ownedTicketsCount.toString()} out of{" "}
          {ticketQuotaCheckResult?.quota} tickets per person. You can not
          purchase any more tickets from this event.
        </Alert>
      )}
    </>
  )
}

export default TicketListingActions
