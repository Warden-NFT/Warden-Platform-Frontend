import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react'
import { LayeredAssetData, UploadedAsset } from '../../../interfaces/generate/file.interface';

interface Props {
      layerIndex: number;
      layeredAsset: LayeredAssetData;
      setLayeredAssets: Dispatch<SetStateAction<LayeredAssetData[]>>
}

function LayerAssetGallery({
      layerIndex,
      layeredAsset,
      setLayeredAssets
}: Props) {
      return (
            <Box sx={{ width: '100%', height: 200 }}>
                  <Stack direction='row' sx={{ overflowX: 'scroll' }}>
                        {layeredAsset.assets.map((asset, i) => <Image key={i} src={asset.data} width={130} height={160} alt={`Uploaded ${asset.name}`} />)}
                  </Stack>
            </Box>
      )
}

export default LayerAssetGallery