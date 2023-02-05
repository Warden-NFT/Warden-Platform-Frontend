import { Card, Typography } from "@mui/material"
import React, { useContext } from "react"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import ContainedButton from "../../../UI/button/ContainedButton"

function DeployEventBanner() {
  const { setOpenEventDeployModal } = useContext(CreateEventContext)
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Typography fontWeight={600}>Ready to share your event?</Typography>
      <ContainedButton
        label="Publish Event"
        variant="contained"
        width="200px"
        onClick={() => setOpenEventDeployModal(true)}
      />
    </Card>
  )
}

export default DeployEventBanner
