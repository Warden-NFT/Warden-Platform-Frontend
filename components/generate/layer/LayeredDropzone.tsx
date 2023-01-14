import { Container, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import { LayeredAssetData } from '../../../interfaces/generate/file.interface'
import {
  extractFolderName,
  extractFolderNames
} from '../../../utils/assets/detail'
import {
  categorizeAssetsIntoLayer,
  readAssetsAsLayer
} from '../../../utils/assets/layer'

function LayeredDropzone() {
  const { setAssets, setLayeredAssets } = useContext(GenerateLayerContext)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // FIXME: Not allow upload without files
    // Do not accept any file without name

    setAssets(acceptedFiles)
    const folderNames = extractFolderNames(acceptedFiles)
    const layeredAssets: LayeredAssetData[] =
      categorizeAssetsIntoLayer(folderNames)

    await Promise.all(
      acceptedFiles.map(async (file) => {
        const asset = await readAssetsAsLayer(file)
        const name = extractFolderName(file)
        const index = layeredAssets.findIndex(
          (layer) => layer.layerName === name
        )

        if (index !== -1) {
          layeredAssets[index].assets.push(asset)
        }
      })
    )

    setLayeredAssets(layeredAssets)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // note: accept only folders with images
    accept: {
      'image/png': [],
      'image/jpg': [],
      'image/gif': []
    }
  })
  return (
    <Container
      sx={{
        backgroundColor: 'white',
        minHeight: 140,
        borderWidth: 2,
        borderColor: 'primary.main',
        borderRadius: 3,
        borderStyle: 'dashed',
        display: 'grid',
        placeItems: 'center',
        mt: 4
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image
          src="/images/generate/dropzone-drag-active.png"
          width="100"
          height="100"
          alt="Accepting Files"
        />
      ) : (
        <Typography>Drag files OR Click to select</Typography>
      )}
    </Container>
  )
}

export default LayeredDropzone
