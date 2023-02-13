import { Box, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import CompleteAssetDropzone from "../CompleteAssetDropzone"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { grey } from "@mui/material/colors"
import CompleteAssetPreviewCard from "../CompleteAssetPreviewCard"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { AlertType } from "../../../../interfaces/modal/alert.interface"

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
  const { showErrorAlert } = useContext(LayoutContext)

  function handleNext() {
    if (assets.length === 0) {
      showErrorAlert({
        type: AlertType.INFO,
        title: "Upload asset for your ticket",
        description: "Please upload asset for your ticket"
      })
      return
    }
    if (formInfo.vipEnabled && vipAssets.length === 0) {
      showErrorAlert({
        type: AlertType.INFO,
        title: "Upload asset for your VIP ticket",
        description: "Please upload asset for your VIP ticket"
      })
      return
    }

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
