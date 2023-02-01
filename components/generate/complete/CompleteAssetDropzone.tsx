import { Container, SxProps, Theme, Typography } from "@mui/material"
import Image from "next/image"
import React, { Dispatch, SetStateAction, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { UploadedCompleteAsset } from "../../../interfaces/generate/file.interface"
import {
  getAssetDimension,
  getAssetFileName,
  getAssetFileURL
} from "../../../utils/assets/detail"

interface Props {
  assets: File[]
  setAssets: Dispatch<SetStateAction<File[]>>
  setUploadedAssets: Dispatch<SetStateAction<UploadedCompleteAsset[]>>
  dragLabel: string
  sx?: SxProps<Theme>
}

function CompleteAssetDropzone({
  assets,
  setAssets,
  setUploadedAssets,
  dragLabel,
  sx
}: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file, i) => {
      const found = assets.find((asset) => asset.name === file.name)
      if (found) {
        return
      }

      setAssets((prev) => [...prev, file])
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = async () => {
        const url = await getAssetFileURL(file)
        const dimensions = await getAssetDimension(url)
        if (!url || !dimensions) return

        const asset: UploadedCompleteAsset = {
          id: i + 1,
          name: getAssetFileName(file),
          dimension: dimensions,
          data: url,
          quantity: 1,
          occurrence: 100
        }

        setUploadedAssets((prev) => [...prev, asset])
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Container
      sx={{ minHeight: 140, display: "grid", placeItems: "center", ...sx }}
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
        <Typography>{dragLabel}</Typography>
      )}
    </Container>
  )
}

export default CompleteAssetDropzone
