import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
  lazy
} from "react"
import { Box, Stack, Typography } from "@mui/material"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { generateRandomLayer } from "../../../utils/generate/layer"
import { LayeredTicketMetadata } from "../../../interfaces/generate/metadata.interface"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import ContainedButton from "../../UI/button/ContainedButton"

const AssetCanvasCard = lazy(
  () => import("../../../components/generate/asset/AssetCanvasCard")
)

function PreviewGeneratedTickets() {
  const { layers, formInfo, setActiveStep } = useContext(GenerateLayerContext)
  const [generatedMetadata, setGeneratedMetadata] = useState<
    LayeredTicketMetadata[]
  >([])

  const handleGenerate = useCallback(() => {
    const { metadata } = generateRandomLayer(formInfo, layers)
    setGeneratedMetadata(metadata)
  }, [layers, formInfo])

  useEffect(() => {
    handleGenerate()
  }, [])

  return (
    <Box sx={{ marginY: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}>
        <Typography variant="h4" component="h1">
          Preview your ticket assets
        </Typography>
        <ContainedButton
          label="Regenerate"
          variant="contained"
          onClick={handleGenerate}
        />
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ height: "600px", overflowY: "auto", marginY: 2 }}>
        {generatedMetadata.map((data, i) => (
          <Suspense
            key={i}
            fallback={
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: "200px",
                  height: "200px",
                  mb: 2
                }}>
                Generating Ticket Asset
              </Box>
            }>
            <AssetCanvasCard
              name={data.name}
              data={data.attributes.map((attr) => attr.asset.data)}
              width={200}
              height={200}
              sx={{ mb: 2 }}
            />
          </Suspense>
        ))}
      </Stack>

      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={() => setActiveStep((prev) => prev + 1)}
      />
    </Box>
  )
}

export default PreviewGeneratedTickets
