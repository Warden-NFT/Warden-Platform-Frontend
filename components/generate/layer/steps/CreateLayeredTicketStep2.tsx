import { Box, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { GenerateLayerContext } from "../../../../contexts/generate/GenerateLayerContext"
import LayeredDropzone from "../LayeredDropzone"
import LayerAssetPreviewCard from "../LayerAssetPreviewCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import ContainedButton from "../../../UI/button/ContainedButton"

function CreateLayeredTicketStep2() {
  const { layers, setLayers, setActiveStep, setAssets } =
    useContext(GenerateLayerContext)

  function handleClearAll() {
    setLayers([])
    setAssets([])
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%", paddingY: 2 }}
        >
          <Box>
            <Typography variant="h4" component="h1" fontWeight="700">
              Upload & View your assets
            </Typography>
            <Typography variant="caption" component="p">
              Upload and view each of your layers
            </Typography>
          </Box>
          <ContainedButton
            label="Clear all"
            type="button"
            variant="contained"
            onClick={handleClearAll}
          />
        </Stack>
      </Stack>
      <Stack direction="column">
        {layers.length > 0 ? (
          <Box>
            {layers.map((layer, i) => (
              <Box key={i}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginY: 2, textDecoration: "underline" }}
                >
                  {layer.layerName}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ overflowX: "auto", py: 2 }}
                >
                  {layer.assets.map((asset, j) => (
                    <LayerAssetPreviewCard
                      key={j}
                      asset={asset}
                      layerIndex={i}
                      assetIndex={j}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>A placeholder for upload tutorial</Box>
        )}
      </Stack>
      <LayeredDropzone />
      <ControlledStepperButtons
        handleNext={() => setActiveStep((prev) => prev + 1)}
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
      />
    </Box>
  )
}

export default CreateLayeredTicketStep2
