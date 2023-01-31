import React, { useContext } from "react"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import ActiveStepper from "../../UI/navigation/ActiveStepper"
import CustomizeLayer from "./CustomizeLayer"
import LayerAssetGallery from "./LayerAssetGallery"
import LayeredAssetTicketForm from "./LayerAssetTicketForm"
import CustomizeAssetForm from "./CustomizeAssetForm"
import { LAYERED_MODE_STEPPER } from "../../../constants/generate/steps"
import PreviewGeneratedTickets from "./PreviewGeneratedTickets"
import SaveTicketAsset from "../SaveTicketAsset"
import FlatCard from "../../UI/card/FlatCard"
import { amber } from "@mui/material/colors"

function LayeredGenerateContainer() {
  const { activeStep } = useContext(GenerateLayerContext)
  return (
    <ActiveStepper
      steps={LAYERED_MODE_STEPPER}
      activeStep={activeStep}
      sx={{ backgroundColor: "white" }}
    >
      <FlatCard>
        {activeStep === 1 && <LayeredAssetTicketForm />}
        {activeStep === 2 && <LayerAssetGallery />}
        {activeStep === 3 && <CustomizeLayer />}
        {activeStep === 4 && <CustomizeAssetForm />}
        {activeStep === 5 && <PreviewGeneratedTickets />}
        {activeStep === 6 && <SaveTicketAsset />}
      </FlatCard>
    </ActiveStepper>
  )
}

export default LayeredGenerateContainer
