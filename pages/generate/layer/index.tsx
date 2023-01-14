import React from 'react'
import LayerMainContainer from '../../../components/generate/layer/LayerMainContainer'
import GenerateLayerContextProvider from '../../../contexts/generate/GenerateLayerContext'

function LayeredGeneratePage() {
  return (
    <GenerateLayerContextProvider>
      <LayerMainContainer />
    </GenerateLayerContextProvider>
  )
}

export default LayeredGeneratePage
