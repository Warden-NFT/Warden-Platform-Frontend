import { Box, Stack, SxProps, Typography } from "@mui/material"
import React from "react"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { Theme } from "@mui/system"

interface Props {
  imageSrc: string
  title: string
  description: string
  containerStyles?: SxProps<Theme>
}

function ImageLabelCard({
  imageSrc,
  title,
  description,
  containerStyles
}: Props) {
  const containerMotion: Variants = {
    rest: {
      x: 0,
      y: 0,
      transition: {
        duration: 1
      }
    },
    hover: { y: -6, boxShadow: "10px 6px 0 rgba(0, 0, 0, 1)" }
  }

  const imageMotion: Variants = {
    rest: {
      x: 0,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      x: -20,
      y: 100,
      scale: 2.3,
      rotate: [0, 20, 0, -20, 0, 10, 0, -10, 0],
      transition: {
        ease: "easeInOut",
        duration: 0.2
      }
    }
  }

  return (
    <motion.div initial="rest" animate="rest" whileHover="hover">
      <motion.div variants={containerMotion}>
        <Box
          sx={{
            border: 2,
            height: 200,
            borderColor: "black",
            overflow: "hidden",
            "&:hover": {
              cursor: "pointer"
            },
            ...containerStyles
          }}
        >
          <Stack direction="row">
            <Box sx={{ width: 200, height: "100%" }}>
              <motion.div variants={imageMotion}>
                <Image
                  alt={title}
                  src={imageSrc}
                  width="200"
                  height="200"
                  style={{ objectFit: "cover", borderRadius: "18px" }}
                  draggable={false}
                />
              </motion.div>
            </Box>
            <Stack
              justifyContent="space-between"
              sx={{ marginLeft: 4, padding: 4 }}
            >
              <Typography variant="h4" fontWeight="700">
                {title}
              </Typography>
              <Typography variant="subtitle1" fontSize="18px" fontWeight="500">
                {description}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </motion.div>
    </motion.div>
  )
}

export default ImageLabelCard
