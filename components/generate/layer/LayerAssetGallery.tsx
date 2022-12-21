import { Box, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import LayeredDropzone from "./LayeredDropzone";
import CloseIcon from "@mui/icons-material/Close";

function LayerAssetGallery() {
      const { layeredAssets, setLayeredAssets } = useContext(GenerateLayerContext);

      function removeAsset(layerIndex: number, assetIndex: number) {
            const _layeredAssets = [...layeredAssets]
            const _assets = [..._layeredAssets[layerIndex].assets]
            _assets.splice(assetIndex, 1)
            _layeredAssets[layerIndex].assets = _assets
            setLayeredAssets(_layeredAssets)
      }

      return (
            <Box sx={{ width: "100%" }}>
                  <Stack
                        direction="column"
                        sx={{ overflowY: "scroll", minHeight: 200, maxHeight: 600 }}
                  >
                        {layeredAssets.map((layer, i) => (
                              <Box
                                    sx={{
                                          borderRadius: 2,
                                          px: 2,
                                          py: 2,
                                          mb: 2,
                                          backgroundColor: "white",
                                    }}
                                    key={i}
                              >
                                    <Typography fontWeight="600" sx={{ mb: 2 }}>
                                          {layer.layerName}
                                    </Typography>

                                    <Box
                                          sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                overflowX: "scroll",
                                          }}
                                    >
                                          {layer.assets.map((asset, j) => (
                                                <Box
                                                      key={j}
                                                      sx={{
                                                            mr: 1,
                                                            display: "grid",
                                                            placeItems: "center",
                                                            position: "relative",
                                                      }}
                                                >
                                                      <Box position="absolute" sx={{ right: 0, top: -8 }}>
                                                            <IconButton
                                                                  onClick={() => removeAsset(i, j)}
                                                                  size="small"
                                                                  aria-label="Delete asset"
                                                                  component="label"
                                                            >
                                                                  <CloseIcon fontSize="small" />
                                                            </IconButton>
                                                      </Box>
                                                      <Image
                                                            key={j}
                                                            src={asset.data}
                                                            width={100}
                                                            height={100}
                                                            alt={`Uploaded ${asset.name}`}
                                                            style={{ objectFit: "contain", borderRadius: "50%" }}
                                                      />
                                                      <Typography fontSize={12}>{asset.name}</Typography>
                                                </Box>
                                          ))}
                                    </Box>
                              </Box>
                        ))}
                  </Stack>
                  <LayeredDropzone />
            </Box>
      );
}

export default LayerAssetGallery;
