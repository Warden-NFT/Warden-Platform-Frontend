import { Box } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window"
import AssetCanvasCard from "../../../components/generate/asset/AssetCanvasCard"
import FlatCard from "../../../components/UI/card/FlatCard"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { generateRandomLayer } from "../../../utils/generate/layer"

function LayerUtilizePage() {
  const router = useRouter()
  const { layers, formInfo } = useContext(GenerateLayerContext)

  useEffect(() => {
    if (layers.length === 0) {
      router.push("/ticket")
    }
    console.log(formInfo)
    const { metadata } = generateRandomLayer(formInfo, layers)
    console.table(metadata)
  }, [layers, formInfo])

  return (
    <FlatCard>
      <Grid
        columnCount={1000}
        columnWidth={400}
        height={600}
        rowCount={1000}
        rowHeight={400}
        width={1200}
      >
        {({ columnIndex, rowIndex }) => (
          <Box>
            {/* <AssetCanvasCard
              data={''}
              width={200}
              height={200}
            /> */}
          </Box>
        )}
      </Grid>
    </FlatCard>
  )
}

export default LayerUtilizePage
