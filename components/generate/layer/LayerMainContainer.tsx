import React, { useContext } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import CustomizeLayer from './CustomizeLayer';
import LayerAssetGallery from './LayerAssetGallery';
import LayerForm from './LayerForm';
import LayerStepper from './LayerStepper'

function LayerMainContainer() {
      const { activeStep } = useContext(GenerateLayerContext);
      return (
            <LayerStepper>
                  {activeStep === 1 && <LayerAssetGallery />}
                  {activeStep === 2 &&
                        <CustomizeLayer />}
                  {activeStep === 3 && <LayerForm />}
            </LayerStepper>
      )
}

export default LayerMainContainer