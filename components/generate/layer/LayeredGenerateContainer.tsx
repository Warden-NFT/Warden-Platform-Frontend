import React, { useContext } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import ActiveStepper from '../../UI/navigation/ActiveStepper'
import CustomizeLayer from './CustomizeLayer'
import LayerAssetGallery from './LayerAssetGallery'
import LayeredAssetTicketForm from './LayerAssetTicketForm'
import CustomizeAssetForm from './CustomizeAssetForm'
import { LAYERED_MODE_STEPPER } from '../../../constants/generate/steps'

function LayeredGenerateContainer() {
  const { activeStep } = useContext(GenerateLayerContext)
  return (
    <ActiveStepper steps={LAYERED_MODE_STEPPER} activeStep={activeStep}>
      {activeStep === 1 && <LayeredAssetTicketForm />}
      {activeStep === 2 && <LayerAssetGallery />}
      {activeStep === 3 && <CustomizeLayer />}
      {activeStep === 4 && <CustomizeAssetForm />}
    </ActiveStepper>
  )
}

export default LayeredGenerateContainer
