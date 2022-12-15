import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadedAsset } from '../../../interfaces/generate/file.interface'
import { getAssetDimension, getAssetFileName, getAssetFileURL } from '../../../utils/assets/detail'

interface Props {
      setAssets: Dispatch<SetStateAction<File[]>>
      uploadedAssets: UploadedAsset[]
      setUploadedAssets: Dispatch<SetStateAction<UploadedAsset[]>>
}

function ImageDropzone({ setAssets, uploadedAssets, setUploadedAssets }: Props) {

      const onDrop = useCallback((acceptedFiles: File[]) => {
            const assets: UploadedAsset[] = [];
            setAssets(acceptedFiles)
            acceptedFiles.forEach((file) => {
                  const reader = new FileReader()

                  reader.onabort = () => console.log('file reading was aborted')
                  reader.onerror = () => console.log('file reading has failed')
                  reader.onload = async () => {
                        const url = await getAssetFileURL(file)
                        const dimensions = await getAssetDimension(url);
                        if (!url || !dimensions) return;

                        const asset: UploadedAsset = {
                              name: getAssetFileName(file),
                              dimension: dimensions,
                              data: url
                        }

                        assets.push(asset)
                  }
                  reader.readAsArrayBuffer(file)
            })

            setUploadedAssets(assets)
      }, [])
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
      return (
            <Container sx={{ minHeight: 200, borderWidth: 2, borderColor: 'primary.main', borderRadius: 3, borderStyle: 'dashed', display: 'grid', placeItems: 'center' }} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ?
                        <Image src='/images/generate/dropzone-drag-active.png' width='100' height='100' alt='Accepting Files' />
                        :
                        <Typography>Drag files OR Click to select</Typography>
                  }
            </Container >
      )
}

export default ImageDropzone