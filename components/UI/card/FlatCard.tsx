import { Stack, SxProps } from "@mui/material"
import React from "react"

type Props = {
  children: React.ReactNode
  sx?: SxProps
}

function FlatCard({ children, sx }: Props) {
  return (
    <Stack
      spacing={2}
      p={4}
      sx={{
        ...sx,
        backgroundColor: "white",
        marginY: 4,
        borderRadius: 6,
        border: 2
      }}
    >
      {children}
    </Stack>
  )
}

export default FlatCard
