import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface Props {
  name: string
  data: string
  width: number
  height: number
}

function PNGAssetPreview({ name, data, width, height }: Props) {
  return (
    <Box sx={{ width: width, height: height }}>
      <Image
        src={data}
        width={width}
        height={height}
        alt={`Asset ${name}`}
        style={{ objectFit: 'contain' }}
        className="png-bg"
      />
    </Box>
  )
}

export default PNGAssetPreview
