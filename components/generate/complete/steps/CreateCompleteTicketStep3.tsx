import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import React, { useContext, useEffect } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"
import { CompleteAssetCustomizeUtilitySchema } from "../../../../schema/generate/complete"
import Image from "next/image"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { AlertType } from "../../../../interfaces/modal/alert.interface"
import { hasRemainderOrEquals } from "../../../../utils/common/missing"

interface AssetValue {
  id: number
  name: string
  quantity: number
}

function CreateCompleteTicketStep3() {
  const {
    formInfo,
    setActiveStep,
    uploadedAssets,
    setUploadedAssets,
    uploadedVipAssets,
    setUploadedVipAssets
  } = useContext(GenerateCompleteContext)
  const { showErrorAlert } = useContext(LayoutContext)
  const { values, handleChange, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: {
        assets: [],
        vipAssets: []
      } as {
        assets: AssetValue[]
        vipAssets: AssetValue[]
      },
      validateOnChange: false,
      validateOnBlur: false,
      enableReinitialize: true,
      validationSchema: CompleteAssetCustomizeUtilitySchema,
      onSubmit: (values) => {
        // Check if quota exceeds amount
        const isAssetHigherOrEqual = hasRemainderOrEquals(
          { ...values }.assets.map((asset) => asset.quantity),
          formInfo.ticketQuota?.general ?? 0
        )
        if (!isAssetHigherOrEqual) {
          showErrorAlert({
            type: AlertType.ERROR,
            title:
              "Maximum purchased is lower than the amount of general ticket",
            description:
              "Your tickets are lower than maximum purchase amount. Please either decrease the maximum purchase amount in step 1 OR increase the amount create in step 3."
          })
          return
        }
        const isVipAssetHigherOrEquals = hasRemainderOrEquals(
          { ...values }.vipAssets.map((asset) => asset.quantity),
          formInfo.ticketQuota?.vip ?? 0
        )
        if (!isVipAssetHigherOrEquals) {
          showErrorAlert({
            type: AlertType.ERROR,
            title:
              "Maximum VIP purchased is lower than the amount of general ticket",
            description:
              "Your VIP tickets are lower than maximum purchase amount. Please either decrease the maximum purchase amount in step 1 OR increase the amount create in step 3."
          })
          return
        }

        if (values.assets.length > 0) {
          const _uploadedAssets = [...uploadedAssets]
          values.assets.forEach((asset, i) => {
            _uploadedAssets[i].quantity = asset.quantity
          })
          setUploadedAssets(_uploadedAssets)
        }

        if (values.vipAssets.length > 0) {
          const _uploadedVipAssets = [...uploadedVipAssets]
          values.vipAssets.forEach((asset, i) => {
            _uploadedVipAssets[i].quantity = asset.quantity
          })
          setUploadedVipAssets(_uploadedVipAssets)
        }

        setActiveStep((prev) => prev + 1)
      }
    })

  useEffect(() => {
    if (values.assets.length === 0 && uploadedAssets.length > 0) {
      const _assets: AssetValue[] = uploadedAssets.map((asset) => {
        return {
          id: asset.id,
          name: asset.name,
          quantity: asset.quantity
        }
      })
      setFieldValue("assets", _assets)
    }

    if (values.vipAssets.length === 0 && uploadedVipAssets.length > 0) {
      const _vipAssets: AssetValue[] = uploadedVipAssets.map((asset) => {
        return {
          id: asset.id,
          name: asset.name,
          quantity: asset.quantity
        }
      })
      setFieldValue("vipAssets", _vipAssets)
    }
  }, [])

  return (
    <Box>
      <Stack
        spacing={2}
        p={4}
        sx={{
          backgroundColor: "white",
          marginY: 4,
          border: 2
        }}
      >
        {/* Customize general admission */}
        <FormControl required>
          <FormLabel>Customize General Admission Ticket</FormLabel>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="600">Asset</Typography>
              <Typography fontWeight="600">File Name</Typography>
              <Typography fontWeight="600">Amount Create</Typography>
            </Stack>
            {values.assets.map((asset, i) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                key={i}
                sx={{ width: "100%" }}
              >
                <Image
                  src={uploadedAssets[i].data}
                  width="100"
                  height="100"
                  alt={asset.name}
                  style={{ objectFit: "contain" }}
                  draggable={false}
                />
                <Typography>{values.assets[i].name}</Typography>
                <TextField
                  value={values.assets[i].quantity}
                  name={`assets[${i}].quantity`}
                  onChange={handleChange}
                  type="number"
                  data-test-atd={`asset-${i}-quantity-input`}
                  size="small"
                  error={errors.assets && errors.assets[i] ? true : false}
                  helperText={
                    errors.assets && errors.assets[i]
                      ? //@ts-ignore
                      errors.assets[i]?.quantity
                      : ""
                  }
                />
              </Stack>
            ))}
          </Stack>
        </FormControl>
        <Divider />
        {/* Customize VIP */}
        {uploadedVipAssets.length > 0 && (
          <FormControl required>
            <FormLabel>Customize VIP Ticket</FormLabel>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">Asset</Typography>
                <Typography fontWeight="600">File Name</Typography>
                <Typography fontWeight="600">Amount Create</Typography>
              </Stack>
              {values.vipAssets.map((asset, i) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  key={i}
                  sx={{ width: "100%" }}
                >
                  <Image
                    src={uploadedVipAssets[i].data}
                    width="100"
                    height="100"
                    alt={asset.name}
                    style={{ objectFit: "contain" }}
                    draggable={false}
                  />
                  <Typography>{values.vipAssets[i].name}</Typography>
                  <TextField
                    value={values.vipAssets[i].quantity}
                    name={`vipAssets[${i}].quantity`}
                    onChange={handleChange}
                    type="number"
                    data-test-atd={`vipAssets-${i}-quantity-input`}
                    size="small"
                    error={
                      errors.vipAssets &&
                      errors.vipAssets &&
                      errors.vipAssets[i]
                        ? true
                        : false
                    }
                    helperText={
                      errors.vipAssets && errors.vipAssets[i]
                        ? //@ts-ignore
                        errors.vipAssets[i].quantity
                        : ""
                    }
                  />
                </Stack>
              ))}
            </Stack>
          </FormControl>
        )}
      </Stack>
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={handleSubmit}
      />
    </Box>
  )
}

export default CreateCompleteTicketStep3
