import React, { useContext } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import LayerAssetGallery from './LayerAssetGallery';
import LayerStepper from './LayerStepper'

function LayerMainContainer() {
      const { activeStep } = useContext(GenerateLayerContext);
      return (
            <LayerStepper>
                  {activeStep === 1 && <LayerAssetGallery />}
            </LayerStepper>
      )
}

export default LayerMainContainer