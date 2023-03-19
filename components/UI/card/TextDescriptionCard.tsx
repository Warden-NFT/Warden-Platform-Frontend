import { Box, IconButton, SxProps, Typography } from "@mui/material"
import React from "react"
import { motion, Variants } from "framer-motion"
import { Theme } from "@mui/system"
import { grey, purple } from "@mui/material/colors"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

interface Props {
  title: string
  description: string
  containerStyles?: SxProps<Theme>
}

function TextDescriptionCard({ title, description, containerStyles }: Props) {
  const containerMotion: Variants = {
    rest: {
      x: 0,
      y: 0,
      borderRadius: "14px",
      transition: {
        duration: 1
      }
    },
    hover: { y: -6, boxShadow: "5px 4px 0 rgba(0, 0, 0, 1)" }
  }

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      style={{ width: "400px" }}
    >
      <motion.div variants={containerMotion}>
        <Box
          sx={{
            border: 2,
            borderColor: "black",
            overflow: "hidden",
            "&:hover": {
              cursor: "pointer"
            },
            backgroundColor: "white",
            borderRadius: "14px",
            height: "220px",
            position: "relative",
            ...containerStyles
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "50px",
              backgroundColor: purple[400],
              display: "grid",
              placeItems: "center"
            }}
          >
            <Typography variant="h5" fontWeight="600" color="white">
              {title}
            </Typography>
          </Box>
          <Box sx={{ padding: 2, textAlign: "center" }}>
            <Typography>{description}</Typography>
          </Box>
          <IconButton
            aria-label="Go to page"
            sx={{ position: "absolute", right: "10px", bottom: "0px" }}
          >
            <ChevronRightIcon sx={{ fontSize: "60px", color: grey[400] }} />
          </IconButton>
        </Box>
      </motion.div>
    </motion.div>
  )
}

export default TextDescriptionCard
