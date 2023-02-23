import { Box, SxProps, Skeleton, Chip } from "@mui/material"
import NextImage from "next/image"
import React, { useContext, useEffect, useRef, useState } from "react"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"

interface Props {
  name: string
  data: string[] // image data URL
  height: number
  width: number
  renderWidth: number
  renderHeight: number
  sx?: SxProps
  skeletonSx?: SxProps
  isFirstCanvas?: boolean
  isLastCanvas?: boolean
  handleFinishGenerate?: () => void
  isVip?: boolean
}

function AssetCanvasCard({
  name,
  data,
  width,
  height,
  renderHeight,
  renderWidth,
  sx,
  skeletonSx,
  isFirstCanvas,
  isLastCanvas,
  handleFinishGenerate,
  isVip
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [url, setUrl] = useState<string>("")
  const { setMetadataBlob } = useContext(GenerateLayerContext)

  useEffect(() => {
    if (isFirstCanvas) {
      setMetadataBlob([])
    }

    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (ctx === null) return

    data.forEach((uri, i) => {
      const img = new Image()
      img.width = width
      img.height = height
      img.src = uri
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageURL = canvas.toDataURL("image/png")
        setUrl(imageURL)
        if (i === data.length - 1) {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setMetadataBlob((prev) => [...prev, blob])
              }
            },
            "image/png",
            1
          )
        }
        if (isLastCanvas && handleFinishGenerate) {
          handleFinishGenerate()
        }
      }
    })
  }, [data])

  return (
    <Box
      sx={{
        boxShadow: 2,
        backgroundColor: "white",
        width: renderWidth,
        height: renderHeight,
        overflow: "hidden",
        borderRadius: "8px",
        ...sx
      }}
    >
      <Box>
        {url ? (
          <Box sx={{ position: "relative" }}>
            {isVip && (
              <Chip
                label="VIP"
                variant="outlined"
                sx={{
                  position: "absolute",
                  right: "20px",
                  bottom: "20px",
                  zIndex: 100,
                  backgroundColor: "white"
                }}
              />
            )}
            <NextImage
              src={url}
              width={renderWidth}
              height={renderHeight}
              alt={`Preview of ${name}`}
              draggable={false}
              style={{ zIndex: 0 }}
            />
          </Box>
        ) : (
          <Skeleton
            variant="rectangular"
            width={renderWidth}
            height={renderHeight}
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
