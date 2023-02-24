import { Box, Stack, Typography } from "@mui/material"
import { purple } from "@mui/material/colors"
import React, { useContext, useState } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { AlertType } from "../../../../interfaces/modal/alert.interface"
import { useAuthAccount } from "../../../../hooks/useAuthAccount"
import {
  AssetsMetadata,
  createAssetMetadata,
  createEventTicket,
  EventTicketsMetadata,
  setTicketToEvent,
  uploadAsset
} from "../../../../utils/generate/complete"
import { UserContext } from "../../../../contexts/user/UserContext"
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

    const assetsMetadata: AssetsMetadata = { general: [], vip: [] }
    const ticketMetadata: EventTicketsMetadata = { general: [], vip: [] }

    // Assets
    assetsMetadata.general = createAssetMetadata(
      uploadedAssets,
      assets,
      formInfo,
      "GENERAL"
    )

    assetsMetadata.vip = createAssetMetadata(
      uploadedVipAssets,
      vipAssets,
      formInfo,
      "VIP"
    )

    // Events
    ticketMetadata.general = createEventTicket(
      assetsMetadata.general,
      formInfo,
      address,
      user,
      "GENERAL",
      formInfo.price.general?.default ?? 0,
      formInfo.currency
    )
    ticketMetadata.vip = createEventTicket(
      assetsMetadata.general,
      formInfo,
      address,
      user,
      "VIP",
      formInfo.price.vip?.default ?? 0,
      formInfo.currency
    )

    try {
      if (assetsMetadata.general.length > 0) {
        await uploadAsset(assets, assetsMetadata.general, formInfo.subjectOf)
      }

      if (assetsMetadata.vip.length > 0 && formInfo.vipEnabled) {
        await uploadAsset(vipAssets, assetsMetadata.vip, formInfo.subjectOf)
      }

      await setTicketToEvent("complete", ticketMetadata, formInfo, user)

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
