import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import {
      LayeredAssetData,
      UploadedAsset,
} from "../../../interfaces/generate/file.interface";
import LayeredDropzone from "./LayeredDropzone";

function LayerAssetGallery() {
      const { layeredAssets } = useContext(GenerateLayerContext);
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
                                    <Typography>{layer.layerName}</Typography>
                                    <Stack direction="row" sx={{ overflowX: "scroll" }}>
                                          {layer.assets.map((asset, j) => (
                                                <Box
                                                      sx={{
                                                            mr: 1,
                                                            display: "grid",
                                                            placeItems: "center",
                                                            backgroundColor: "white",
                                                            borderBottomLeftRadius: 4,
                                                            borderBottomRightRadius: 4,
                                                            boxShadow: 1,
                                                      }}
                                                >
                                                      <Image
                                                            key={j}
                                                            src={asset.data}
                                                            width={80}
                                                            height={80}
                                                            alt={`Uploaded ${asset.name}`}
                                                            style={{ objectFit: "contain" }}
                                                      />
                                                      <Typography fontSize={12}>{asset.name}</Typography>
                                                </Box>
                                          ))}
                                    </Stack>
                              </Box>
                        ))}
                  </Stack>
                  <LayeredDropzone />
            </Box>
      );
}

export default LayerAssetGallery;
