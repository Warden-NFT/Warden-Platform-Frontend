import React, { useContext } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import LayeredDropzone from './LayeredDropzone';
import LayerStepper from './LayerStepper'

function LayerMainContainer() {
      const { activeStep } = useContext(GenerateLayerContext);
      return (
            <LayerStepper>
                  {activeStep === 1 && <LayeredDropzone />}
            </LayerStepper>
      )
}

export default LayerMainContainer