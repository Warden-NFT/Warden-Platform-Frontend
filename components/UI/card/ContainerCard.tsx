import { Box, SxProps } from "@mui/system"
import React from "react"

type Props = {
  children?: JSX.Element[] | JSX.Element
  sx?: SxProps
}

function ContainerCard({ children, sx }: Props) {
  return (
    <Box
      sx={{
        border: 2,
        borderRadius: 4,
        padding: 2,
        backgroundColor: "white",
        boxShadow: "6px 6px 0 rgba(0, 0, 0, 1)",
        ...sx
      }}
    >
      {children}
    </Box>
  )
}

export default ContainerCard
