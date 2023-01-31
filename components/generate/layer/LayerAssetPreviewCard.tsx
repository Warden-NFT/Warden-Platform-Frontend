import { Box, IconButton, Stack, Typography } from "@mui/material"
import { GridCloseIcon } from "@mui/x-data-grid"
import React, { useContext, useState } from "react"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { UploadedAsset } from "../../../interfaces/generate/file.interface"
import PNGAssetPreview from "../../assets/PNGAssetPreview"
import { motion, Variants } from "framer-motion"

interface Props {
  asset: UploadedAsset
  layerIndex: number
  assetIndex: number
}

function LayerAssetPreviewCard({ asset, layerIndex, assetIndex }: Props) {
  const { layers, setLayers } = useContext(GenerateLayerContext)

  function removeAsset(layerIndex: number, assetIndex: number) {
    const _layers = [...layers]
    const _assets = [..._layers[layerIndex].assets]
    _assets.splice(assetIndex, 1)
    _layers[layerIndex].assets = _assets
    setLayers(_layers)
  }

  const variant: Variants = {
    rest: {
      x: 0,
      y: 0
    },
    hover: {
      y: -6,
      boxShadow: "5px 5px 0 #f50057"
    }
  }

  const buttonVariant: Variants = {
    rest: {
      opacity: 0
    },
    hover: {
      opacity: 1,
      y: -6,
      boxShadow: "3px 3px 0 #f50057",
      borderRadius: "50%",
      transition: {
        duration: 0.5,
        type: "spring"
      }
    }
  }
  const textVariant: Variants = {
    rest: {},
    hover: {
      color: "#f50057",
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      whileHover="hover"
      animate="rest"
      initial="rest"
      style={{ position: "relative" }}
    >
      <motion.div
        variants={buttonVariant}
        style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}
      >
        <IconButton
          onClick={() => removeAsset(layerIndex, assetIndex)}
          size="small"
          aria-label="Delete asset"
          component="label"
          sx={{
            backgroundColor: "white",
            border: 1,
            borderColor: "black",
            "&:hover": {
              backgroundColor: "white"
            }
          }}
        >
          <GridCloseIcon fontSize="small" sx={{ color: "black" }} />
        </IconButton>
      </motion.div>
      <motion.div variants={variant}>
        <Box
          sx={{
            position: "relative",
            height: "220px",
            width: "160px",
            overflow: "hidden",
            border: 2
          }}
        >
          <Stack>
            <PNGAssetPreview
              name={asset.name}
              data={asset.data}
              width={160}
              height={160}
            />
            <Box sx={{ height: "60px", padding: 2 }}>
              <motion.div variants={textVariant}>
                <Typography
                  component="p"
                  fontSize={18}
                  fontWeight="600"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {asset.name}
                </Typography>
              </motion.div>
            </Box>
          </Stack>
        </Box>
      </motion.div>
    </motion.div>
  )
}

export default LayerAssetPreviewCard
