import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'
import ControlledStepperButtons from '../../UI/navigation/ControlledStepperButtons'
import { CompleteAssetCustomizeUtilitySchema } from '../../../schema/generate/complete'
import Image from 'next/image'

interface AssetValue {
  id: number
  name: string
  quantity: number
}

function CustomizeUtilityForm() {
  const {
    setActiveStep,
    uploadedAssets,
    setUploadedAssets,
    uploadedVipAssets,
    setUploadedVipAssets
  } = useContext(GenerateCompleteContext)

  const { values, handleChange, touched, setFieldValue, errors, handleSubmit } =
    useFormik({
      initialValues: {
        publicationDatetime: null,
        assets: [],
        vipAssets: []
      } as {
        publicationDatetime: null | Date
        assets: AssetValue[]
        vipAssets: AssetValue[]
      },
      enableReinitialize: true,
      validationSchema: CompleteAssetCustomizeUtilitySchema,
      onSubmit: (values) => {
        if (values.assets.length > 0) {
          const _uploadedAssets = [...uploadedAssets]
          values.assets.forEach((asset, i) => {
            _uploadedAssets[i].name = asset.name
            _uploadedAssets[i].quantity = asset.quantity
          })
          setUploadedAssets(_uploadedAssets)
        }

        if (values.vipAssets.length > 0) {
          const _uploadedVipAssets = [...uploadedVipAssets]
          values.vipAssets.forEach((asset, i) => {
            _uploadedVipAssets[i].name = asset.name
            _uploadedVipAssets[i].quantity = asset.quantity
          })
          setUploadedVipAssets(_uploadedVipAssets)
        }
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
      setFieldValue('assets', _assets)
    }

    if (values.vipAssets.length === 0 && uploadedVipAssets.length > 0) {
      const _vipAssets: AssetValue[] = uploadedVipAssets.map((asset) => {
        return {
          id: asset.id,
          name: asset.name,
          quantity: asset.quantity
        }
      })
      setFieldValue('vipAssets', _vipAssets)
    }
  }, [])

  return (
    <Box>
      <div>{JSON.stringify(errors)}</div>
      <Stack
        spacing={2}
        p={4}
        sx={{
          backgroundColor: 'white',
          marginY: 4,
          borderRadius: 6,
          border: 2
        }}
      >
        <FormControl required>
          <FormLabel>Publication date</FormLabel>
          <Typography variant="caption" color="gray">
            The Publication date of this ticket. A ticket must be publicize at
            least 1 day from now.
          </Typography>
          <DateTimePicker
            value={values.publicationDatetime}
            onChange={(val) => setFieldValue('publicationDatetime', val)}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          {errors.publicationDatetime && touched.publicationDatetime && (
            <FormHelperText>{errors.publicationDatetime}</FormHelperText>
          )}
        </FormControl>
        <Divider />

        {/* Customize Regular */}
        <FormControl required>
          <FormLabel>Customize Regular Ticket</FormLabel>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="600">Asset</Typography>
              <Typography fontWeight="600">Name</Typography>
              <Typography fontWeight="600">Amount Create</Typography>
            </Stack>
            {values.assets.map((asset, i) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                key={i}
                sx={{ width: '100%' }}
              >
                <Image
                  src={uploadedAssets[i].data}
                  width="100"
                  height="100"
                  alt={asset.name}
                  style={{ objectFit: 'contain' }}
                  draggable={false}
                />
                <TextField
                  value={values.assets[i].name}
                  name={`assets[${i}].name`}
                  onChange={handleChange}
                  type="text"
                  data-test-atd={`asset-${i}-name-input`}
                  size="small"
                  //@ts-ignore
                  error={errors.assets && errors.assets[i].name ? true : false}
                  //@ts-ignore
                  helperText={errors.assets ? errors.assets[i].name : ''}
                />
                <TextField
                  value={values.assets[i].quantity}
                  name={`assets[${i}].quantity`}
                  onChange={handleChange}
                  type="number"
                  data-test-atd={`asset-${i}-quantity-input`}
                  size="small"
                  //@ts-ignore
                  error={
                    errors.assets && errors.assets[i].quantity ? true : false
                  }
                  //@ts-ignore
                  helperText={errors.assets ? errors.assets[i].quantity : ''}
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
                <Typography fontWeight="600">Name</Typography>
                <Typography fontWeight="600">Amount Create</Typography>
              </Stack>
              {values.vipAssets.map((asset, i) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  key={i}
                  sx={{ width: '100%' }}
                >
                  <Image
                    src={uploadedVipAssets[i].data}
                    width="100"
                    height="100"
                    alt={asset.name}
                    style={{ objectFit: 'contain' }}
                    draggable={false}
                  />
                  <TextField
                    value={values.vipAssets[i].name}
                    name={`vipAssets[${i}].name`}
                    onChange={handleChange}
                    type="text"
                    data-test-atd={`vipAssets-${i}-name-input`}
                    size="small"
                    //@ts-ignore
                    error={
                      errors.vipAssets && errors.vipAssets[i].name
                        ? true
                        : false
                    }
                    //@ts-ignore
                    helperText={
                      errors.vipAssets ? errors.vipAssets[i].name : ''
                    }
                  />
                  <TextField
                    value={values.vipAssets[i].quantity}
                    name={`vipAssets[${i}].quantity`}
                    onChange={handleChange}
                    type="number"
                    data-test-atd={`vipAssets-${i}-quantity-input`}
                    size="small"
                    //@ts-ignore
                    error={
                      errors.vipAssets && errors.vipAssets[i].quantity
                        ? true
                        : false
                    }
                    //@ts-ignore
                    helperText={
                      errors.vipAssets ? errors.vipAssets[i].quantity : ''
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

export default CustomizeUtilityForm
