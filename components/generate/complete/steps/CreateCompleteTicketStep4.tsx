import {
  Box,
  CircularProgress,
  FormControl,
  FormLabel,
  MenuItem,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material"
import { purple } from "@mui/material/colors"
import { Form, useFormik } from "formik"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { useStorageBucket } from "../../../../hooks/useStorageBucket"
import { StoredAsset } from "../../../../interfaces/gcp/storage.interface"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledCurrencyPriceSelect from "../../../UI/input/ControlledCurrencyPriceSelect"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { TextFieldWrapper } from "../../../UI/textfield/TextFieldWrapper"

function CreateCompleteTicketStep4() {
  const {
    setActiveStep,
    assets,
    vipAssets,
    uploadedAssets,
    uploadedVipAssets,
    formInfo
  } = useContext(GenerateCompleteContext)
  const { saveFile } = useStorageBucket()
  const { setShowLoadingBackdrop } = useContext(LayoutContext)
  const [uploaded, setUploaded] = useState(false)

  const { values, handleChange, touched, errors, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        enableResale: true,
        resaleCeilingPrice: 0,
        resaleFloorPrice: 0,
        enableRoyaltyFee: true,
        royaltyFeePercentage: 5
      },
      onSubmit: (data) => {
        console.log(data)
      }
    })

  useEffect(() => {
    setShowLoadingBackdrop(true)

    async function fn() {
      const assetMetadata = uploadedAssets.map((asset) => {
        return {
          id: asset.id,
          name: asset.name,
          quantity: asset.quantity,
          occurrence: asset.occurrence
        }
      })
      const vipAssetMetadata = uploadedVipAssets.map((asset) => {
        return {
          id: asset.id,
          name: asset.name,
          quantity: asset.quantity,
          occurrence: asset.occurrence
        }
      })

      try {
        if (assets.length > 0) {
          await saveFile(assets, formInfo.subjectOf, assetMetadata)
        }

        if (vipAssets.length > 0) {
          await saveFile(vipAssets, formInfo.subjectOf, vipAssetMetadata)
        }
        setShowLoadingBackdrop(false)
        setUploaded(true)
      } catch (e) {
        setShowLoadingBackdrop(false)
        setUploaded(false)
      }
    }

    fn()
  }, [])

  return (
    <FlatCard>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h3" component="h1">
          Customize NFTs Utility
        </Typography>
      </Box>
      <div>{JSON.stringify(values)}</div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 2, backgroundColor: purple[50], borderRadius: 2 }}
      >
        <Box>
          <Typography variant="body1" component="h3" fontWeight="600">
            Uploading your assets
          </Typography>
          <Typography variant="subtitle1">
            Hang tight! Your files are uploading...
          </Typography>
        </Box>
        <CircularProgress />
      </Stack>

      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={() => setActiveStep((prev) => prev + 1)}
      />
    </FlatCard>
  )
}

export default CreateCompleteTicketStep4
