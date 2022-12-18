import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import ImageDropzone from "../../UI/input/ImageDropzone";

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
                        <Stack direction="row" sx={{ overflowX: "scroll" }}>
                              {uploadedAssets.map((asset, i) => (
                                    <Stack
                                          key={i}
                                          alignItems="center"
                                          sx={{
                                                boxShadow: 1,
                                                borderRadius: 2,
                                                mb: 2,
                                                width: 180,
                                                height: 220,
                                                mr: 1,
                                                backgroundColor: "white",
                                          }}
                                    >
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
                                                      width="180"
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
                              ))}
                        </Stack>
                  )}
                  <Box sx={{ p: 2 }}>
                        <ImageDropzone
                              uploadedAssets={uploadedAssets}
                              setUploadedAssets={setUploadedAssets}
                              setAssets={setAssets}
                        />
                  </Box>
            </Box>
      );
}

export default CompleteDropzone;
