import React, { useContext, useEffect } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import { generateRandomLayer } from '../../../utils/generate/layer';

function UtilizePreviewGrid() {
      const { layeredAssets } = useContext(GenerateLayerContext);

      // FIXME: remove hardcode
      useEffect(() => {
            generateRandomLayer(layeredAssets, 20)
      }, [])

      return (
            <div>UtilizePreviewGrid</div>
      )
}

export default UtilizePreviewGrid