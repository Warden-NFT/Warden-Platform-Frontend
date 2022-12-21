import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import { AssetDimension } from '../../../interfaces/generate/file.interface';

interface Props {
  data: string[] // image data URL
  height: number
  width: number
}

function AssetCanvasCard(
  { data, width, height }: Props
) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return

    canvas.width = width;
    canvas.height = height

    const ctx = canvas.getContext("2d");
    if (ctx === null) return;

    data.forEach((uri) => {
      const img = new Image();
      img.src = uri;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    })
  }, [data])

  return (
    <Box sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: 'white', width: width, height: height }}>
      <canvas
        ref={canvasRef}
        id="canvas"
      />
    </Box>
  )
}

export default AssetCanvasCard