import React, { useState } from "react"
import { withEventOrganizerGuard } from "../../guards/withAuth"
import axios from "axios"
import { Box, Container, Stack, Typography } from "@mui/material"
import Head from "next/head"
import { Event } from "../../interfaces/event/event.interface"
import useAsyncEffect from "../../hooks/useAsyncEffect"
import { useRouter } from "next/router"
import { QrReader } from "react-qr-reader"
import AdmissionUserModal from "../../components/admission/AdmissionUserModal"

function EventAdmissionPage() {
  const [event, setEvent] = useState<Event>()
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(true)
  }

  return (
    <>
      <Head>
        <title>{event?.name} Ticket Admission</title>
      </Head>
      <AdmissionUserModal open={isOpen} setOpen={setIsOpen} />
      <Container sx={{ display: "grid", placeItems: "center", pt: 4 }}>
        <Stack>
          <Box style={{ textAlign: "center" }}>
            <Typography variant="h3" component="h1">
              Ticket Admission
            </Typography>
            <Typography variant="h5" component="h2">
              {event?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "500px",
              height: "500px",
              border: 2,
              background: "white"
            }}
          >
            <QrReader
              constraints={{ facingMode: "user" }}
              scanDelay={350}
              onResult={(result, error) => {
                if (result) {
                  onScan(result.getText())
                }

                if (error) {
                  // console.log(error)
                }
              }}
              // style={{ width: '100%' }}
            />
          </Box>
        </Stack>
        <div>{JSON.stringify(event)}</div>
      </Container>
    </>
  )
}

export default withEventOrganizerGuard(EventAdmissionPage)
