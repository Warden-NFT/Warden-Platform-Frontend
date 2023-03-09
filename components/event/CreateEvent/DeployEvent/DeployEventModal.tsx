import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography
} from "@mui/material"
import { Stack } from "@mui/system"
import moment from "moment"
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"
import { useAccount } from "wagmi"
import { useSmartContract } from "../../../../hooks/useSmartContract"
import { Event } from "../../../../interfaces/event/event.interface"
import ContainedButton from "../../../UI/button/ContainedButton"
import FlatCard from "../../../UI/card/FlatCard"
import { client } from "../../../../configs/axios/axiosConfig"
import { UserContext } from "../../../../contexts/user/UserContext"
import Web3 from "web3"
import { AlertType } from "../../../../interfaces/modal/alert.interface"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { TicketCollectionDTO } from "../../../../dtos/ticket/ticket.dto"

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
  const { abi, bytecode, web3 } = useSmartContract()
  const { user } = useContext(UserContext)
  const { showErrorAlert } = useContext(LayoutContext)

  const [isDeployingContract, setDeployingContract] = useState<boolean>(false)
  const [smartContractArguments, setSmartContractArguments] =
    useState<(string | string[][] | number)[]>()

  const prepareSmartContractArguments = async (
    address: `0x${string}`,
    event: Event
  ) => {
    // Only continue if web3 is available
    if (!web3) return
    const ticketCollection = await client.get<TicketCollectionDTO>("ticket", {
      params: { collectionId: event.ticketCollectionId }
    })

    // Address must not be empty before calling this function
    if (!address) return

    const ticketSupply = [
      ...(ticketCollection.data.tickets.general ?? []),
      ...(ticketCollection.data.tickets.vip ?? []),
      ...(ticketCollection.data.tickets.reservedSeat ?? [])
    ]

    const ticketPrice = ticketCollection.data.ticketPrice
    const toWei = (value: number | undefined) =>
      value ? web3.utils.toWei(value.toString()) : "0"

    const ticketPrices = [
      [
        toWei(ticketPrice.general?.default),
        toWei(ticketPrice.general?.min),
        toWei(ticketPrice.general?.max)
      ],
      [
        toWei(ticketPrice.vip?.default),
        toWei(ticketPrice.vip?.min),
        toWei(ticketPrice.vip?.max)
      ],
      [
        toWei(ticketPrice.reservedSeat?.default),
        toWei(ticketPrice.reservedSeat?.min),
        toWei(ticketPrice.reservedSeat?.max)
      ]
    ]

    const transferFee = parseInt(
      `${ticketCollection.data.royaltyFee * 100}`
    ).toString()

    const _smartContractArguments = [
      address, // address _owner: wallet address of the smart contract owner
      event._id, // string memory _eventID: id of the event document
      event.name, // string memory _eventName: name of the event
      event._id, // string memory _eventSymbol: symbol of the event
      moment(event.doorTime).unix(), // _eventDoorTime
      moment(event.startDate).unix(), // uint64 _eventStartDate,
      moment(event.endDate).unix(), // uint64 _eventEndDate,
      ticketSupply.length, // TODO uint64 _ticketSupply maximum tickets allowed for this event
      ticketPrices, // TODO uint256 _initialTicketPrice: ticket price in wei unit
      transferFee // TODO uint64 _transferFee: percentage of royalty fee collected by the event organizer when the ticket is resold
    ]
    setSmartContractArguments(_smartContractArguments)
  }

  const onCLickDeployContract = async (
    account: `0x${string}`,
    abi: any,
    bytecode: any,
    web3: Web3 | undefined,
    smartContractArguments: (string | string[][] | number)[]
  ) => {
    if (!web3) throw new Error("web3 is undefined")
    const contract = new web3.eth.Contract(abi.abi)
    try {
      setDeployingContract(true)
      contract
        // @ts-ignore
        .deploy({
          data: bytecode.bytecode.object,
          arguments: smartContractArguments
        })
        .send({ from: account })
        .on("receipt", async (receipt) => {
          const updateEventPayload = {
            ...event,
            smartContractAddress: receipt.contractAddress,
            eventId: event._id,
            eventOrganizerId: user?._id
          }
          const updatedEventResponse = await client.put<Event>(
            "event",
            updateEventPayload
          )
          setCurrentEvent(updatedEventResponse.data)
          setDeployingContract(false)
        })
        .on("error", () => {
          throw new Error("Unable to deploy smart contract")
        })
    } catch (err) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Smart contract deployment unsuccessful",
        description:
          "Unable to deploy the smart contract for your event at this time. Please try again later."
      })
      setDeployingContract(false)
    }
  }

  useEffect(() => {
    if (!address || !web3) return
    prepareSmartContractArguments(address, event)
  }, [address, event, web3])

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
              {address && smartContractArguments ? (
                <ContainedButton
                  label="Deploy Now"
                  variant="contained"
                  disabled={!abi || !bytecode}
                  isLoading={isDeployingContract}
                  onClick={() =>
                    onCLickDeployContract(
                      address,
                      abi,
                      bytecode,
                      web3,
                      smartContractArguments
                    )
                  }
                />
              ) : (
                <CircularProgress />
              )}
            </Stack>
          </FlatCard>
        </Box>
      </Fade>
    </Modal>
  )
}

export default DeployEventModal
