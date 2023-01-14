import { Box, Stack } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import { generateRandomLayer } from '../../../utils/generate/layer'
import GeneratedAsset from '../asset/GeneratedAsset'
import LayerAssetGallery from './LayerAssetGallery'

function UtilizePreviewGrid() {
  const { layeredAssets, collectionInfo, assetMetadata, setAssetMetadata } =
    useContext(GenerateLayerContext)

  // FIXME: remove hardcode
  useEffect(() => {
    if (!collectionInfo) return
    const generated = generateRandomLayer(layeredAssets, collectionInfo.amount)
    setAssetMetadata(generated.metadatas)
  }, [collectionInfo])

  return (
    <Box>
      <Stack direction="row" flexWrap="wrap" justifyContent="space-evenly">
        {assetMetadata.map((metadata, i) => (
          <GeneratedAsset
            data={metadata.attributes.map((attr) => attr.asset.data)}
            width={200}
            height={200}
            label={metadata.assetName}
            key={i}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default UtilizePreviewGrid
