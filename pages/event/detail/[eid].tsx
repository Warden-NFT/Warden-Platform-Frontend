import { Box } from "@mui/material"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import EventSummary from "../../../components/event/Detail/EventSummary"
import { withEventOrganizerGuard } from "../../../guards/withAuth"
import DeployEventBanner from "../../../components/event/CreateEvent/DeployEvent/DeployEventBanner"
import DeployEventModal from "../../../components/event/CreateEvent/DeployEvent/DeployEventModal"
import { CreateEventContext } from "../../../contexts/event/CreateEventContext"

function PublishEvent() {
  const router = useRouter()
  const { openEventDeployModal, setOpenEventDeployModal } =
    useContext(CreateEventContext)

  const { eid } = router.query
  return (
    <>
      <Container>
        <Box sx={{ height: 16 }} />
        <DeployEventBanner />
        {eid && <EventSummary eventId={eid.toString()} />}
      </Container>
      <DeployEventModal
        open={openEventDeployModal}
        handleClose={() => setOpenEventDeployModal(false)}
      />
    </>
  )
}

export default withEventOrganizerGuard(PublishEvent)
