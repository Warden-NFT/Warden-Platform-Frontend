import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'
import ImageDropzone from '../../UI/input/ImageDropzone'

function CompleteDropzone() {
      const { assets, setAssets, uploadedAssets, setUploadedAssets } = useContext(GenerateCompleteContext)
      return (
            <Box sx={{ height: '100%', p: 2 }}>
                  <ImageDropzone uploadedAssets={uploadedAssets} setUploadedAssets={setUploadedAssets} setAssets={setAssets} />
            </Box>
      )
}

export default CompleteDropzone