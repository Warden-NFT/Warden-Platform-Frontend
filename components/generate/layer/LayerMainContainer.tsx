import React, { useContext } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import CustomizeLayer from './CustomizeLayer'
import LayerAssetGallery from './LayerAssetGallery'
import LayerForm from './LayerForm'
import LayerStepper from './LayerStepper'
import UtilizePreviewGrid from './UtilizePreviewGrid'

function LayerMainContainer() {
  const { activeStep } = useContext(GenerateLayerContext)
  return (
    <LayerStepper>
      {activeStep === 1 && <LayerAssetGallery />}
      {activeStep === 2 && <CustomizeLayer />}
      {activeStep === 3 && <LayerForm />}
      {activeStep === 4 && <UtilizePreviewGrid />}
    </LayerStepper>
  )
}

export default LayerMainContainer
