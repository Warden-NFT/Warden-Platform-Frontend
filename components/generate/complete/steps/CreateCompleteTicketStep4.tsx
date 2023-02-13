import { Box, CircularProgress, Stack, Typography } from "@mui/material"
import { purple } from "@mui/material/colors"
import React, { useContext, useEffect, useState } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { useStorageBucket } from "../../../../hooks/useStorageBucket"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { AlertType } from "../../../../interfaces/modal/alert.interface"
import { useAuthAccount } from "../../../../hooks/useAuthAccount"
import {
  createTicketMetadata,
  uploadEventTicketMetadata
} from "../../../../utils/generate/complete"
import { TicketsMetadata } from "../../../../dtos/ticket/metadata.dto"

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
  const { saveFile } = useStorageBucket()
  const { setShowLoadingBackdrop, showErrorAlert } = useContext(LayoutContext)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setShowLoadingBackdrop(true)

    async function fn() {
      setUploading(true)
      const ticketMetadata: TicketsMetadata[] = createTicketMetadata(
        uploadedAssets,
        formInfo,
        "GENERAL"
      )
      const vipTicketMetadata: TicketsMetadata[] = createTicketMetadata(
        uploadedVipAssets,
        formInfo,
        "VIP"
      )

      try {
        if (ticketMetadata.length > 0) {
          await saveFile(assets, formInfo.subjectOf, ticketMetadata)
          await uploadEventTicketMetadata(ticketMetadata, formInfo, address)
        }

        if (vipTicketMetadata.length > 0 && formInfo.vipEnabled) {
          await saveFile(vipAssets, formInfo.subjectOf, vipTicketMetadata)
        }

        setShowLoadingBackdrop(false)
        setUploading(false)
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

    fn()
  }, [])

  return (
    <FlatCard>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h3" component="h1">
          Customize NFTs Utility
        </Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 2, backgroundColor: purple[50], borderRadius: 2 }}
      >
        <Box>
          <Typography variant="body1" component="h3" fontWeight="600">
            Uploading your assets
          </Typography>
          <Typography variant="subtitle1">
            Hang tight! Your files are uploading...
          </Typography>
        </Box>
        {uploading && <CircularProgress />}
      </Stack>

      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={() => setActiveStep((prev) => prev + 1)}
      />
    </FlatCard>
  )
}

export default CreateCompleteTicketStep4
