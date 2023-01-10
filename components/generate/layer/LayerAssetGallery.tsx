import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import LayeredDropzone from "./LayeredDropzone";
import LayerAssetPreviewCard from "./LayerAssetPreviewCard";

function LayerAssetGallery() {
      const { layeredAssets, setLayeredAssets } = useContext(GenerateLayerContext);

      return (
            <Box sx={{ width: "100%" }}>
                  <Stack
                        direction="column"
                        // sx={{ overflowY: "scroll", minHeight: 200, maxHeight: 600 }}
                  >
                        {layeredAssets.map((layer, i) => (
                              <Box
                                    sx={{
                                          borderRadius: 2,
                                          px: 2,
                                          py: 2,
                                          mb: 2,
                                          backgroundColor: "white",
                                          height: 180
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
                                                <LayerAssetPreviewCard asset={asset} layerIndex={i} assetIndex={j} />
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
