import { Alert, Box, Button, Modal, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import Image from "next/image"
import React, { Dispatch, SetStateAction, useState } from "react"
import { client } from "../../configs/axios/axiosConfig"
import { EventTicket } from "../../dtos/ticket/ticket.dto"
import useAsyncEffect from "../../hooks/useAsyncEffect"
import { User } from "../../interfaces/auth/user.interface"
import { TicketQRUtilizeValue } from "../../interfaces/ticket/ticket.interface"
import { AxiosError } from "axios"
import { modalStyle } from "../../styles/muiStyles"

interface P {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  qrValue: TicketQRUtilizeValue | undefined
}

function AdmissionUserModal({ open, setOpen, qrValue }: P) {
  const [user, setUser] = useState<User>()
  const [admissionStatus, setAdmissionStatus] = useState<
    "SUCCESS" | "FAILED" | "USED"
  >()

  useAsyncEffect(async () => {
    setAdmissionStatus(undefined)
    if (!qrValue) return

    const { eventId, ticketId, userId, walletAddress } = qrValue
    if (!eventId || !ticketId || !userId || !walletAddress) return

    try {
      const res = await client.get<{
        event: Event
        ticket: EventTicket
        user: User
      }>("ticket/admission/check", {
        params: qrValue
      })
      const { user } = res.data
      if (user) {
        setUser(user)
      }
    } catch (e) {
      return
    }

    try {
      await client.put("ticket/utilize", {
        ...qrValue
      })
      setAdmissionStatus("SUCCESS")
    } catch (e) {
      const err = e as AxiosError<{ success: boolean }>
      if (err.response?.status === 400) {
        setAdmissionStatus("USED")
      } else {
        setAdmissionStatus("FAILED")
      }
    }
  }, [qrValue, open])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack alignItems="center" spacing={2}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            fontWeight="500"
            component="h2"
          >
            Admit this User
          </Typography>
          <Box
            sx={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              overflow: "hidden"
            }}
          >
            <Image
              src={user?.profileImage ?? "/images/logo/WardenLight.svg"}
              width="200"
              height="200"
              alt="User profile"
              draggable={false}
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Typography variant="h6" component="h2">
            {user?.username}
          </Typography>
          <Stack alignItems="center">
            <Typography id="modal-modal-description">
              Would you like to admit this user?
            </Typography>
            <Typography fontSize="12px">
              Ticket ID: {qrValue?.ticketId}
            </Typography>
          </Stack>
          <Box sx={{ my: 2 }}>
            {admissionStatus === "SUCCESS" && (
              <Alert severity="success">
                This user has been admitted to the event
              </Alert>
            )}
            {admissionStatus === "FAILED" && (
              <Alert severity="error">
                An error has occured, this user cannot be admitted to the event.
                Try again later.
              </Alert>
            )}
            {admissionStatus === "USED" && (
              <Alert severity="warning">
                This ticket has already been used.
              </Alert>
            )}
          </Box>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default AdmissionUserModal
