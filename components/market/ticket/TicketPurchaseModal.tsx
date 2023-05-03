import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"
import {
  Modal,
  Box,
  Typography,
  Stack,
  Divider,
  IconButton
} from "@mui/material"
import { grey } from "@mui/material/colors"
import { Close } from "@mui/icons-material"
import { EventTicket } from "../../../dtos/ticket/ticket.dto"
import Link from "next/link"
import { BotPreventionContext } from "../../../contexts/user/BotPreventionContext"
import ContainedButton from "../../UI/button/ContainedButton"
import { modalStyle } from "../../../styles/muiStyles"
import { useSmartContract } from "../../../hooks/useSmartContract"
import { AlertType } from "../../../interfaces/modal/alert.interface"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import { useAccount } from "wagmi"
import { Event, TicketTypeKey } from "../../../interfaces/event/event.interface"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { ethers } from "ethers"
import { SupportedDigitalCurrencyKey } from "../../../interfaces/currency/currency.interface"
import { client } from "../../../configs/axios/axiosConfig"
import { TicketPurchasePermissionResponse } from "../../../interfaces/ticket/ticket.interface"
import { useRouter } from "next/router"

interface P {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  ticket: EventTicket
  event: Event
  isResaleTicket: boolean
}

function TicketPurchaseModal({
  open,
  setOpen,
  ticket,
  event,
  isResaleTicket
}: P) {
  // Captcha
  const { showRecaptcha, token } = useContext(BotPreventionContext)

  // Router
  const router = useRouter()

  // Web3
  const { abi, bytecode, web3 } = useSmartContract()
  const { address } = useAccount()
  const { showErrorAlert } = useContext(LayoutContext)
  const { openConnectModal } = useConnectModal()

  // States
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false)

  // Functions
  const updateSmartContractTicketId = async (
    smartContractTicketId: number,
    address: string
  ) => {
    const updatedTicket: EventTicket = {
      ...ticket,
      smartContractTicketId,
      ownerHistory: [...ticket.ownerHistory, address]
    }
    const payload = {
      ticket: updatedTicket,
      ticketCollectionId: event.ticketCollectionId,
      walletAddress: address,
      isTransactionUpdate: true
    }
    try {
      const _ticket = await client.put("ticket/single", payload)
      if (_ticket) router.reload()
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Database Error",
        description: "Unable to record the transaction in the database"
      })
    }
  }

  const handlePrimaryTicketPurchase = (
    contract: any,
    address: `0x${string}`,
    price: ethers.BigNumber
  ) => {
    contract.methods
      .buyTicket(
        `${process.env.NEXT_PUBLIC_WARDEN_API_URL}/ticket/metadata?path=${event._id}/${ticket.ticketMetadata[0].name}`,
        TicketTypeKey[ticket.ticketType]
      )
      .send({ from: address, value: price })
      .then(async (result: any) => {
        const ticketId = result.events?.TicketCreated?.returnValues?._ticketId
        if (!ticketId) {
          showErrorAlert({
            type: AlertType.ERROR,
            title: "Database error",
            description:
              "Unable to record the ticket purchase. But don't worry. Your ticket has been purchased successfully."
          })
          return
        } else {
          await updateSmartContractTicketId(parseInt(ticketId), address)
        }
        showErrorAlert({
          type: AlertType.INFO,
          title: "Ticket purchased successfully",
          description: "Ticket purchased successfully"
        })
        setPaymentProcessing(false)
        setOpen(false)
      })
      .catch((error: any) => {
        showErrorAlert({
          type: AlertType.ERROR,
          title: "Ticket purchase failed",
          description: error.message
        })
        setPaymentProcessing(false)
      })
  }

  const handleSecondaryTicketPurchase = (
    contract: any,
    address: `0x${string}`,
    price: ethers.BigNumber,
    nftId: number
  ) => {
    contract.methods
      .buyResaleTicket(nftId)
      .send({ from: address, value: price })
      .then(async (result: any) => {
        await updateSmartContractTicketId(nftId, address)
        showErrorAlert({
          type: AlertType.INFO,
          title: "Ticket purchased successfully",
          description: "Ticket purchased successfully"
        })
        setPaymentProcessing(false)
        setOpen(false)
      })
      .catch((error: any) => {
        showErrorAlert({
          type: AlertType.ERROR,
          title: "Ticket purchase failed",
          description: error.message
        })
        setPaymentProcessing(false)
      })
  }

  const handlePayment = async () => {
    setPaymentProcessing(true)

    // Check web3
    if (!web3 || !abi?.abi || !bytecode || !address) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Web3 error",
        description:
          "ABI, bytecode, or wallet address unavailable. Please try again."
      })
      return
    }

    // Check ticket purchase permission
    const permissionPayload = {
      walletAddress: address,
      eventId: event._id,
      ticketCollectionId: event.ticketCollectionId,
      ticketId: ticket._id
    }
    const allowedPurchaseResponse =
      await client.post<TicketPurchasePermissionResponse>(
        "/ticket/transaction/permission",
        permissionPayload
      )
    const allowedPurchase = allowedPurchaseResponse.data.allowed
    if (!allowedPurchase) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Ticket purchase failed",
        description: `You do not have the permission to purchase this ticket. ${
          allowedPurchaseResponse.data.reason ?? ""
        }`
      })
      return
    }

    // Get the price in ether
    const price = ethers.utils.parseUnits(
      ticket.price.amount.toString(),
      "ether"
    )

    // Connect to web3 and send the buyTicket transaction
    const contract = new web3.eth.Contract(abi.abi)
    contract.options.address = event.smartContractAddress

    // Check if the ticket is a resale ticket
    if (isResaleTicket && ticket.smartContractTicketId !== undefined) {
      handleSecondaryTicketPurchase(
        contract,
        address,
        price,
        ticket.smartContractTicketId
      )
    } else {
      handlePrimaryTicketPurchase(contract, address, price)
    }
  }

  useEffect(() => {
    if (open && !token) {
      showRecaptcha()
    }
  }, [open])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="purchase-ticket"
      aria-describedby="purchase-ticket-modal"
    >
      <Box sx={{ ...modalStyle, p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            id="purchase-ticket-title"
            variant="h4"
            component="h1"
            sx={{ marginBottom: 2 }}
          >
            Purchase this Ticket
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            color="primary"
            aria-label="close"
            component="label"
            disableRipple
          >
            <Close />
          </IconButton>
        </Stack>
        <Stack direction="row">
          <Stack direction="column" flex="1" sx={{ marginRight: 2 }}>
            <Box
              sx={{
                background: grey[100],
                p: 2,
                borderRadius: 2,
                marginBottom: 2
              }}
            >
              <Typography variant="h6" fontWeight="600">
                Payment
              </Typography>
              <Typography fontSize={18} fontWeight="500">
                Using Decentralized Wallet
              </Typography>
              <Typography variant="body2" sx={{ marginY: 1 }}>
                You will be prompted to pay in-full with a tiny amount of
                additional gas fee for using the blockchain.
              </Typography>
              <Typography variant="caption" color={grey[500]}>
                By purchasing Warden Tickets, you have read and accepted the
                Terms and Conditions
              </Typography>
            </Box>
            <Box sx={{ background: grey[100], p: 2, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="600">
                View your Purchases
              </Typography>
              <Typography fontSize={18} fontWeight="500">
                With Warden's Ticket Viewer
              </Typography>
              <Typography variant="body2" sx={{ marginY: 1 }}>
                Once the transaction is complete, you may view your NFT ticket
                at anytime through your decentralized wallet or via Warden.
              </Typography>
            </Box>
          </Stack>
          <Box flex="1">
            <Box sx={{ border: 2, p: 2, borderRadius: 2 }}>
              <Stack justifyContent="space-between">
                <Typography variant="h6" fontWeight="700">
                  Summary
                </Typography>
                <Box sx={{ height: "195px" }}>
                  <Typography fontWeight="700" sx={{ marginTop: 2 }}>
                    Ticket
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Ticket Name</Typography>
                    <Typography>{ticket.name}</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Box>
                <Box
                  sx={{ width: "100%", display: "grid", placeItems: "center" }}
                >
                  <Typography variant="caption">
                    *** This price does not include gas fee ***
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="h6" fontWeight="300">
                    Estimated Total
                  </Typography>
                  <Stack alignItems="flex-end">
                    <Typography variant="h6" fontWeight="700">
                      {ticket.price.amount} {ticket.price.currency}
                    </Typography>
                    <Link
                      href={`https://www.google.com/search?q=${ticket.price.amount}+${ticket.price.currency}+to+thb`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View price in Google
                    </Link>
                  </Stack>
                </Stack>
              </Box>
            </Box>
            {address ? (
              <ContainedButton
                label={token ? "Advance to Payment" : "Verify"}
                variant="contained"
                isLoading={paymentProcessing}
                onClick={handlePayment}
                sx={{ marginTop: 1, width: "100%", height: 32 }}
              />
            ) : (
              <ContainedButton
                label="Connect your wallet to proceed"
                variant="contained"
                onClick={openConnectModal}
                sx={{ marginTop: 1, width: "100%" }}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
}

export default TicketPurchaseModal
