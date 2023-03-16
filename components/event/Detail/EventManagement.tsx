import { Typography, Divider, Skeleton, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import React from "react"
import { ResaleTicketPurchasePermissionRequestsList } from "../../../dtos/ticket/ticket.dto"
import { Event } from "../../../interfaces/event/event.interface"
import ContainedButton from "../../UI/button/ContainedButton"
import FlatCard from "../../UI/card/FlatCard"
import ResaleTicketPurchaseRequests from "./ResaleTicketPurchaseRequests"

type Props = {
  event: Event
  checkedPrivileges: boolean
  isSmartContractOwner: boolean
  resaleTicketPurchaseRequests: ResaleTicketPurchasePermissionRequestsList
  handleNavigateAdmission: () => void
  approveResaleTicketPurchaseRequest: (
    permissionId: string,
    walletAddress: string,
    ticketId: number
  ) => void
}

function EventManagement({
  event,
  checkedPrivileges,
  isSmartContractOwner,
  resaleTicketPurchaseRequests,
  handleNavigateAdmission,
  approveResaleTicketPurchaseRequest
}: Props) {
  return (
    <FlatCard>
      <Typography variant="h5">Event and Ticket Management</Typography>
      <Box sx={{ my: 2 }}>
        <Divider />
      </Box>
      {event.ticketCollectionId && (
        <>
          <Typography variant="h6">User Admission</Typography>
          <Box sx={{ width: "100%", my: 2 }}>
            <ContainedButton
              onClick={handleNavigateAdmission}
              variant="contained"
              label="Admit User"
              width="300px"
              sx={{ maxWidth: "100%" }}
            />
            <Typography color={grey[600]} variant="caption">
              Admit User to allow user to enter this event
            </Typography>
          </Box>
        </>
      )}
      <Typography variant="h6">Resale Ticket Purchase Requests</Typography>
      <Box sx={{ my: 2 }} />
      {!checkedPrivileges && (
        <Box>
          <Skeleton variant="rectangular" height={40} />
          <Box>
            <Skeleton width="60%" />
            <Skeleton width="60%" />
            <Skeleton width="60%" />
          </Box>
        </Box>
      )}
      {checkedPrivileges && isSmartContractOwner && (
        <ResaleTicketPurchaseRequests
          resaleTicketPurchaseRequests={resaleTicketPurchaseRequests}
          approveResaleTicketPurchaseRequest={
            approveResaleTicketPurchaseRequest
          }
        />
      )}
      {checkedPrivileges && !isSmartContractOwner && (
        <Typography>
          You need to connect the wallet that was used to publish this event to
          view resale ticket purchase requests
        </Typography>
      )}
    </FlatCard>
  )
}

export default EventManagement
