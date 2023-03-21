import { InfoOutlined } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Stack, Typography, Button, Alert, Box } from "@mui/material"
import { purple, orange, green, blue } from "@mui/material/colors"
import router from "next/router"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { useAccount } from "wagmi"
import { client } from "../../../../configs/axios/axiosConfig"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import {
  EventTicket,
  TicketQuotaCheckResultDTO
} from "../../../../dtos/ticket/ticket.dto"
import { User } from "../../../../interfaces/auth/user.interface"
import { Event } from "../../../../interfaces/event/event.interface"
import { AlertType } from "../../../../interfaces/modal/alert.interface"

type Props = {
  user: User | undefined
  ticket: EventTicket
  event: Event
  statusChecked: boolean
  isSold: boolean
  isResaleTicket: boolean
  isOwnedTicket: boolean
  isEventOrganizer: boolean
  ticketQuotaCheckResult: TicketQuotaCheckResultDTO | undefined
  setShowPurchaseModal: Dispatch<SetStateAction<boolean>>
}

function TicketListingActions({
  user,
  ticket,
  event,
  statusChecked,
  isSold,
  isResaleTicket,
  isOwnedTicket,
  isEventOrganizer,
  ticketQuotaCheckResult,
  setShowPurchaseModal
}: Props) {
  const { address } = useAccount()
  const { showErrorAlert } = useContext(LayoutContext)
  const [isRequestingPermission, setIsRequestingPermission] =
    useState<boolean>(false)

  const handleRequestTicketPurchase = async () => {
    setIsRequestingPermission(true)
    const payload = {
      address,
      ticketCollectionId: event.ticketCollectionId,
      ticketId: ticket._id,
      smartContractTicketId: ticket.smartContractTicketId
    }
    try {
      const permissionResponse = await client.post(
        "/ticket/permission/buy-resale",
        payload
      )
      if (permissionResponse.data.success) {
        showErrorAlert({
          type: AlertType.INFO,
          title: "Request sent",
          description:
            "Please wait for the event organizer to accept your request to purchase this resale ticket."
        })
      }
      setIsRequestingPermission(false)
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Authentication error",
        description: "Permission already sent."
      })
    } finally {
      setIsRequestingPermission(false)
    }
  }

  if (!address)
    return (
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <InfoOutlined />
        <Typography>
          Please connect your wallet to purchase this ticket.
        </Typography>
      </Box>
    )
  if (isEventOrganizer)
    return (
      <Alert severity="info" sx={{ mt: 2, border: `2px solid ${blue[100]}` }}>
        You are the organizer of this event.
      </Alert>
    )
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

          {/* This address is approved to buy resale tickets, or this is an unsold non-resale ticket */}
          {((user &&
            isResaleTicket &&
            ticketQuotaCheckResult?.resalePurchaseApproved &&
            !ticketQuotaCheckResult?.resalePurchasePendingApproval) ||
            (user && !isResaleTicket)) && (
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

          {/* This address is awaiting approval or this address haven't made a request to buy a resale ticket */}
          {user &&
            isResaleTicket &&
            !ticketQuotaCheckResult?.resalePurchaseApproved && (
            <>
              <Box sx={{ display: "flex", gap: 2, height: "fit-content" }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => router.back()}
                >
                    Find other tickets
                </Button>
                {ticketQuotaCheckResult?.resalePurchasePendingApproval ? (
                  <Button>Pending Purchase Approval</Button>
                ) : (
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={handleRequestTicketPurchase}
                    loading={isRequestingPermission}
                  >
                      Request permission to buy
                  </LoadingButton>
                )}
              </Box>
            </>
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
        </Box>
      )}
      {user && isResaleTicket && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <InfoOutlined />
          <Typography>
            You need a permission to purchase a resale ticket from the event
            organizer. Once the request is sent, please wait for the event
            organizer to grant your purchase permission.
          </Typography>
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
