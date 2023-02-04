import { Box, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { GenerateLayerContext } from "../../../../contexts/generate/GenerateLayerContext"
import LayeredDropzone from "../LayeredDropzone"
import LayerAssetPreviewCard from "../LayerAssetPreviewCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import Image from "next/image"
import { grey } from "@mui/material/colors"
import ContainedButton from "../../../UI/button/ContainedButton"
import HeaderText from "../../../UI/typography/SectionHeader"

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
        <HeaderText
          text="View your assets"
          RightObject={() => (
            <ContainedButton
              label="Clear all"
              type="button"
              variant="contained"
              onClick={handleClearAll}
            />
          )}
        />
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
                  sx={{ overflowX: "auto", height: "240px" }}
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
          <Box
            sx={{
              height: 400,
              display: "grid",
              placeItems: "center",
              marginTop: 4
            }}
          >
            <Image
              src="/images/generate/empty-dropzone-placeholder.png"
              width="700"
              height="600"
              alt="Empty Placeholder"
              style={{ objectFit: "cover", height: "100%" }}
            />
            <Typography component="p" fontSize="11px" color={grey[500]}>
              This is not your asset, it's just a cat.
            </Typography>
          </Box>
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
