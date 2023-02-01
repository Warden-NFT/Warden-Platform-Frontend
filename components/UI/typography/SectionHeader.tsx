import { Box, Stack, SxProps, Typography } from "@mui/material"
import { Theme } from "@mui/system"
import React from "react"

interface Props {
  text: string
  label?: string
  RightObject?: React.FC
  sx?: SxProps<Theme>
}

function SectionHeader({ text, label, RightObject, sx }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ ...sx, width: "100%", paddingY: 2 }}
    >
      <Box>
        <Typography variant="h4" component="h1" fontWeight="700">
          {text}
        </Typography>
        <Typography variant="caption" component="p">
          {label}
        </Typography>
      </Box>
      <Box>{RightObject && <RightObject />}</Box>
    </Stack>
  )
}

export default SectionHeader
