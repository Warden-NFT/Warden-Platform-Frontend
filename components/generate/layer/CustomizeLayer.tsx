import { Box, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { Reorder } from "framer-motion"
import AssetCanvasCard from "../asset/AssetCanvasCard"
import PNGAssetPreview from "../../assets/PNGAssetPreview"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import { motion } from "framer-motion"

function CustomizeLayer() {
  const { layers, setLayers, setActiveStep } = useContext(GenerateLayerContext)

  return (
    <Box
      sx={{
        padding: 4,
        display: "grid",
        placeItems: "center",
        borderRadius: 4,
        marginY: 4,
        backgroundColor: "white"
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row">
          <Stack alignItems="center">
            <AssetCanvasCard
              name="Preview"
              data={layers.map((layer) => layer.assets[0].data)}
              width={200}
              height={200}
            />
            <Typography component="p" sx={{ mt: 2 }}>
              Preview Image
            </Typography>
          </Stack>
          <Box>
            <Typography variant="h5" component="h1" sx={{ ml: 8 }}>
              Drag each item to reorder
            </Typography>
            <Typography variant="caption" component="p" sx={{ ml: 8 }}>
              The order will determine how your ticket will be generated
            </Typography>
            <Reorder.Group axis="y" values={layers} onReorder={setLayers}>
              {layers.map((layer, i) => (
                <Reorder.Item
                  key={layer.layerName}
                  value={layer}
                  style={{ listStyle: "none", cursor: "pointer" }}
                >
                  <motion.div
                    whileHover={{
                      y: -6,
                      boxShadow: "5px 5px 0 rgb(0, 0, 0)",
                      borderRadius: "20px"
                    }}
                    whileTap={{
                      backgroundColor: "rgba(0,0,0,1)",
                      color: "rgb(255,255,255)",
                      boxShadow: "0px 0px 0 rgb(0, 0, 0)",
                      y: 0
                    }}
                    style={{
                      border: "2px solid black",
                      borderRadius: "20px",
                      marginBottom: 10
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        paddingX: 3
                      }}
                    >
                      <Box width="50px">
                        <Typography variant="h5">{i + 1}.</Typography>
                      </Box>
                      <Box
                        key={layer.layerName}
                        sx={{
                          borderWidth: 1,
                          borderColor: "#efefef",
                          width: "500px",
                          height: 50,
                          py: 2,
                          pl: 2,
                          borderRadius: 3,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          width="100%"
                          marginRight="20px"
                        >
                          <Box width="260px">
                            <Typography
                              fontWeight="600"
                              textOverflow="ellipsis"
                            >
                              {layer.layerName}
                            </Typography>
                          </Box>
                          <Stack
                            direction="row"
                            sx={{
                              width: 600,
                              overflowX: "scroll",
                              overflowY: "hidden",
                              position: "relative"
                            }}
                          >
                            {layer.assets.map((asset, j) => (
                              <Box
                                sx={{
                                  mr: 1,
                                  backgroundColor: "white",
                                  border: 1,
                                  borderColor: "#e0e0e0",
                                  width: 54,
                                  display: "grid",
                                  placeItems: "center"
                                }}
                                key={j}
                              >
                                <PNGAssetPreview
                                  name={asset.name}
                                  data={asset.data}
                                  width={50}
                                  height={50}
                                />
                              </Box>
                            ))}
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ marginTop: 4, width: "100%" }}>
        <ControlledStepperButtons
          handlePrevious={() => setActiveStep((prev) => prev - 1)}
          handleNext={() => setActiveStep((prev) => prev + 1)}
        />
      </Box>
    </Box>
  )
}

export default CustomizeLayer
