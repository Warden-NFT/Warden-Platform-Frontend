import React, {
  useCallback,
  useContext,
  useEffect,
  Suspense,
  lazy,
  useState
} from "react"
import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import { GenerateLayerContext } from "../../../../contexts/generate/GenerateLayerContext"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { generateRandomLayer } from "../../../../utils/generate/layer"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import SettingsIcon from "@mui/icons-material/Settings"
import LayerSettingModal from "../LayerSettingModal"

const AssetCanvasCard = lazy(() => import("../../asset/AssetCanvasCard"))

function CreateLayeredTicketStep5() {
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const [vipCounts, setVipCounts] = useState(0)
  const {
    layers,
    formInfo,
    setActiveStep,
    assetDimension,
    metadata,
    setMetadata
  } = useContext(GenerateLayerContext)
  const { setShowLoadingBackdrop } = useContext(LayoutContext)

  const handleGenerate = useCallback(() => {
    setShowLoadingBackdrop(true)
    setMetadata([])
    const generated = generateRandomLayer(formInfo, layers)
    setMetadata(generated.metadata)
  }, [layers, formInfo])

  useEffect(() => {
    handleGenerate()
  }, [layers, formInfo])

  useEffect(() => {
    let _vipCounts = 0
    metadata.forEach((data) => {
      if (data.hasVipAsset) {
        _vipCounts++
      }
    })
    setVipCounts(_vipCounts)
  }, [metadata])

  function handleFinishLoading() {
    setShowLoadingBackdrop(false)
  }

  return (
    <Box>
      <LayerSettingModal isOpen={isSettingOpen} setIsOpen={setIsSettingOpen} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%", mb: 2 }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Preview your ticket assets
          </Typography>
          {formInfo?.vipEnabled ? (
            <Typography variant="body1">
              There are {metadata.length} tickets, {vipCounts} of which are VIP
              tickets.
            </Typography>
          ) : (
            <Typography variant="body1">
              There are {metadata.length} tickets.
            </Typography>
          )}
        </Box>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton
            aria-label="setting"
            onClick={() => setIsSettingOpen(true)}
          >
            <SettingsIcon />
          </IconButton>
          <Button variant="outlined" onClick={handleGenerate}>
            Regenerate
          </Button>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ height: "600px", overflowY: "auto" }}
      >
        {metadata.map((data, i) => (
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
              renderWidth={200}
              renderHeight={200}
              width={assetDimension.width}
              height={assetDimension.height}
              isFirstCanvas={i === 0}
              isLastCanvas={i === formInfo.generationAmount - 1}
              handleFinishGenerate={handleFinishLoading}
              isVip={data.hasVipAsset}
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

export default CreateLayeredTicketStep5
