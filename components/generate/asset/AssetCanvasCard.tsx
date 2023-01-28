import { Box } from "@mui/material"
import NextImage from "next/image"
import React, { useEffect, useRef, useMemo, useState } from "react"

interface Props {
  data: string[] // image data URL
  height: number
  width: number
}

function AssetCanvasCard({ data, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [url, setUrl] = useState<string>("")
  useEffect(() => {
    console.log(url)
  }, [url])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (ctx === null) return

    data.reverse().forEach((uri) => {
      const img = new Image()
      img.src = uri
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageURL = canvas.toDataURL("image/png")
        console.log(imageURL)
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
        height: height
      }}
    >
      {/* <Box>
        <div>{url}</div>
        <NextImage src={url ?? ''} width={width} height={height} alt='Preview' />
      </Box>

      <canvas
        ref={canvasRef}
        id="canvas" /> */}

      <Box>
        <NextImage src={url} width={width} height={height} alt="Preview" />
      </Box>

      <canvas ref={canvasRef} id="canvas" style={{ display: "none" }} />
    </Box>
  )
}

export default AssetCanvasCard
