import { Box, Divider, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { LayeredAssetData, UploadedAsset } from '../../../interfaces/generate/file.interface'

interface Props {
      layer: LayeredAssetData
}

interface GridRowData {
      id: number;
      asset: UploadedAsset,
      occurrence: number;
      name: string
}

function ControlledLayerOccurrenceGrid({
      layer,
}: Props) {

      const [gridRows, setGridRows] = useState<GridRowData[]>([])
      const [gridCols, setGridCols] = useState<GridColDef[]>([]);

      useEffect(() => {
            if (!layer.assets) return;

            const _rows = layer.assets.map((asset, i) => {
                  return {
                        id: i + 1,
                        asset: asset,
                        occurrence: asset.occurrence,
                        name: asset.name
                  } as GridRowData
            }
            )

            const _cols: GridColDef[] = [
                  {
                        field: 'id',
                        headerName: 'ID',
                        width: 50,
                        renderCell: (params: GridCellParams) => (
                              <Typography>{params.value}</Typography>
                        )

                  },
                  {
                        field: "name",
                        headerName: "Trait Name",
                        width: 260,
                        renderCell: (params: GridCellParams) => (
                              <TextField
                                    hiddenLabel
                                    variant='standard'
                                    placeholder="Trait name"
                                    size="small"
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    value={params.value}
                              //     onChange={(e) =>

                              //     }
                              />
                        ),
                  },
                  {
                        field: "asset",
                        headerName: "Asset",
                        width: 120,
                        renderCell: (params: GridCellParams<UploadedAsset>) => (
                              <Box sx={{ display: 'grid', placeItems: 'center', py: '2px' }}>
                                    {params.value && <Image
                                          src={params.value.data}
                                          width={50}
                                          height={50}
                                          alt={params.value.name}
                                          className='png-bg'
                                    />}
                              </Box>
                        ),
                  },
                  {
                        field: "occurrence",
                        headerName: "Occurrence",
                        width: 160,
                        renderCell: (params: GridCellParams) => (
                              <TextField
                                    hiddenLabel
                                    variant='standard'
                                    placeholder="Occurrence"
                                    size="small"
                                    margin="dense"
                                    id="occurrence"
                                    name="occurrence"
                                    value={params.value}
                                    type='number'
                              />
                        ),
                  },
            ]

            setGridCols(_cols)
            setGridRows(_rows)

      }, [layer])


      return (
            <Box sx={{ mb: 2 }}>
                  <Stack direction='row' justifyContent='space-between'>
                        <Typography fontWeight='600' sx={{ marginRight: 2 }}>{layer.layerName}</Typography>
                        <Stack direction='row' alignItems='center' sx={{ width: '200px' }}>
                              <Typography fontWeight='600' sx={{ marginRight: 2 }}>Occurrence</Typography>
                              <TextField
                                    hiddenLabel
                                    variant='standard'
                                    placeholder="Occurrence"
                                    size="small"
                                    margin="dense"
                                    id="occurrence"
                                    name="occurrence"
                                    value={layer.occurrence}
                                    type='number'
                              />
                        </Stack>
                  </Stack>
                  <Box sx={{ height: 400, my: 2 }}>
                        <DataGrid
                              rows={gridRows}
                              columns={gridCols}
                              getRowHeight={() => 'auto'}
                        />
                  </Box>
                  <Divider />
            </Box >
      )
}

export default ControlledLayerOccurrenceGrid