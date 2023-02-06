import { Card, Typography } from "@mui/material"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import React, { Dispatch, SetStateAction, useContext } from "react"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import ContainedButton from "../../../UI/button/ContainedButton"
import { useAccount } from "wagmi"
import DeployEventModal from "./DeployEventModal"
import { Event } from "../../../../interfaces/event/event.interface"

type Props = {
  event: Event
  setCurrentEvent: Dispatch<SetStateAction<Event | undefined>>
}

function DeployEventBanner({ event, setCurrentEvent }: Props) {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const { openEventDeployModal, setOpenEventDeployModal } =
    useContext(CreateEventContext)

  const onClickPublicEvent = async () => {
    if (!isConnected && openConnectModal) {
      openConnectModal()
      return
    }
    setOpenEventDeployModal(true)
  }

  return (
    <>
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
          onClick={onClickPublicEvent}
        />
      </Card>
      <DeployEventModal
        open={openEventDeployModal}
        handleClose={() => setOpenEventDeployModal(false)}
        event={event}
        setCurrentEvent={setCurrentEvent}
      />
    </>
  )
}

export default DeployEventBanner
