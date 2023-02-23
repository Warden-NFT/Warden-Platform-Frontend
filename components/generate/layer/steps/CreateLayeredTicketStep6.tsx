import React, { useContext, useEffect, useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { purple } from "@mui/material/colors"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { GenerateLayerContext } from "../../../../contexts/generate/GenerateLayerContext"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import ContainedButton from "../../../UI/button/ContainedButton"
import { TicketsMetadata } from "../../../../dtos/ticket/metadata.dto"
import {
  formatAssetMetadata,
  formatLayeredAssetMetadata
} from "../../../../utils/generate/layer"
import {
  createEventTicket,
  uploadAsset,
  uploadEventTicket
} from "../../../../utils/generate/complete"
import { EventTicket } from "../../../../dtos/ticket/ticket.dto"
import { UserContext } from "../../../../contexts/user/UserContext"
import { useAuthAccount } from "../../../../hooks/useAuthAccount"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"

interface TicketMetadataBlob {
  metadata: TicketsMetadata
  blob: Blob
}

function CreateLayeredTicketStep6() {
  const {
    setActiveStep,
    metadataBlob,
    metadata: layeredGeneratedMetadata,
    formInfo,
    layers,
    assets
  } = useContext(GenerateLayerContext)

  const { setShowLoadingBackdrop } = useContext(LayoutContext)
  const { user } = useContext(UserContext)
  const { address } = useAuthAccount()

  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [assetMedata, setAssetMetadata] = useState<TicketsMetadata[]>([])
  const [assetFiles, setAssetFiles] = useState<File[]>([])
  const [generatedMetadata, setGeneratedAssetsMetadata] = useState<{
    general: TicketMetadataBlob[]
    vip?: TicketMetadataBlob[]
    reserved?: TicketMetadataBlob[]
  }>()

  useEffect(() => {
    if (!user || !user._id) return

    const _assetMetadata: TicketsMetadata[] = []
    const assetFiles: File[] = []

    layers.forEach((layer) => {
      layer.assets.forEach((asset) => {
        const metadata = formatAssetMetadata(layer, asset, formInfo)
        _assetMetadata.push(metadata)
        assetFiles.push(asset.file)
      })
    })

    const { regulars, vips } = formatLayeredAssetMetadata(
      layeredGeneratedMetadata,
      formInfo,
      metadataBlob
    )
    setGeneratedAssetsMetadata({
      general: regulars,
      vip: vips
    })
    setAssetFiles(assetFiles)
    setAssetMetadata(_assetMetadata)
  }, [layers])

  async function handleUpload() {
    // setShowLoadingBackdrop(true)
    // setUploading(true)
    // upload individual asset

    console.log("uploading")

    let eventTickets: EventTicket[] = []
    await uploadAsset(assetFiles, assetMedata, `${formInfo.subjectOf}/assets`)

    try {
      console.log("1")

      if (generatedMetadata?.general) {
        console.log("2")
        const files: File[] = generatedMetadata.general.map(
          (m) => new File([m.blob], `${m.metadata.name}.PNG`)
        )
        const metadata = generatedMetadata.general.map((m) => m.metadata)
        const eventMetadata = createEventTicket(
          metadata,
          formInfo,
          address,
          user,
          "GENERAL"
        )
        eventTickets = [...eventTickets, ...eventMetadata]
        await uploadAsset(files, metadata, `${formInfo.subjectOf}/generated`)
      }

      if (generatedMetadata?.vip) {
        console.log("3")
        const files: File[] = generatedMetadata.vip.map(
          (m) => new File([m.blob], `${m.metadata.name}.PNG`)
        )
        const metadata = generatedMetadata.vip.map((m) => m.metadata)
        const eventMetadata = createEventTicket(
          metadata,
          formInfo,
          address,
          user,
          "VIP"
        )
        eventTickets = [...eventTickets, ...eventMetadata]
        await uploadAsset(files, metadata, `${formInfo.subjectOf}/generated`)
      }
    } catch (e) {
      setShowLoadingBackdrop(false)
      setUploading(false)
    }

    //TODO: ADD RESERVE SEATS?
  }

  async function handleDownloadAssetFiles() {
    const zip = new JSZip()

    const generatedDir = zip.folder(`${formInfo.name}/generated`)
    const assetsDir = zip.folder(`${formInfo.name}/assets`)

    if (generatedDir) {
      generatedDir.file("metadata.json", JSON.stringify(generatedMetadata))
      layeredGeneratedMetadata.forEach((data, i) => {
        generatedDir.file(`${data?.name}.png`, metadataBlob[i], {
          binary: true
        })
      })
    }

    if (assetsDir) {
      assetsDir.file("metadata.json", JSON.stringify(assetMedata))
      assets.forEach((asset) => {
        assetsDir.file(asset.name, asset, { binary: true })
      })
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${formInfo.name}.zip`)
    })
  }

  return (
    <Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h3" component="h1">
          Customize NFTs Utility
        </Typography>
        <Typography component="h2">
          Recheck your ticket's information
        </Typography>
      </Box>
      <Stack spacing={2}>
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>If you are ready</Typography>
            <Box sx={{ width: "280px" }}>
              <ContainedButton
                // isLoading={uploading}
                label="Create ticket"
                width="100%"
                variant="contained"
                onClick={handleUpload}
              />
            </Box>
          </Stack>
        )}
        {/* TODO: allow user to check VIP ticket */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Download your generated assets here</Typography>
          <Box sx={{ width: "280px" }}>
            <ContainedButton
              variant="contained"
              label="Download generated assets"
              onClick={handleDownloadAssetFiles}
            />
          </Box>
        </Stack>
      </Stack>

      <ControlledStepperButtons
        isBackDisabled={uploaded === true}
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={() => setActiveStep((prev) => prev + 1)}
      />
    </Box>
  )
}

export default CreateLayeredTicketStep6
