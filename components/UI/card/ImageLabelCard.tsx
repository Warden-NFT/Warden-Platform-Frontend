import { Box, Stack, SxProps, Typography } from "@mui/material"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Theme } from "@mui/system"

interface Props {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  containerStyles?: SxProps<Theme>
}

function ImageLabelCard({
  imageSrc,
  imageAlt,
  title,
  description,
  containerStyles
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "10px 6px 0 rgba(0, 0, 0, 1)" }}
      style={{ borderRadius: "20px" }}
    >
      <Box
        sx={{
          border: 2,
          borderColor: "black",
          borderRadius: "20px",
          overflow: "hidden",
          "&:hover": {
            cursor: "pointer"
          },
          ...containerStyles
        }}
      >
        <Stack direction="row">
          <Image
            alt={imageAlt}
            src={imageSrc}
            width="200"
            height="200"
            style={{ objectFit: "contain" }}
            draggable={false}
          />
          <Stack
            justifyContent="space-between"
            sx={{ marginLeft: 4, padding: 4 }}
          >
            <Typography variant="h5">{title}</Typography>
            <Typography>{description}</Typography>
          </Stack>
        </Stack>
      </Box>
    </motion.div>
  )
}

export default ImageLabelCard
