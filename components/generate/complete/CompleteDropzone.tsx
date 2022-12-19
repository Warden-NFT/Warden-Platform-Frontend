import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import CompleteAssetDropzone from "./CompleteAssetDropzone";
import CloseIcon from "@mui/icons-material/Close";

function CompleteDropzone() {
      const { assets, setAssets, uploadedAssets, setUploadedAssets } = useContext(
            GenerateCompleteContext
      );

      function handleRemoveAsset(index: number) {
            const _assets = [...assets];
            _assets.splice(index, 1);

            const _uploadedAssets = [...uploadedAssets];
            _uploadedAssets.splice(index, 1);

            setAssets(_assets);
            setUploadedAssets(_uploadedAssets);
      }

      return (
            <Box sx={{ height: "100%", p: 2, width: "container" }}>
                  {uploadedAssets.length > 0 && (
                        <Grid container spacing={1} columns={[2, 3, 4]}>
                              {uploadedAssets.map((asset, i) => (
                                    <Grid item>
                                          <Stack sx={{
                                                boxShadow: 1,
                                                borderRadius: 2,
                                                mb: 2,
                                                width: 170,
                                                height: 220,
                                                mr: 1,
                                                backgroundColor: "white",
                                          }}>
                                                <Box
                                                sx={{
                                                      pr: 2,
                                                      width: "100%",
                                                      display: "grid",
                                                      placeItems: "end",
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
                                                      style={{
                                                            objectFit: "cover",
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
                                    </Grid>
                              ))}
                        </Grid>
                  )}
                  <Box sx={{ p: 2 }}>
                        <CompleteAssetDropzone
                              setUploadedAssets={setUploadedAssets}
                              setAssets={setAssets}
                        />
                  </Box>
            </Box>
      );
}

export default CompleteDropzone;
