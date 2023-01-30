import { Box, IconButton, Stack, Typography } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import { UploadedCompleteAsset } from "../../../interfaces/generate/file.interface"
import { motion } from "framer-motion"
import CloseIcon from "@mui/icons-material/Close"
import Image from "next/image"

interface Props {
  assets: File[]
  setAssets: Dispatch<SetStateAction<File[]>>
  uploads: UploadedCompleteAsset[]
  setUploads: Dispatch<SetStateAction<UploadedCompleteAsset[]>>
  header?: string
}

function UploadedAssetPreviewList({
  assets,
  setAssets,
  uploads,
  setUploads,
  header
}: Props) {
  function handleRemoveAsset(index: number) {
    const _assets = [...assets]
    _assets.splice(index, 1)

    const _uploads = [...uploads]
    _uploads.splice(index, 1)

    setAssets(_assets)
    setUploads(_uploads)
  }

  return (
    <Stack sx={{ marginY: 4 }}>
      {header && <Typography variant="h4">{header}</Typography>}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        sx={{ marginTop: 2 }}
      >
        {uploads.map((asset, i) => (
          <motion.div
            key={i}
            transition={{ type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <Stack
              sx={{
                mb: 2,
                width: 170,
                height: 220,
                mr: 1,
                backgroundColor: "white",
                boxShadow: 4
              }}
            >
              <Box
                sx={{
                  pr: 2,
                  width: "100%",
                  display: "grid",
                  placeItems: "end"
                }}
              >
                <IconButton
                  aria-label="delete"
                  color="primary"
                  size="small"
                  onClick={() => handleRemoveAsset(i)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box>
                <Image
                  src={asset.data}
                  width="170"
                  height="140"
                  alt={asset.name}
                  draggable={false}
                  style={{
                    objectFit: "cover"
                  }}
                />
              </Box>
              <Box sx={{ p: 1 }}>
                <Typography
                  fontWeight="600"
                  fontSize={10}
                  textAlign="center"
                  textOverflow="ellipsis"
                >
                  {asset.name}
                </Typography>
              </Box>
            </Stack>
          </motion.div>
        ))}
      </Stack>
    </Stack>
  )
}

export default UploadedAssetPreviewList
