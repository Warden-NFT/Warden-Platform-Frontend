import { Box, SxProps, Skeleton } from "@mui/material"
import NextImage from "next/image"
import React, { useEffect, useRef, useState } from "react"

interface Props {
  name: string
  data: string[] // image data URL
  height: number
  width: number
  sx?: SxProps
  skeletonSx?: SxProps
}

function AssetCanvasCard({ name, data, width, height, sx, skeletonSx }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (ctx === null) return

    data.forEach((uri) => {
      const img = new Image()
      img.src = uri
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageURL = canvas.toDataURL("image/png")
        setUrl(imageURL)
      }
    })
  }, [data])

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "white",
        width: width,
        height: height,
        overflow: "hidden",
        ...sx
      }}
    >
      <Box>
        {url ? (
          <NextImage
            src={url}
            width={width}
            height={height}
            alt={`Preview of ${name}`}
            draggable={false}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            animation="wave"
            sx={{ ...skeletonSx }}
          />
        )}
      </Box>
      <canvas ref={canvasRef} id="canvas" style={{ display: "none" }} />
    </Box>
  )
}

export default AssetCanvasCard
