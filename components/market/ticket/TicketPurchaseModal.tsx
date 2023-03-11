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
  Button,
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

interface P {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  ticket: EventTicket
  event: Event
}

function TicketPurchaseModal({ open, setOpen, ticket, event }: P) {
  // Captcha
  const { showRecaptcha } = useContext(BotPreventionContext)

  // Web3
  const { abi, bytecode, web3 } = useSmartContract()
  const { address } = useAccount()
  const { showErrorAlert } = useContext(LayoutContext)
  const { openConnectModal } = useConnectModal()

  // States
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false)

  function handlePayment() {
    setPaymentProcessing(true)
    if (!web3 || !abi?.abi || !bytecode || !address) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Web3 error",
        description:
          "ABI, bytecode, or wallet address unavailable. Please try again."
      })
      return
    }

    const price = ethers.utils.parseUnits(
      ticket.price.amount.toString(),
      SupportedDigitalCurrencyKey[ticket.price.currency]
    )
    console.log(price)
    // Connect to web3 and send the buyTicket transaction
    const contract = new web3.eth.Contract(abi.abi)
    contract.options.address = event.smartContractAddress
    contract.methods
      .buyTicket(
        `${process.env.NEXT_PUBLIC_WARDEN_API_URL}/ticket/metadata?path=${event._id}/${ticket.ticketMetadata[0].name}.png`,
        TicketTypeKey[ticket.ticketType]
      )
      .send({ from: address, value: price, gas: 2100000, gasPrice: 8000000000 })
      .then((result: any, error: any) => {
        console.log({ error, result })
        showErrorAlert({
          type: AlertType.INFO,
          title: "Ticket purchased successfully",
          description: "Ticket purchased successfully"
        })
      })
      .catch((error: any) => {
        console.log(error.toString())
        const jsonString = error
          .toString()
          .substring(error.toString().indexOf("{"))
        setPaymentProcessing(false)
        showErrorAlert({
          type: AlertType.ERROR,
          title: "Ticket purchase failed",
          description: jsonString
        })
        setPaymentProcessing(false)
      })
  }

  useEffect(() => {
    open && showRecaptcha()
  }, [open])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="purchase-ticket"
      aria-describedby="purchase-ticket-modal"
    >
      <Box sx={modalStyle}>
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
            <Box sx={{ border: 2, p: 2, borderRadius: 2, marginBottom: 2 }}>
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
            <Box sx={{ border: 2, p: 2, borderRadius: 2 }}>
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
                    <Typography>
                      {ticket.price.amount} {ticket.price.currency}
                    </Typography>
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
                label="Advance to Payment"
                variant="contained"
                isLoading={paymentProcessing}
                onClick={handlePayment}
                sx={{ marginTop: 1, width: "100%" }}
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
