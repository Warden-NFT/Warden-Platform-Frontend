import { Box, FormControl, Stack, Typography } from "@mui/material"
import { purple } from "@mui/material/colors"
import React, { useContext, useState } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { AlertType } from "../../../../interfaces/modal/alert.interface"
import { useAuthAccount } from "../../../../hooks/useAuthAccount"
import {
  createAssetMetadata,
  createEventTicket,
  setTicketToEvent,
  uploadAsset
} from "../../../../utils/generate/complete"
import { TicketsMetadata } from "../../../../dtos/ticket/metadata.dto"
import { UserContext } from "../../../../contexts/user/UserContext"
import { EventTicket } from "../../../../dtos/ticket/ticket.dto"
import ContainedButton from "../../../UI/button/ContainedButton"

function CreateCompleteTicketStep4() {
  const {
    setActiveStep,
    assets,
    vipAssets,
    uploadedAssets,
    uploadedVipAssets,
    formInfo
  } = useContext(GenerateCompleteContext)
  const { address } = useAuthAccount()
  const { setShowLoadingBackdrop, showErrorAlert } = useContext(LayoutContext)
  const { user } = useContext(UserContext)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  async function handleUpload() {
    setShowLoadingBackdrop(true)
    setUploading(true)

    const ticketMetadata: TicketsMetadata[] = createAssetMetadata(
      uploadedAssets,
      assets,
      formInfo,
      "GENERAL"
    )

    const vipTicketMetadata: TicketsMetadata[] = createAssetMetadata(
      uploadedVipAssets,
      vipAssets,
      formInfo,
      "VIP"
    )
    const generalAdmissionTickets: EventTicket[] = createEventTicket(
      ticketMetadata,
      formInfo,
      address,
      user
    )
    const vipTickets = createEventTicket(
      vipTicketMetadata,
      formInfo,
      address,
      user
    )

    try {
      if (ticketMetadata.length > 0) {
        await uploadAsset(assets, ticketMetadata, formInfo.subjectOf)
      }

      if (vipTicketMetadata.length > 0 && formInfo.vipEnabled) {
        await uploadAsset(vipAssets, vipTicketMetadata, formInfo.subjectOf)
      }

      const res = await setTicketToEvent(
        generalAdmissionTickets,
        vipTickets,
        formInfo,
        user
      )

      setShowLoadingBackdrop(false)
      setUploading(false)
      setUploaded(true)
    } catch (e) {
      setShowLoadingBackdrop(false)
      setUploading(false)
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Asset upload failed",
        description: "Your asset failed to upload. Please try again"
      })
    }
  }

  return (
    <FlatCard>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h3" component="h1">
          Customize NFTs Utility
        </Typography>
      </Box>
      {uploaded ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ padding: 2, backgroundColor: purple[50], borderRadius: 2 }}
        >
          <Box>
            <Typography variant="body1" component="h3" fontWeight="600">
              Congrats!
            </Typography>
            <Typography variant="subtitle1">
              Your tickets have been created!
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Box>
          <Typography variant="h5" component="h2">
            Recheck your ticket's information
          </Typography>
          <Typography>
            If you are ready to create, press the button below
          </Typography>
          <Box sx={{ marginY: 4 }}>
            <ContainedButton
              isLoading={uploading}
              label="Click to create ticket!"
              width="100%"
              variant="contained"
              onClick={handleUpload}
            />
          </Box>
        </Box>
      )}

      <ControlledStepperButtons
        isBackDisabled={uploaded === true}
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={() => setActiveStep((prev) => prev + 1)}
      />
    </FlatCard>
  )
}

export default CreateCompleteTicketStep4
