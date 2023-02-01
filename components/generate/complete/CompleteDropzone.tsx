import { Box, Divider, Stack, Switch, Typography } from "@mui/material"
import React, { useState, useContext } from "react"
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext"
import CompleteAssetDropzone from "./CompleteAssetDropzone"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import { grey } from "@mui/material/colors"
import Image from "next/image"
import CompleteAssetPreviewCard from "./CompleteAssetPreviewCard"

function CompleteDropzone() {
  const {
    vipAssets,
    setVipAssets,
    setUploadedVipAssets,
    assets,
    setAssets,
    uploadedAssets,
    uploadedVipAssets,
    setUploadedAssets,
    setActiveStep
  } = useContext(GenerateCompleteContext)

  const [hasVip, setHasVip] = useState(false)

  function handleNext() {
    if (assets.length > 0) {
      setActiveStep((prev) => prev + 1)
    }
  }

  return (
    <Box>
      <Switch
        checked={hasVip}
        onChange={(e) => setHasVip(e.currentTarget.checked)}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Box
        sx={{
          p: 4,
          display: "grid",
          placeItems: "center",
          backgroundColor: "white",
          marginY: 4,
          border: 2
        }}
      >
        <Box sx={{ width: "100%" }}>
          {uploadedAssets.length > 0 ? (
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              {uploadedAssets.map((asset, i) => (
                <CompleteAssetPreviewCard
                  key={i}
                  asset={asset}
                  assetIndex={i}
                />
              ))}
            </Stack>
          ) : (
            <Box
              sx={{
                height: 400,
                display: "grid",
                placeItems: "center",
                marginTop: 4
              }}
            >
              <Image
                src="/images/generate/empty-dropzone-placeholder.png"
                width="700"
                height="600"
                alt="Empty Placeholder"
                style={{ objectFit: "cover", height: "100%" }}
              />
              <Typography component="p" fontSize="11px" color={grey[500]}>
                This is not your asset, it's just a cat.
              </Typography>
            </Box>
          )}
          <CompleteAssetDropzone
            assets={assets}
            setAssets={setAssets}
            setUploadedAssets={setUploadedAssets}
            dragLabel="Drag & Drop to Non-VIP zone"
            sx={{ my: 2, backgroundColor: grey[200] }}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Image
            src="/images/generateempty-dropzone-placeholder.png"
            width="400"
            height="400"
            alt="Empty placeholder"
          />
          {uploadedVipAssets.length > 0 && hasVip && (
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              {uploadedVipAssets.map((asset, i) => (
                <CompleteAssetPreviewCard
                  key={i}
                  asset={asset}
                  assetIndex={i}
                  isVip
                />
              ))}
            </Stack>
          )}
          {hasVip && (
            <CompleteAssetDropzone
              assets={vipAssets}
              setAssets={setVipAssets}
              setUploadedAssets={setUploadedVipAssets}
              dragLabel="Drag & Drop to VIP zone"
              sx={{ my: 2, backgroundColor: grey[200] }}
            />
          )}
        </Box>
      </Box>
      <ControlledStepperButtons handleNext={handleNext} />
    </Box>
  )
}

export default CompleteDropzone
