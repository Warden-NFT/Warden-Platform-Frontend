import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { motion } from 'framer-motion'

interface Props {
      imageSrc: string;
      imageAlt: string;
      backgroundColor?: string;
      width: string
      height?: string
}

function ImageLabelCard(props: Props) {
      return (
            <motion.div
                  whileHover={{ y: -6, boxShadow: "10px 6px 0 rgba(0, 0, 0, 1)", }}
                  style={{ borderRadius: '20px' }}
            >
                  <Box
                        sx={{
                              border: 2,
                              borderColor: "black",
                              borderRadius: '20px',
                              ...props,
                              overflow: 'hidden',
                              '&:hover': {
                                    cursor: 'pointer'
                              },
                        }}
                  >
                        <Stack direction="row">
                              <Image
                                    alt={props.imageAlt}
                                    src={props.imageSrc}
                                    width="200"
                                    height="200"
                                    style={{ objectFit: "contain" }}
                              />
                              <Stack sx={{ marginLeft: 4, padding: 4 }}>
                                    <Typography variant="h4">Test</Typography>
                                    <Typography>
                                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                                          sunt animi ipsa cupiditate quam modi veritatis debitis dolorum
                                          necessitatibus, blanditiis, magnam, voluptate quod porro
                                          consequuntur quo non? Officiis, commodi aliquam!
                                    </Typography>
                              </Stack>
                        </Stack>
                  </Box>
            </motion.div>
      );
}

export default ImageLabelCard;
