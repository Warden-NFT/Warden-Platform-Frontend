import React, { useContext, useState } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { purple } from "@mui/material/colors"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { GenerateLayerContext } from "../../../../contexts/generate/GenerateLayerContext"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import ContainedButton from "../../../UI/button/ContainedButton"

function CreateLayeredTicketStep6() {
  const { setActiveStep, metadataBlob, metadata, formInfo } =
    useContext(GenerateLayerContext)

  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  function handleUpload() {
    return
  }

  function handleDownloadAssetFiles() {
    const zip = new JSZip()

    const img = zip.folder(formInfo.name)
    metadata.forEach((data, i) => {
      if (img) {
        img.file(`${data?.name}.png`, metadataBlob[i], { binary: true })
      }
    })

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
                isLoading={uploading}
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
