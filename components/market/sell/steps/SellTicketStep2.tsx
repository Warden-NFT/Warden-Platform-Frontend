import { Alert, Box, Divider, Typography } from "@mui/material"
import { useFormik } from "formik"
import React, { useContext, useState } from "react"
import { useAccount } from "wagmi"
import { client } from "../../../../configs/axios/axiosConfig"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { MarketContext } from "../../../../contexts/market/MarketContext"
import { SellTicketContext } from "../../../../contexts/market/SellTicketContext"
import { BotPreventionContext } from "../../../../contexts/user/BotPreventionContext"
import { EventTicket } from "../../../../dtos/ticket/ticket.dto"
import { useSmartContract } from "../../../../hooks/useSmartContract"
import { TicketTypeKey } from "../../../../interfaces/event/event.interface"
import { MarketTickets } from "../../../../interfaces/market/marketEvent.interface"
import { AlertType } from "../../../../interfaces/modal/alert.interface"
import { SellTicketFormSchema } from "../../../../schema/market/sellTicket.schema"
import ContainedButton from "../../../UI/button/ContainedButton"
import { ImageWithFallback } from "../../../UI/image/ImageWithFallback"
import ControlledCurrencyPriceSelect from "../../../UI/input/ControlledCurrencyPriceSelect"

function SellTicketStep2() {
  const {
    selectedTicket,
    setActiveStep,
    resalePrice,
    setResalePrice,
    setTicketListingSuccess
  } = useContext(SellTicketContext)
  const { marketTickets } = useContext(MarketContext)
  const { showErrorAlert } = useContext(LayoutContext)
  const { showRecaptcha, token: recaptchaToken } =
    useContext(BotPreventionContext)
  const { abi, bytecode, web3 } = useSmartContract()
  const { address } = useAccount()

  // States
  const [isListingTicket, setIsListingTicket] = useState(false)

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      resalePrice: resalePrice || 0,
      currency: marketTickets?.ticketCollection.currency ?? "ETH",
      minResalePrice: 0,
      maxResalePrice:
        marketTickets?.ticketCollection.ticketPrice[
          TicketTypeKey[
            selectedTicket?.ticketType ?? "GENERAL"
          ] as TicketTypeKey
        ]?.max ||
        marketTickets?.ticketCollection.ticketPrice[
          TicketTypeKey[
            selectedTicket?.ticketType ?? "GENERAL"
          ] as TicketTypeKey
        ]?.default
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SellTicketFormSchema,
    onSubmit: async (data) => {
      if (!recaptchaToken) {
        showRecaptcha()
        return
      }

      if (!marketTickets || !selectedTicket) return

      // Check web3
      if (
        !web3 ||
        !abi?.abi ||
        !bytecode ||
        !address ||
        selectedTicket.smartContractTicketId === undefined
      ) {
        showErrorAlert({
          type: AlertType.ERROR,
          title: "Web3 error",
          description:
            "ABI, bytecode, or wallet address unavailable. Please try again."
        })
        return
      }

      // Get the price in wei
      const toWei = (value: string | undefined) =>
        value ? web3.utils.toWei(value) : "0"
      const price = parseInt(toWei(data.resalePrice.toFixed(8)))

      // Call setTicketForSale from the smart contract
      setIsListingTicket(true)
      try {
        const contract = new web3.eth.Contract(abi.abi)
        contract.options.address = marketTickets.event.smartContractAddress
        contract.methods
          .setTicketForSale(
            selectedTicket.smartContractTicketId,
            price,
            TicketTypeKey[selectedTicket.ticketType]
          )
          .send({ from: address, gas: 5000000 })
          .then(async () => {
            saveTicketListingDetails(
              marketTickets,
              selectedTicket,
              data.resalePrice
            )
          })
          .catch(() => showTicketListingFailureAlert())
          .finally(() => setIsListingTicket(false))
      } catch (error) {
        showTicketListingFailureAlert()
        setIsListingTicket(false)
      }
    }
  })

  const saveTicketListingDetails = async (
    marketTickets: MarketTickets,
    selectedTicket: EventTicket,
    newResalePrice: number
  ) => {
    // TODO: Fix this. You need to also save the new ticket price
    const payload = {
      walletAddress: address,
      eventId: marketTickets.event._id,
      ticketCollectionId: marketTickets.ticketCollection._id,
      ticketId: selectedTicket._id,
      price: {
        amount: newResalePrice,
        currency: "ETH"
      }
    }
    try {
      // Save the ticket listing to the database
      const listTicketResult = await client.post(
        "ticket/transaction/list",
        payload
      )
      if (listTicketResult.data.success) showTicketListingSuccessAlert()
      setTicketListingSuccess(true)
      setActiveStep((value) => value + 1)
    } catch (error) {
      showRecordTicketListingFailureAlert()
      setTicketListingSuccess(false)
      setActiveStep((value) => value + 1)
    }
  }

  const showTicketListingSuccessAlert = () => {
    showErrorAlert({
      type: AlertType.INFO,
      title: "Ticket listed for sale",
      description: "Your ticket has been successfully listed for sale"
    })
  }

  const showTicketListingFailureAlert = () => {
    showErrorAlert({
      type: AlertType.ERROR,
      title: "Ticket listing failure",
      description: "Unable to list your ticket for sale. Please try again later"
    })
  }

  const showRecordTicketListingFailureAlert = () => {
    showErrorAlert({
      type: AlertType.ERROR,
      title: "Ticket history update failed",
      description: "Unable to update ticket history."
    })
  }

  if (!selectedTicket) return null
  return (
    <Box>
      <Box sx={{ my: 2, width: "100%" }} />
      <Typography variant="h6">Set your price</Typography>
      <Box sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{selectedTicket.name}</Typography>
        <ImageWithFallback
          src={selectedTicket.ticketMetadata[0].image}
          width={40}
          height={40}
          alt={selectedTicket.name}
          style={{ borderRadius: "8px" }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <ControlledCurrencyPriceSelect
        label="Ticket resale price"
        labelDescription={`The event organizer has allowed the max resale price to be ${values.maxResalePrice} ${marketTickets?.ticketCollection.currency}`}
        amountName="resalePrice"
        amountValue={values.resalePrice ?? 0}
        handleChange={handleChange}
        amountError={errors && errors?.resalePrice}
        currencyName="currency"
        currencyValue={values.currency}
      />
      <Divider sx={{ my: 2 }} />
      <Alert severity="warning">
        Notice: once the ticket is listed for resale, it can't be unlisted.
      </Alert>
      <Box sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <ContainedButton
          label="Back"
          variant="outlined"
          disabled={!selectedTicket}
          onClick={() => {
            setResalePrice(values.resalePrice)
            setActiveStep((value) => value - 1)
          }}
        />
        <ContainedButton
          label={recaptchaToken ? "List ticket for sale" : "Verify"}
          variant="contained"
          disabled={!selectedTicket}
          onClick={handleSubmit}
          isLoading={isListingTicket}
        />
      </Box>
    </Box>
  )
}

export default SellTicketStep2
