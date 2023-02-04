import { Box, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { UploadedAsset } from "../../../interfaces/generate/file.interface"
import PNGAssetPreview from "../../assets/PNGAssetPreview"
import { motion, Variants } from "framer-motion"
import ContainedButton from "../../UI/button/ContainedButton"
import { grey } from "@mui/material/colors"

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

    if (_layers[layerIndex].assets.length === 0) {
      _layers.splice(layerIndex, 1)
    }
    setLayers(_layers)
  }

  const variant: Variants = {
    rest: {
      x: 0,
      y: 0
    },
    hover: {
      y: -6
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
      <motion.div variants={variant}>
        <Box
          sx={{
            position: "relative",
            maxHeight: "240px",
            width: "160px",
            overflow: "hidden",
            border: 2,
            marginRight: 2,
            marginBottom: 2,
            borderRadius: 2
          }}
        >
          <Stack>
            <Box p={2} sx={{ display: "grid", placeItems: "center" }}>
              <PNGAssetPreview
                name={asset.name}
                data={asset.data}
                width={120}
                height={120}
                showPngGrid
                sx={{ border: 2 }}
              />
            </Box>
            <Box sx={{ borderBottom: 2 }} />

            <Box
              sx={{ padding: 2, backgroundColor: grey[300], height: "auto" }}
            >
              <motion.div variants={textVariant}>
                <Typography
                  component="p"
                  fontSize={15}
                  fontWeight="600"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {asset.name}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontSize="11px">
                    {asset.dimension.width} x {asset.dimension.height}
                  </Typography>
                </Stack>
              </motion.div>
            </Box>
            <motion.div
              variants={buttonVariant}
              style={{ position: "absolute", top: 70, left: 30, zIndex: 100 }}
            >
              <ContainedButton
                label="Remove"
                variant="contained"
                onClick={() => removeAsset(layerIndex, assetIndex)}
                sx={{
                  backgroundColor: "#f50057",
                  "&:hover": {
                    backgroundColor: "#bf0245"
                  }
                }}
              />
            </motion.div>
          </Stack>
        </Box>
      </motion.div>
    </motion.div>
  )
}

export default LayerAssetPreviewCard
