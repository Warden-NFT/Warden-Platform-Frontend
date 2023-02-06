import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import moment from "moment"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { useAccount } from "wagmi"
import { useSmartContract } from "../../../../hooks/useSmartContract"
import { Event } from "../../../../interfaces/event/event.interface"
import ContainedButton from "../../../UI/button/ContainedButton"
import FlatCard from "../../../UI/card/FlatCard"
import Web3 from "web3"
import { client } from "../../../../configs/axios/axiosConfig"
import { UserContext } from "../../../../contexts/user/UserContext"

type Props = {
  open: boolean
  handleClose: () => void
  event: Event
  setCurrentEvent: Dispatch<SetStateAction<Event | undefined>>
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24
}

function DeployEventModal({
  open,
  handleClose,
  event,
  setCurrentEvent
}: Props) {
  const { address } = useAccount()
  const { abi, bytecode } = useSmartContract()
  const { user } = useContext(UserContext)

  const getTicketSupply = (event: Event) => {
    return (
      event.ticketSupply.general +
      event.ticketSupply.reservedSeat +
      event.ticketSupply.vip
    )
  }

  const smartContractArguments = [
    address, // address _owner: wallet address of the smart contract owner
    event._id, // string memory _eventID: id of the event document
    event.name, // string memory _eventName: name of the event
    event._id, // string memory _eventSymbol: symbol of the event
    moment(event.doorTime).unix(), // _eventDoorTime
    moment(event.startDate).unix(), // uint64 _eventStartDate,
    moment(event.endDate).unix(), // uint64 _eventEndDate,
    getTicketSupply(event), // TODO uint64 _ticketSupply maximum tickets allowed for this event
    61000000000000, // TODO uint256 _initialTicketPrice: ticket price in wei unit
    20, // TODO uint64 _maxPriceFactor: percentage of ticket price factor allowed
    20 // TODO uint64 _transferFee: percentage of royalty fee collected by the event organizer when the ticket is resold
  ]

  const onCLickDeployContract = async (
    account: `0x${string}`,
    abi: any,
    bytecode: any
  ) => {
    const web3 = new Web3(window.ethereum as any)
    const contract = new web3.eth.Contract(abi.abi)
    try {
      contract
        // @ts-ignore
        .deploy({
          data: bytecode.bytecode.object,
          arguments: smartContractArguments
        })
        .send({ from: account })
        .on("receipt", async (receipt) => {
          // Contract Address will be returned here
          console.log("Contract Address:", receipt.contractAddress)
          const updateEventPayload = {
            ...event,
            smartContractAddress: receipt.contractAddress,
            eventId: event._id,
            eventOrganizerId: user?._id
          }
          const updatedEventResponse = await client.put<Event>(
            "event/updateEvent",
            updateEventPayload
          )
          setCurrentEvent(updatedEventResponse.data)
        })
    } catch (err) {
      // TODO: show error alert
      console.log(err)
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box>
          <FlatCard sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Publish Your Event
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              When an event is published, a corresponding smart contract will be
              deployed. Proceed?
            </Typography>
            <Box sx={{ height: 12 }} />
            <Stack direction="row" gap={2} sx={{ justifyContent: "flex-end" }}>
              <ContainedButton
                label="Cancel"
                variant="outlined"
                onClick={handleClose}
              />
              {address && (
                <ContainedButton
                  label="Deploy Now"
                  variant="contained"
                  disabled={!abi || !bytecode}
                  onClick={() => onCLickDeployContract(address, abi, bytecode)}
                />
              )}
            </Stack>
          </FlatCard>
        </Box>
      </Fade>
    </Modal>
  )
}

export default DeployEventModal
