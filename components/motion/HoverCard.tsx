import React from "react"
import { motion, Variants } from "framer-motion"
import { SxProps } from "@mui/material"
import { Box } from "@mui/system"

type Props = {
  children: React.ReactNode
  sx?: SxProps
}
function HoverCard({ children, sx }: Props) {
  const containerMotion: Variants = {
    rest: {
      x: 0,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: { y: -6, boxShadow: "6px 6px 0 rgba(0, 0, 0, 1)" }
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
            ...sx
          }}
        >
          {children}
        </Box>
      </motion.div>
    </motion.div>
  )
}

export default HoverCard
