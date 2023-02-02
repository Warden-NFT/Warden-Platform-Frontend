import { Box, SxProps } from "@mui/material"
import { Theme } from "@mui/system"
import Image from "next/image"
import React from "react"

interface Props {
  name: string
  data: string
  width: number
  height: number
  showPngGrid?: boolean
  sx?: SxProps<Theme>
}

function PNGAssetPreview({
  name,
  data,
  width,
  height,
  showPngGrid,
  sx
}: Props) {
  return (
    <Box sx={{ width: width, height: height, ...sx }}>
      <Image
        src={data}
        width={width}
        height={height}
        alt={`Asset ${name}`}
        draggable={false}
        className={showPngGrid ? "png-bg" : ""}
        style={{ objectFit: "cover" }}
      />
    </Box>
  )
}

export default PNGAssetPreview
