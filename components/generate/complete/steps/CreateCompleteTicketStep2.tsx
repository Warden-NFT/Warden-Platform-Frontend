import { Box, Stack, Typography } from "@mui/material"
import React, { useState, useContext } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import CompleteAssetDropzone from "../CompleteAssetDropzone"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { grey } from "@mui/material/colors"
import CompleteAssetPreviewCard from "../CompleteAssetPreviewCard"

function CreateCompleteTicketStep2() {
  const {
    vipAssets,
    setVipAssets,
    setUploadedVipAssets,
    assets,
    setAssets,
    uploadedAssets,
    uploadedVipAssets,
    setUploadedAssets,
    setActiveStep,
    formInfo
  } = useContext(GenerateCompleteContext)

  function handleNext() {
    if (assets.length > 0) {
      setActiveStep((prev) => prev + 1)
    }
  }

  return (
    <Box>
      <Stack
        spacing={2}
        sx={{
          p: 2,
          backgroundColor: "white",
          marginY: 4,
          border: 2
        }}
      >
        <Box sx={{ padding: 2, borderRadius: 2, backgroundColor: grey[100] }}>
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
              backgroundColor: grey[200],
              border: "dashed 2px black",
              borderRadius: 2
            }}
          />
        </Box>
        {formInfo.vipEnabled && (
          <Box sx={{ backgroundColor: grey[100], padding: 2, borderRadius: 2 }}>
            <Typography variant="h4">Assets for VIP Tickets</Typography>
            <Box
              sx={{
                maxHeight: "660px",
                overflowY: "auto",
                paddingY: 2
              }}
            >
              {uploadedVipAssets.length > 0 && (
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
                  backgroundColor: grey[200],
                  border: "dashed 2px black",
                  borderRadius: 2
                }}
              />
            </Box>
          </Box>
        )}
      </Stack>
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={handleNext}
      />
    </Box>
  )
}

export default CreateCompleteTicketStep2
