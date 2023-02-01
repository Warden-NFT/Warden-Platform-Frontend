import { Box, Stack, Typography } from "@mui/material"
import React, { useState, useContext } from "react"
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext"
import CompleteAssetDropzone from "./CompleteAssetDropzone"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import { grey } from "@mui/material/colors"
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

  const [hasVip, setHasVip] = useState(!false)

  function handleNext() {
    if (assets.length > 0) {
      setActiveStep((prev) => prev + 1)
    }
  }

  return (
    <Box>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          marginY: 4,
          border: 2
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h4">Assets for Regular Tickets</Typography>
          {uploadedAssets.length > 0 && (
            <Box
              sx={{
                paddingY: 2,
                maxHeight: "660px",
                overflowY: "auto"
              }}
            >
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                {uploadedAssets.map((asset, i) => (
                  <CompleteAssetPreviewCard
                    key={i}
                    asset={asset}
                    assetIndex={i}
                  />
                ))}
              </Stack>
            </Box>
          )}
          <CompleteAssetDropzone
            assets={assets}
            setAssets={setAssets}
            setUploadedAssets={setUploadedAssets}
            dragLabel="Drag & Drop to regular zone"
            sx={{
              my: 2,
              backgroundColor: grey[200],
              border: "dashed 2px black",
              borderRadius: 2
            }}
          />
        </Box>
        {hasVip && (
          <Box>
            <Box sx={{ borderBottom: 2, marginY: 4 }} />
            <Typography variant="h4">Assets for VIP Tickets</Typography>
            <Box
              sx={{
                paddingY: 2,
                maxHeight: "660px",
                overflowY: "auto"
              }}
            >
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
              <CompleteAssetDropzone
                assets={vipAssets}
                setAssets={setVipAssets}
                setUploadedAssets={setUploadedVipAssets}
                dragLabel="Drag & Drop to VIP zone"
                sx={{
                  my: 2,
                  backgroundColor: grey[200],
                  border: "dashed 2px black",
                  borderRadius: 2
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={handleNext}
      />
    </Box>
  )
}

export default CompleteDropzone
