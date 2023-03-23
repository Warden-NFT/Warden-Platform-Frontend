import { Box, SxProps, Typography } from "@mui/material"
import React from "react"
import { motion, Variants } from "framer-motion"
import { Theme } from "@mui/system"
import { purple } from "@mui/material/colors"
import FlatCard from "./FlatCard"

interface Props {
  title: string
  description: string
  containerStyles?: SxProps<Theme>
}

function TextDescriptionCard({ title, description }: Props) {
  const containerMotion: Variants = {
    rest: {
      x: 0,
      y: 0,
      borderRadius: 2,
      transition: {
        duration: 1
      }
    },
    hover: { y: -6, boxShadow: "5px 4px 0 rgba(0, 0, 0, 1)" }
  }

  return (
    <motion.div initial="rest" animate="rest" whileHover="hover">
      <motion.div variants={containerMotion}>
        <FlatCard
          noPadding
          sx={{
            p: 0,
            overflow: "hidden",
            height: 240,
            "&:hover": { cursor: "pointer" }
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "50px",
              backgroundColor: purple[400],
              pt: 2,
              pl: 2
            }}
          >
            <Typography variant="h5" fontWeight="600" color="white">
              {title}
            </Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Typography>{description}</Typography>
          </Box>
        </FlatCard>
      </motion.div>
    </motion.div>
  )
}

export default TextDescriptionCard
