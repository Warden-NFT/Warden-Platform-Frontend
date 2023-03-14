import React, { useState } from "react"
import { withEventOrganizerGuard } from "../../guards/withAuth"
import axios from "axios"
import {
  Box,
  Container,
  MenuItem,
  Select,
  Stack,
  Typography
} from "@mui/material"
import Head from "next/head"
import { Event } from "../../interfaces/event/event.interface"
import useAsyncEffect from "../../hooks/useAsyncEffect"
import { useRouter } from "next/router"
import { QrReader } from "react-qr-reader"
import AdmissionUserModal from "../../components/admission/AdmissionUserModal"
import { TicketQRUtilizeValue } from "../../interfaces/ticket/ticket.interface"
import BannerLayout from "../../components/UI/layout/BannerLayout"

type CameraViewMode = "environment" | "user"

function EventAdmissionPage() {
  const [event, setEvent] = useState<Event>()
  const [isOpen, setIsOpen] = useState(false)
  const [cameraDirection, setCameraDirection] =
    useState<CameraViewMode>("environment")
  const [qrValue, setQrValue] = useState<TicketQRUtilizeValue>()
  const router = useRouter()

  useAsyncEffect(async () => {
    const eid = router.query.eid
    if (!eid) return

    const res = await axios.get<Event>(
      `${process.env.NEXT_PUBLIC_WARDEN_API_URL}/event?id=${eid}`
    )
    setEvent(res.data)
  }, [router.query])

  async function onScan(result: string) {
    if (!result) return

    setQrValue(JSON.parse(result) as TicketQRUtilizeValue)
    setIsOpen(true)
  }

  return (
    <>
      <Head>
        <title>{event?.name} Ticket Admission</title>
      </Head>
      <AdmissionUserModal open={isOpen} setOpen={setIsOpen} qrValue={qrValue} />
      <BannerLayout
        backgroundImage={
          (event?.image ?? "/images/background/event-background.jpeg") as string
        }
        title="Ticket Admission"
        subtitle={`Check-in attendees for ${event?.name}`}
      >
        <Container sx={{ display: "grid", placeItems: "center", pt: 4 }}>
          <Stack spacing={2}>
            <Box
              sx={{
                width: ["240px", "300px", "500px"],
                border: 2,
                background: "white",
                padding: 4,
                borderRadius: 4
              }}
            >
              <Typography>Select camera</Typography>
              <Select
                value={cameraDirection}
                size="small"
                onChange={(e) =>
                  setCameraDirection(e.target.value as CameraViewMode)
                }
                sx={{ width: "100%" }}
              >
                <MenuItem value={"environment" as CameraViewMode}>
                  Back
                </MenuItem>
                <MenuItem value={"user" as CameraViewMode}>Front</MenuItem>
              </Select>
              <QrReader
                constraints={{ facingMode: cameraDirection }} // environment
                scanDelay={2000}
                videoId="qr-reader"
                onResult={(result, error) => {
                  if (result && !isOpen) {
                    onScan(result.getText())
                  }
                }}
              />
            </Box>
          </Stack>
        </Container>
      </BannerLayout>
    </>
  )
}

export default withEventOrganizerGuard(EventAdmissionPage)
