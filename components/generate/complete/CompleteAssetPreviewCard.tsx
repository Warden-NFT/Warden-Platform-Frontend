import { Box, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { UploadedAsset } from "../../../interfaces/generate/file.interface"
import PNGAssetPreview from "../../assets/PNGAssetPreview"
import { motion, Variants } from "framer-motion"
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext"
import ContainedButton from "../../UI/button/ContainedButton"
import { grey } from "@mui/material/colors"

interface Props {
  asset: UploadedAsset
  assetIndex: number
  isVip?: boolean
}

function CompleteAssetPreviewCard({ asset, assetIndex, isVip }: Props) {
  const {
    uploadedAssets,
    uploadedVipAssets,
    setUploadedAssets,
    setUploadedVipAssets
  } = useContext(GenerateCompleteContext)

  function removeAsset(assetIndex: number) {
    if (!isVip) {
      const _uploadedAssets = [...uploadedAssets]
      _uploadedAssets.splice(assetIndex, 1)
      setUploadedAssets(_uploadedAssets)
    } else {
      const _uploadedVipAssets = [...uploadedVipAssets]
      _uploadedVipAssets.splice(assetIndex, 1)
      setUploadedVipAssets(_uploadedVipAssets)
    }
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
      transition: {
        duration: 0.5,
        type: "spring"
      }
    }
  }
  const textVariant: Variants = {
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
            maxHeight: "340px",
            width: "240px",
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
                width={200}
                height={200}
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
                  fontSize={18}
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
                  {isVip && (
                    <Box
                      sx={{
                        borderRadius: "20px",
                        border: 1.5,
                        display: "grid",
                        placeItems: "center",
                        width: "40px",
                        height: "20px",
                        "&:hover": {
                          cursor: "pointer"
                        }
                      }}
                    >
                      <Typography fontSize="11px">VIP</Typography>
                    </Box>
                  )}
                </Stack>
              </motion.div>
            </Box>
            <motion.div
              variants={buttonVariant}
              style={{ position: "absolute", top: 110, left: 70, zIndex: 100 }}
            >
              <ContainedButton
                label="Remove"
                variant="contained"
                onClick={() => removeAsset(assetIndex)}
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

export default CompleteAssetPreviewCard
