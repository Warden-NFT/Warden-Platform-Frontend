import { Box, IconButton, Typography } from '@mui/material'
import { GridCloseIcon } from '@mui/x-data-grid'
import React, { useContext, useState } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import { UploadedAsset } from '../../../interfaces/generate/file.interface'
import { AssetMetadata } from '../../../interfaces/generate/metadata.interface'
import PNGAssetPreview from '../../assets/PNGAssetPreview'
import AssetCanvasCard from './AssetCanvasCard'

interface Props {
      data: string[];
      height: number;
      width: number;
      label: string
}

function GeneratedAsset({ data, height, width, label }: Props) {

      const [isHovering, setIsHovering] = useState(false)

      return (
            <Box
                  sx={{
                        width: '220px',
                        display: 'grid',
                        placeItems: 'center',
                        mr: 1,
                        boxShadow: 1,
                        height: '220px',
                        borderRadius: 1,
                        my: 1,
                        position: 'relative'
                  }}

                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
            >
                  <AssetCanvasCard data={data} height={height} width={width} />
                  <p>{label}</p>
            </Box>
      )
}

export default GeneratedAsset