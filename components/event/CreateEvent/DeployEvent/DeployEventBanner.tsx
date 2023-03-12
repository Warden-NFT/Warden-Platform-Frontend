import { Card, Typography } from "@mui/material"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import React, { Dispatch, SetStateAction, useContext } from "react"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import ContainedButton from "../../../UI/button/ContainedButton"
import { useAccount } from "wagmi"
import DeployEventModal from "./DeployEventModal"
import { Event } from "../../../../interfaces/event/event.interface"
import { useRouter } from "next/router"

type Props = {
  event: Event
  setCurrentEvent: Dispatch<SetStateAction<Event | undefined>>
}

function DeployEventBanner({ event, setCurrentEvent }: Props) {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const { openEventDeployModal, setOpenEventDeployModal } =
    useContext(CreateEventContext)
  const router = useRouter()

  const onClickPublicEvent = async () => {
    if (!event.ticketCollectionId) {
      router.push("/ticket")
    }
    if (!isConnected && openConnectModal) {
      openConnectModal()
      return
    }
    setOpenEventDeployModal(true)
  }

  const renderBannerText = () => {
    if (!event.ticketCollectionId)
      return (
        <Typography fontWeight={600}>Create tickets for this event.</Typography>
      )
    if (isConnected)
      return (
        <Typography fontWeight={600}>Ready to share your event?</Typography>
      )
    if (!isConnected)
      return (
        <Typography fontWeight={600}>
          Connect your wallet to proceed.
        </Typography>
      )
  }

  const getBannerButtonLabel = () => {
    if (!event.ticketCollectionId) return "Create Tickets"
    if (isConnected) return "Publish Event"
    else return "Connect Wallet"
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
        {renderBannerText()}
        <ContainedButton
          label={getBannerButtonLabel()}
          variant="contained"
          width="200px"
          onClick={onClickPublicEvent}
        />
      </Card>
      {event.ticketCollectionId && (
        <DeployEventModal
          open={openEventDeployModal}
          handleClose={() => setOpenEventDeployModal(false)}
          event={event}
          setCurrentEvent={setCurrentEvent}
        />
      )}
    </>
  )
}

export default DeployEventBanner
