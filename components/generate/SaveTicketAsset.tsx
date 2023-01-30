import React from "react"
import { Box, Stack } from "@mui/material"
import ImageLabelCard from "../UI/card/ImageLabelCard"
import { amber, pink } from "@mui/material/colors"
import { Variants } from "framer-motion"
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

function SaveTicketAsset() {
  return (
    <Box>
      <Stack>
        <ImageLabelCard
          title="Upload Assets and Mint"
          description="Release your wonderful tickets for your event to the public. Your ticket will be able to mint and deploy to the smart contract!"
          LeftObject={() => (
            <Image
              alt="Upload Assets and Mint"
              src="/images/logo/Pinnie.svg"
              width="200"
              height="200"
              style={{ objectFit: "cover" }}
              draggable={false}
            />
          )}
          containerStyles={{ backgroundColor: amber[400] }}
          imageHoverAnimation={UploadAnimationVariant}
        />
      </Stack>
    </Box>
  )
}

export default SaveTicketAsset
