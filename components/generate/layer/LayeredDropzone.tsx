import { Container, Typography } from "@mui/material"
import { amber, grey, yellow } from "@mui/material/colors"
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

function LayeredDropzone() {
  const { setAssets, setLayers } = useContext(GenerateLayerContext)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // FIXME: Not allow upload without files
    // Do not accept any file without name

    setAssets(acceptedFiles)
    const layerNames = extractFolderNames(acceptedFiles)
    const layerAssets = categorizeAssetsIntoLayer(layerNames)

    await Promise.all(
      acceptedFiles.map(async (file, i) => {
        const asset = await readLayeredAsset(file, i)
        const name = extractFolderName(file)
        const index = layerAssets.findIndex((asset) => asset.layerName === name)
        if (index !== -1) {
          layerAssets[index].assets.push(asset)
        }
      })
    )

    setLayers(layerAssets)
  }, [])

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
          backgroundColor: grey[200],
          minHeight: 140,
          borderWidth: 2,
          borderRadius: 2,
          borderColor: "primary.main",
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
    </Box>
  )
}

export default LayeredDropzone
