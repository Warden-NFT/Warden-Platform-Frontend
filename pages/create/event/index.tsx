import { Container } from "@mui/material"
import React from "react"
import withUserGuard from "../../../guards/user.guard"
import { withEventOrganizerGuard } from "../../../guards/withAuth"

function EventCreationPage() {
  return <Container>EventCreationPage</Container>
}

export default withEventOrganizerGuard(EventCreationPage)
