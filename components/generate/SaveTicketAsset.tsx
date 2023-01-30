import React from "react"
import { Box, Stack } from "@mui/material"
import ImageLabelCard from "../UI/card/ImageLabelCard"
import { amber } from "@mui/material/colors"

function SaveTicketAsset() {
  return (
    <Box>
      <Stack>
        <ImageLabelCard
          title="Upload Assets and Mint"
          description="Release your wonderful tickets for your event to the public. Your ticket will be able to mint and deploy to the smart contract!"
          imageSrc="/images/logo/Pinnie.svg"
          containerStyles={{ backgroundColor: amber[400] }}
        />
      </Stack>
    </Box>
  )
}

export default SaveTicketAsset
