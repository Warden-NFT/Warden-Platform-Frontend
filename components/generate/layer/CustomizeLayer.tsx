import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import { grey } from "@mui/material/colors";
import { Reorder } from "framer-motion";
import Image from 'next/image'

function CustomizeLayer() {
      const { layeredAssets, setLayeredAssets } = useContext(GenerateLayerContext);

      return (
            <Stack spacing={2}>
                  <Typography>Drag each item to reorder</Typography>
                  <Reorder.Group axis="y" values={layeredAssets} onReorder={setLayeredAssets}>
                        {layeredAssets.map((layer, i) => (
                              <Reorder.Item key={layer.layerName} value={layer} style={{ listStyle: 'none' }}>
                                    <Stack direction="row">
                                          <Typography variant='h3' fontWeight='900' color={grey[300]}>{i + 1}.</Typography>
                                          <Box
                                                key={layer.layerName}
                                                sx={{
                                                      borderWidth: 1,
                                                      borderColor: "#efefef",
                                                      width: "100%",
                                                      height: 50,
                                                      backgroundColor: "white",
                                                      mb: 2,
                                                      py: 2,
                                                      pl: 2,
                                                      borderRadius: 3,
                                                      marginLeft: 2,
                                                      display: 'flex',
                                                      flexDirection: 'row',
                                                      alignItems: 'center'
                                                }}
                                          >
                                                <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                                                      <Box width='260px'>
                                                            <Typography fontWeight='600' textOverflow='ellipsis'>{layer.layerName}</Typography>
                                                      </Box>
                                                      <Stack direction='row' sx={{ width: 600, overflow: 'hidden', position: 'relative' }}>
                                                            {layer.assets.map((asset, j) =>
                                                                  <Box sx={{ mr: 1, backgroundColor: 'white', border: 1, borderColor: '#e0e0e0', width: 50, height: 50 }} key={j}>
                                                                        <Image src={asset.data} width='50' height='50' alt={`Uploaded ${asset.name}`} style={{ objectFit: 'contain' }} />
                                                                  </Box>
                                                            )}
                                                      </Stack>
                                                </Stack>
                                          </Box>
                                    </Stack>
                              </Reorder.Item>
                        ))}
                  </Reorder.Group>
            </Stack>
      );
}

export default CustomizeLayer;
