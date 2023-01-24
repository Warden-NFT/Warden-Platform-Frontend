import { Box, IconButton, Typography } from '@mui/material'
import { GridCloseIcon } from '@mui/x-data-grid'
import React, { useContext, useState } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import { UploadedAsset } from '../../../interfaces/generate/file.interface'
import PNGAssetPreview from '../../assets/PNGAssetPreview'

interface Props {
  asset: UploadedAsset
  layerIndex: number
  assetIndex: number
}

function LayerAssetPreviewCard({ asset, layerIndex, assetIndex }: Props) {
  const { layers, setLayers } = useContext(GenerateLayerContext)
  const [isHovering, setIsHovering] = useState(false)

  function removeAsset(layerIndex: number, assetIndex: number) {
    const _layers = [...layers]
    const _assets = [..._layers[layerIndex].assets]
    _assets.splice(assetIndex, 1)
    _layers[layerIndex].assets = _assets
    setLayers(_layers)
  }

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        mr: 1,
        boxShadow: 1,
        height: '140px',
        borderRadius: 1,
        my: 1,
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box sx={{ height: '20px', backgroundColor: 'red' }}>
        <Box position="absolute" sx={{ right: 0, top: -6 }}>
          {isHovering && (
            <IconButton
              onClick={() => removeAsset(layerIndex, assetIndex)}
              size="small"
              aria-label="Delete asset"
              component="label"
            >
              <GridCloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      <PNGAssetPreview
        name={asset.name}
        data={asset.data}
        width={100}
        height={100}
      />
      <Typography fontSize={12}>{asset.name}</Typography>
    </Box>
  )
}

export default LayerAssetPreviewCard
