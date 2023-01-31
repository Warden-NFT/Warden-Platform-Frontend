import React from "react"
import { Box, Stack } from "@mui/material"
import ImageLabelCard from "../UI/card/ImageLabelCard"
import { amber, indigo, pink, purple } from "@mui/material/colors"
import { Variants, motion } from "framer-motion"
import Image from "next/image"

const UploadAnimationVariant: Variants = {
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
const DownloadAnimationVariant: Variants = {
  rest: {
    x: 0,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    x: 0,
    y: [-30, 0],
    opacity: 100,
    transition: {
      type: "spring"
    }
  }
}

function SaveTicketAsset() {
  return (
    <Box>
      <Stack spacing={2}>
        <ImageLabelCard
          title="Upload Generated Assets and Mint"
          description="Release your wonderful tickets for your event to the public. Your ticket will be able to mint and deploy to the smart contract!"
          LeftMotionedComponent={() => (
            <motion.div
              variants={UploadAnimationVariant}
              style={{
                maxWidth: 200,
                display: "grid",
                placeItems: "center",
                paddingLeft: 20
              }}
            >
              <Image
                alt="Upload Generated Assets and Mint"
                src="/images/logo/Pinnie.svg"
                width="200"
                height="200"
                style={{ objectFit: "cover" }}
                draggable={false}
              />
            </motion.div>
          )}
          containerStyles={{ backgroundColor: amber[400] }}
        />
        <ImageLabelCard
          title="Download Generated Assets"
          description="Tame these tickets onto your computer storage, unleash it when you are ready to."
          LeftMotionedComponent={() => (
            <motion.div variants={DownloadAnimationVariant}>
              <Image
                alt="Upload Assets and Mint"
                src="/images/generate/computer.svg"
                width="200"
                height="200"
                style={{ objectFit: "cover" }}
                draggable={false}
              />
            </motion.div>
          )}
          containerStyles={{ backgroundColor: indigo[300] }}
        />
      </Stack>
    </Box>
  )
}

export default SaveTicketAsset
