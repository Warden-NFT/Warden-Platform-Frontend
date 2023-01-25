import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import React, { useCallback, useContext } from "react"
import { useDropzone } from "react-dropzone"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"

import {
  extractFolderName,
  extractFolderNames
} from "../../../utils/assets/detail"
import {
  categorizeAssetsIntoLayer,
  readLayeredAsset
} from "../../../utils/assets/layer"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"

function LayeredDropzone() {
  const { setAssets, setLayers, setActiveStep } =
    useContext(GenerateLayerContext)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // FIXME: Not allow upload without files
    // Do not accept any file without name

    setAssets(acceptedFiles)
    const layerNames = extractFolderNames(acceptedFiles)
    const layerAssets = categorizeAssetsIntoLayer(layerNames)

    await Promise.all(
      acceptedFiles.map(async (file) => {
        const asset = await readLayeredAsset(file)
        const name = extractFolderName(file)
        const index = layerAssets.findIndex((asset) => asset.layerName === name)
        if (index !== -1) {
          layerAssets[index].assets.push(asset)
        }
      })
    )

    setLayers(layerAssets)
  }, [])

  function handleNext() {
    setActiveStep((prev) => prev + 1)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // note: accept only folders with images
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/gif": []
    }
  })
  return (
    <Box>
      <Container
        sx={{
          backgroundColor: "white",
          minHeight: 140,
          borderWidth: 2,
          borderColor: "primary.main",
          borderRadius: 3,
          borderStyle: "dashed",
          display: "grid",
          placeItems: "center",
          marginY: 4
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Image
            src="/images/generate/dropzone-drag-active.png"
            width="100"
            height="100"
            alt="Accepting Files"
          />
        ) : (
          <Typography>Drag files OR Click to select</Typography>
        )}
      </Container>
      <ControlledStepperButtons handleNext={handleNext} />
    </Box>
  )
}

export default LayeredDropzone
