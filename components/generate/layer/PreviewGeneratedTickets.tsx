import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
  lazy
} from "react"
import { Box, Stack } from "@mui/material"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { generateRandomLayer } from "../../../utils/generate/layer"
import { LayeredTicketMetadata } from "../../../interfaces/generate/metadata.interface"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import FlatCard from "../../UI/card/FlatCard"

const AssetCanvasCard = lazy(
  () => import("../../../components/generate/asset/AssetCanvasCard")
)

function PreviewGeneratedTickets() {
  const { layers, formInfo, setActiveStep } = useContext(GenerateLayerContext)
  const [generatedMetadata, setGeneratedMetadata] = useState<
    LayeredTicketMetadata[]
  >([])

  const handleGenerate = useCallback(() => {
    if (generatedMetadata.length > 0) return

    const { metadata } = generateRandomLayer(formInfo, layers)
    setGeneratedMetadata(metadata)
  }, [layers, formInfo])

  useEffect(() => {
    handleGenerate()
  }, [])

  return (
    <Box sx={{ marginY: 4 }}>
      <FlatCard sx={{ display: "grid", placeItems: "center" }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
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
                  }}
                >
                  Generating Ticket Asset
                </Box>
              }
            >
              <AssetCanvasCard
                name={data.name}
                data={data.attributes.map((attr) => attr.asset.data)}
                width={200}
                height={200}
                sx={{ borderRadius: 2, mb: 2 }}
              />
            </Suspense>
          ))}
        </Stack>

        <ControlledStepperButtons
          handlePrevious={() => setActiveStep((prev) => prev - 1)}
          // handleNext={)}
        />
      </FlatCard>
    </Box>
  )
}

export default PreviewGeneratedTickets
