import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react'

interface Props {
  name: string;
  data: string[] // image data URL
}

function AssetCanvasCard(
  { name, data }: Props
) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

  }, [data])

  return (
    <Box sx={{ p: 1, borderRadius: 2, boxShadow: 2, backgroundColor: 'white' }}>
      <canvas
        ref={canvasRef}
        id="canvas"
        className="w-full h-full object-fill"
      />
    </Box>
  )
}

export default AssetCanvasCard