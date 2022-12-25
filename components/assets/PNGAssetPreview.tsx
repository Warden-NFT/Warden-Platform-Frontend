import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface Props {
      name: string
      data: string;
      width: string | number;
      height: string | number
}

function PNGAssetPreview({
      name, data, width, height
}: Props) {
      return (
            <Box sx={{ width: width, height: height }}>
                  <Image
                        src={data}
                        width={100}
                        height={100}
                        alt={`Asset ${name}`}
                        style={{ objectFit: "contain" }}
                        className='png-bg'
                  />
            </Box>
      )
}

export default PNGAssetPreview