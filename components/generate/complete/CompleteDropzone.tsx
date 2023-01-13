import { Box, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import CompleteAssetDropzone from "./CompleteAssetDropzone";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

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
            <Box sx={{ p: 4, display: 'grid', placeItems: 'center' }}>
                  {uploadedAssets.length > 0 && (
                        <Stack direction='row' flexWrap='wrap' justifyContent='space-evenly'>
                              {uploadedAssets.map((asset, i) => (
                                    <motion.div key={i} transition={{ type: 'spring' }} whileHover={{ scale: 1.05 }}>
                                          <Stack
                                                sx={{
                                                      borderRadius: 3,
                                                      mb: 2,
                                                      width: 170,
                                                      height: 220,
                                                      mr: 1,
                                                      backgroundColor: "white",
                                                      boxShadow: 4
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
                                    </motion.div>
                              ))}
                        </Stack>
                  )}
                  <Box sx={[{ p: 2, width: '98%', borderRadius: 4, marginTop: 4 }, assets.length > 0 ? { border: 2 } : null]}>
                        <CompleteAssetDropzone
                              setUploadedAssets={setUploadedAssets}
                              setAssets={setAssets}
                        />
                  </Box>
            </Box>
      );
}

export default CompleteDropzone;
