import { Stack, SxProps } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

type Props = {
  children: React.ReactNode
  sx?: SxProps
  noPadding?: boolean
}

function FlatCard({ children, sx, noPadding }: Props) {
  return (
    <Stack
      spacing={2}
      sx={{
        ...sx,
        backgroundColor: "white",
        marginY: 4,
        border: 2
      }}
    >
      <Box p={noPadding ? 0 : 4}>{children}</Box>
    </Stack>
  )
}

export default FlatCard
