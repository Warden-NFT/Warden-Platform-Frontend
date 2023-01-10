import {
      Box,
      Divider,
      Slider,
      Stack,
      TextField,
      Typography,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
      UploadedAsset,
} from "../../../interfaces/generate/file.interface";
import { CustomizeLayerForm } from "../../../interfaces/generate/form.interface";

interface Props {
      layer: CustomizeLayerForm;
}

interface GridRowData {
      id: number;
      asset: UploadedAsset;
      occurrence: number;
      name: string;
}

function ControlledLayerOccurrenceGrid({ layer }: Props) {
      const [gridRows, setGridRows] = useState<GridRowData[]>([]);
      const [gridCols, setGridCols] = useState<GridColDef[]>([]);

      const sliderMarks = [
            {
                  value: 0,
                  label: "0%",
            },
            {
                  value: 25,
                  label: "25%",
            },
            {
                  value: 50,
                  label: "50%",
            },
            {
                  value: 75,
                  label: "75%",
            },
            {
                  value: 100,
                  label: "100%",
            },
      ];

      function sliderValueText(val: number) {
            return `${val}%`;
      }

      useEffect(() => {
            if (!layer.assets) return;

            const _rows = layer.assets.map((asset, i) => {
                  return {
                        id: i + 1,
                        asset: asset,
                        occurrence: asset.occurrence,
                        name: asset.name,
                  } as GridRowData;
            });

            const _cols: GridColDef[] = [
                  {
                        field: "id",
                        headerName: "ID",
                        width: 50,
                        renderCell: (params: GridCellParams) => (
                              <Typography>{params.value}</Typography>
                        ),
                  },
                  {
                        field: "name",
                        headerName: "Trait Name",
                        width: 260,
                        renderCell: (params: GridCellParams) => (
                              <TextField
                                    hiddenLabel
                                    variant="standard"
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
                              <Box sx={{ display: "grid", placeItems: "center", py: "2px" }}>
                                    {params.value && (
                                          <Image
                                                src={params.value.data}
                                                width={50}
                                                height={50}
                                                alt={params.value.name}
                                                className="png-bg"
                                          />
                                    )}
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
                                    variant="standard"
                                    placeholder="Occurrence"
                                    size="small"
                                    margin="dense"
                                    id="occurrence"
                                    name="occurrence"
                                    value={params.value}
                                    type="number"
                              />
                        ),
                  },
            ];

            setGridCols(_cols);
            setGridRows(_rows);
      }, [layer]);

      return (
            <Box sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between">
                        <Typography fontWeight="600" sx={{ marginRight: 2 }}>
                              {layer.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" sx={{ width: "300px", paddingRight: 4 }}>
                              <Typography fontWeight="600" sx={{ marginRight: 4 }}>
                                    Occurrence
                              </Typography>
                              <Slider
                                    aria-label="Custom marks"
                                    defaultValue={20}
                                    getAriaValueText={sliderValueText}
                                    step={25}
                                    valueLabelDisplay="auto"
                                    marks={sliderMarks}
                                    value={layer.occurrence}
                                    name='occurrence'
                                    id='occurence'
                              // onChange={handleChange}
                              />
                        </Stack>
                  </Stack>
                  <Box sx={{ height: 400, my: 2 }}>
                        <DataGrid
                              rows={gridRows}
                              columns={gridCols}
                              getRowHeight={() => "auto"}
                        />
                  </Box>
                  <Divider />
            </Box>
      );
}

export default ControlledLayerOccurrenceGrid;
