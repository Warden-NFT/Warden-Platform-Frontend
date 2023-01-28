import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
  lazy
} from "react"
import { Box, Button, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window"
import FlatCard from "../../../components/UI/card/FlatCard"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { generateRandomLayer } from "../../../utils/generate/layer"
import { LayeredTicketMetadata } from "../../../interfaces/generate/metadata.interface"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"

const AssetCanvasCard = lazy(
  () => import("../../../components/generate/asset/AssetCanvasCard")
)

const COLUMN_COUNT = 4

function PreviewGeneratedTickets() {
  const { layers, formInfo, setActiveStep } = useContext(GenerateLayerContext)
  const [loadingStatuses, setLoadingStatuses] = useState<boolean[]>([])
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
      {generatedMetadata.map((data, i) => (
        <Box key={i}>
          <Suspense fallback={<div>Loading...</div>}>
            <AssetCanvasCard
              data={data.attributes.map((attr) => attr.asset.data)}
              width={200}
              height={200}
            />
          </Suspense>
        </Box>
      ))}
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        // handleNext={)}
      />
    </Box>
  )
}

export default PreviewGeneratedTickets
