import { Stack } from "@mui/material"
import React from "react"

type Props = {
  children: React.ReactNode
}

function FlatCard({ children }: Props) {
  return (
    <Stack
      spacing={2}
      p={4}
      sx={{
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
