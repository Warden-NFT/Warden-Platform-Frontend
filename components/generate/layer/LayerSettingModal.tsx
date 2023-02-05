import { Box, MenuItem, Modal, Select, Stack, Typography } from "@mui/material"
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"
import { DEFAULT_CANVAS_SIZE } from "../../../constants/generate/canvas"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}

function LayerSettingModal({ isOpen, setIsOpen }: Props) {
  const { layers, assetDimension, setAssetDimension } =
    useContext(GenerateLayerContext)
  const [widths, setWidths] = useState<number[]>([DEFAULT_CANVAS_SIZE])
  const [heights, setHeights] = useState<number[]>([DEFAULT_CANVAS_SIZE])

  useEffect(() => {
    if (widths.length > 0) return
    if (heights.length > 0) return

    const _widths: number[] = []
    const _heights: number[] = []
    layers.forEach((layer) => {
      layer.assets.forEach((asset) => {
        const { width, height } = asset.dimension
        if (!widths.includes(width)) {
          _widths.push(width)
        }
        if (!heights.includes(height)) {
          _heights.push(height)
        }
      })
    })
    setWidths(_widths)
    setHeights(_heights)
  }, [layers])

  function handleChangeWidth(w: number | string) {
    const _dimension = { ...assetDimension }
    if (typeof w === "number") {
      _dimension.width = w
    } else if (typeof w === "string") {
      _dimension.width = parseInt(w)
    }

    setAssetDimension(_dimension)
  }

  function handleChangeHeight(h: number | string) {
    const _dimension = { ...assetDimension }
    if (typeof h === "number") {
      _dimension.height = h
    } else if (typeof h === "string") {
      _dimension.width = parseInt(h)
    }
    setAssetDimension(_dimension)
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="setting-modal"
      aria-describedby="setting-modal"
    >
      <Box sx={style}>
        <div>{JSON.stringify(assetDimension)}</div>
        <Typography variant="h4" component="h1">
          Setting
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Customize your layered assets
        </Typography>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: 4 }}
          >
            <Typography component="p" sx={{ fontWeight: 500 }}>
              Width
            </Typography>
            <Select
              id="width-select"
              value={assetDimension.width}
              onChange={(e) => handleChangeWidth(e.target.value)}
              sx={{ width: "200px" }}
            >
              {widths.map((width, i) => (
                <MenuItem key={i} value={width}>{`${width} px`}</MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="p" sx={{ fontWeight: 500 }}>
              Height
            </Typography>
            <Select
              id="width-select"
              value={assetDimension.width}
              onChange={(e) => handleChangeHeight(e.target.value)}
              sx={{ width: "200px" }}
            >
              {heights.map((height, i) => (
                <MenuItem key={i} value={height}>{`${height} px`}</MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default LayerSettingModal
