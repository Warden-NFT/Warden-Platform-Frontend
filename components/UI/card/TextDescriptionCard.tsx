import { Box, Button, ButtonBase, SxProps, Typography } from "@mui/material"
import React from "react"
import { motion, Variants } from "framer-motion"
import { Theme } from "@mui/system"
import { purple } from "@mui/material/colors"
import FlatCard from "./FlatCard"
import { useRouter } from "next/router"

interface Props {
  title: string
  description: string
  path: string
  containerStyles?: SxProps<Theme>
}

function TextDescriptionCard({ title, description, path }: Props) {
  const router = useRouter()
  const containerMotion: Variants = {
    rest: {
      x: 0,
      y: 0,
      borderRadius: 2,
      transition: {
        duration: 0.3
      }
    },
    hover: { y: -6, boxShadow: "5px 4px 0 rgba(0, 0, 0, 1)" }
  }

  return (
    <motion.div initial="rest" animate="rest" whileHover="hover">
      <motion.div variants={containerMotion}>
        <ButtonBase
          sx={{ height: 280, textAlign: "left" }}
          onClick={() => router.push(path)}
        >
          <FlatCard
            noPadding
            sx={{
              p: 0,
              overflow: "hidden",
              height: 280,
              "&:hover": { cursor: "pointer" }
            }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
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
              <Box sx={{ padding: 2, height: "140px" }}>
                <Typography>{description}</Typography>
              </Box>
              <Box onClick={() => router.push(path)}>
                <Typography
                  sx={{
                    color: purple[700],
                    fontWeight: 500,
                    fontSize: 16,
                    mx: 2
                  }}
                >
                  Create tickets now
                </Typography>
              </Box>
            </Box>
          </FlatCard>
        </ButtonBase>
      </motion.div>
    </motion.div>
  )
}

export default TextDescriptionCard
