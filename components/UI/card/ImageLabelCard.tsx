import { Box, Stack, SxProps, Typography } from "@mui/material"
import React from "react"
import { motion, Variants } from "framer-motion"
import { Theme } from "@mui/system"

interface Props {
  imgUrl: string
  title: string
  description: string
  colorFrom?: string
  colorTo?: string
  containerStyles?: SxProps<Theme>
}

function ImageLabelCard({
  imgUrl,
  title,
  description,
  containerStyles,
  colorFrom,
  colorTo
}: Props) {
  const containerMotion: Variants = {
    rest: {
      x: 0,
      y: 0,
      borderRadius: "14px",
      transition: {
        duration: 1
      }
    },
    hover: { y: -6, boxShadow: "10px 6px 0 rgba(0, 0, 0, 1)" }
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
            backgroundImage: `linear-gradient(to bottom, ${
              colorFrom ?? "rgba(255, 255, 255, 0.5)"
            }, ${colorTo ?? "rgba(255, 255, 255, 0.2)"}), url(${imgUrl})`,
            backgroundColor: "white",
            borderRadius: "14px",
            ...containerStyles
          }}
        >
          <Stack direction="row">
            {/* <Box sx={{ display: "grid", placeItems: "center" }}>
              <LeftMotionedComponent />
            </Box> */}
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
