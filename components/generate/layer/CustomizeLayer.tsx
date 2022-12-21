import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import { grey } from "@mui/material/colors";
import { Reorder } from "framer-motion";
import Image from "next/image";
import AssetCanvasCard from "../asset/AssetCanvasCard";
import { LayeredAssetData } from "../../../interfaces/generate/file.interface";

function CustomizeLayer() {
      const { layeredAssets, setLayeredAssets } = useContext(GenerateLayerContext);
      const [reversedAsset, setReversedAssets] = useState<LayeredAssetData[]>([]);

      useEffect(() => {
            const _layeredAssets = [...layeredAssets]
            _layeredAssets.reverse()
            setReversedAssets(_layeredAssets)
      }, [layeredAssets])

      return (
            <Stack spacing={2}>
                  <Stack direction="row">
                        <Stack alignItems='center'>
                              <AssetCanvasCard
                                    data={reversedAsset.map((layer) => layer.assets[0].data)}
                                    width={200}
                                    height={200}
                              />
                              <Typography sx={{ mt: 2 }}>Preview Image</Typography>
                        </Stack>
                        <Box>
                              <Typography sx={{ ml: 8 }}>Drag each item to reorder</Typography>
                              <Reorder.Group
                                    axis="y"
                                    values={layeredAssets}
                                    onReorder={setLayeredAssets}
                              >
                                    {layeredAssets.map((layer, i) => (
                                          <Reorder.Item
                                                key={layer.layerName}
                                                value={layer}
                                                style={{ listStyle: "none" }}
                                          >
                                                <Stack direction="row">
                                                      <Box width='50px'>
                                                            <Typography variant="h3" fontWeight="900" color={grey[300]}>
                                                                  {i + 1}.
                                                            </Typography>
                                                      </Box>
                                                      <Box
                                                            key={layer.layerName}
                                                            sx={{
                                                                  borderWidth: 1,
                                                                  borderColor: "#efefef",
                                                                  width: "500px",
                                                                  height: 50,
                                                                  backgroundColor: "white",
                                                                  mb: 2,
                                                                  py: 2,
                                                                  pl: 2,
                                                                  borderRadius: 3,
                                                                  marginLeft: 2,
                                                                  display: "flex",
                                                                  flexDirection: "row",
                                                                  alignItems: "center",
                                                            }}
                                                      >
                                                            <Stack
                                                                  direction="row"
                                                                  justifyContent="space-between"
                                                                  alignItems="center"
                                                                  width="100%"
                                                            >
                                                                  <Box width="260px">
                                                                        <Typography fontWeight="600" textOverflow="ellipsis">
                                                                              {layer.layerName}
                                                                        </Typography>
                                                                  </Box>
                                                                  <Stack
                                                                        direction="row"
                                                                        sx={{
                                                                              width: 600,
                                                                              overflow: "hidden",
                                                                              position: "relative",
                                                                        }}
                                                                  >
                                                                        {layer.assets.map((asset, j) => (
                                                                              <Box
                                                                                    sx={{
                                                                                          mr: 1,
                                                                                          backgroundColor: "white",
                                                                                          border: 1,
                                                                                          borderColor: "#e0e0e0",
                                                                                          width: 50,
                                                                                          height: 50,
                                                                                    }}
                                                                                    key={j}
                                                                              >
                                                                                    <Image
                                                                                          src={asset.data}
                                                                                          width="50"
                                                                                          height="50"
                                                                                          alt={`Uploaded ${asset.name}`}
                                                                                          style={{ objectFit: "contain" }}
                                                                                    />
                                                                              </Box>
                                                                        ))}
                                                                  </Stack>
                                                            </Stack>
                                                      </Box>
                                                </Stack>
                                          </Reorder.Item>
                                    ))}
                              </Reorder.Group>
                        </Box>
                  </Stack>
            </Stack>
      );
}

export default CustomizeLayer;
