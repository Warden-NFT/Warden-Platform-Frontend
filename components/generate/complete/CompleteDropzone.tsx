import { Box, Divider, Switch } from "@mui/material"
import React, { useState, useContext } from "react"
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext"
import CompleteAssetDropzone from "./CompleteAssetDropzone"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import UploadedAssetPreviewList from "../asset/UploadedAssetPreviewList"
import { grey } from "@mui/material/colors"

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
          borderRadius: 6,
          border: 2
        }}
      >
        <Box sx={{ width: "100%" }}>
          {uploadedAssets.length > 0 && (
            <>
              <UploadedAssetPreviewList
                assets={assets}
                setAssets={setAssets}
                uploads={uploadedAssets}
                setUploads={setUploadedAssets}
                header="Regular Tickets"
              />
              <Divider />
            </>
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
          {uploadedVipAssets.length > 0 && hasVip && (
            <Box>
              <Box
                sx={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#000",
                  marginTop: 2
                }}
              />
              <UploadedAssetPreviewList
                assets={vipAssets}
                setAssets={setVipAssets}
                uploads={uploadedVipAssets}
                setUploads={setUploadedVipAssets}
                header="VIP Tickets"
              />
              <Divider />
            </Box>
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
