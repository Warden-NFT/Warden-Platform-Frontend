import {
  Box,
  Divider,
  FormControl,
  FormLabel,
<<<<<<< HEAD
  Slider,
=======
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { GenerateLayerContext } from '../../../contexts/generate/GenerateLayerContext'
import { FormLayerData } from '../../../interfaces/generate/file.interface'
import { createLayerOccurrenceForm } from '../../../schema/generate/layered'
import { calculateCombination } from '../../../utils/random/combination'
import ControlledStepperButtons from '../../UI/navigation/ControlledStepperButtons'
<<<<<<< HEAD
import { grey } from '@mui/material/colors'
=======
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)

function CustomizeAssetForm() {
  const { layers, formInfo, setActiveStep } = useContext(GenerateLayerContext)

  const { values, handleChange, touched, errors, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        generationAmount: formInfo.generationAmount,
        layers: [] as FormLayerData[]
      },
      validationSchema: createLayerOccurrenceForm(layers),
      onSubmit: (data) => {
        const _formInfo = { ...formInfo }
        _formInfo.generationAmount = data.generationAmount
<<<<<<< HEAD
=======
        console.log(data)
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
      }
    })

  useEffect(() => {
    if (values.layers.length > 0) return

    const _layers = layers.map((layer) => {
      const data: FormLayerData = {
        layerId: layer.layerId,
        layerName: layer.layerName,
        layerOccurrence: layer.layerOccurrence,
        assets: layer.assets.map((asset) => {
          return {
            id: asset.id,
            name: asset.name,
            occurrence: asset.occurrence
          }
        })
      }

      return data
    })

    const _assetOccurrences = layers.map((layer) =>
      layer.assets.map((asset) => asset.occurrence)
    )
    setFieldValue('layers', _layers)
    setFieldValue('assetOccurrences', _assetOccurrences)
  }, [layers, setFieldValue])

  return (
    <Box
      sx={{
        padding: 4,
        marginY: 4,
        backgroundColor: 'white',
        borderRadius: 4
      }}
    >
<<<<<<< HEAD
=======
      <div>{JSON.stringify(values.layers)}</div>
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
      <FormControl required>
        <FormLabel>Generation Amount</FormLabel>
        <Typography variant="caption" color="gray">
          How much tickets would you like to generate? The number will depends
          on the amount of assets.
        </Typography>
        <TextField
          name="generationAmount"
          value={values.generationAmount}
          onChange={handleChange}
          id="generation-amount-input"
          data-testid="generation-amount-input"
          placeholder="Generation amount"
          variant="outlined"
          size="small"
          type="number"
          fullWidth
          error={errors.generationAmount != null}
          helperText={
            touched.generationAmount && errors.generationAmount
              ? errors.generationAmount
              : undefined
          }
        />
        <Typography>
          Maximum generation amount is:{' '}
          <span style={{ fontWeight: '600' }}>
            {calculateCombination(layers.map((layer) => layer.assets.length))}
          </span>
        </Typography>
      </FormControl>
      <Divider sx={{ marginY: 2 }} />
      {values.layers.map((layer, i) => (
        <Box key={i}>
          <Stack>
            <Typography variant="h6" component="h2">
              {layers[i].layerName}
            </Typography>
            <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
            >
              <Box>
                <Typography>Layer Name</Typography>
                <Typography variant="caption" color="gray">
                  What should this layer be called?
                </Typography>
              </Box>
              <FormControl required>
                <TextField
                  name={`layers[${i}].layerName`}
                  value={layer.layerName}
                  onChange={handleChange}
                  id="name-input"
                  data-testid="price-input"
                  placeholder="WARDEN Event Ticket"
                  variant="outlined"
                  size="small"
<<<<<<< HEAD
=======
                  // @ts-ignore
                  helperText={errors.layers[i].layerName}
                  //@ts-ignore
                  error={errors.layers[i].layerName != null}
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
                />
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
            >
              <Box>
<<<<<<< HEAD
                <Typography>Layer Occurrance %</Typography>
=======
                <Typography>Layer Occurrance</Typography>
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
                <Typography variant="caption" color="gray">
                  How often this layer should appear?
                </Typography>
              </Box>
              <FormControl required>
<<<<<<< HEAD
                <Box sx={{ width: 240 }}>
                  <Slider
                    defaultValue={100}
                    name={`layers[${i}].layerOccurrence`}
                    value={layer.layerOccurrence}
                    onChange={handleChange}
                    aria-label="Layer occurrence slider"
                    valueLabelDisplay="auto"
                    valueLabelFormat={`${layer.layerOccurrence}%`}
                  />
                  <Typography variant="caption" component="p" color={grey[600]}>
                    This layer will appears {layer.layerOccurrence}% of the time
                  </Typography>
                </Box>
=======
                <TextField
                  name={`layerOccurrence[${i}]`}
                  value={layer.layerOccurrence}
                  onChange={handleChange}
                  id="name-input"
                  data-testid="price-input"
                  placeholder="WARDEN Event Ticket"
                  variant="outlined"
                  size="small"
                  type="number"
                  // error={errors.layers[layerIndex]?.layerOccurrence != null}
                  // helperText={errors?.layerOccurrence && touched ? errors.layerOccurrence : undefined}
                />
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
<<<<<<< HEAD
              sx={{ marginY: 2 }}
=======
              sx={{ marginBottom: 2 }}
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
            >
              <Typography fontWeight="600" sx={{ width: '100px' }}>
                ID
              </Typography>
              <Typography fontWeight="600" sx={{ width: '200px' }}>
                Asset
              </Typography>
              <Typography fontWeight="600" sx={{ width: '200px' }}>
                Name
              </Typography>
              <Typography fontWeight="600" sx={{ width: '200px' }}>
<<<<<<< HEAD
                Occurance %
=======
                Occurance
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
              </Typography>
            </Stack>
            {layers[i].assets.map((asset, j) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                key={asset.name}
                sx={{ width: '100%' }}
              >
                <Typography sx={{ width: '100px' }}>{j + 1}</Typography>
                <Box sx={{ width: '140px' }}>
                  <Image
                    src={asset.data}
                    width="50"
                    height="50"
                    alt={asset.name}
                    className="png-bg-sm"
                  />
                </Box>
                <TextField
                  placeholder="Asset Name"
                  value={values.layers[i].assets[j].name}
                  onChange={handleChange}
                  name={`layers[${i}].assets[${j}].name`}
                  size="small"
                  sx={{ width: '200px' }}
                />
<<<<<<< HEAD
                <Box sx={{ width: 200 }}>
                  <Slider
                    defaultValue={100}
                    name={`layers[${i}].assets[${j}].occurrence`}
                    value={values.layers[i].assets[j].occurrence}
                    onChange={handleChange}
                    aria-label="Asset occurrence slider"
                    valueLabelDisplay="auto"
                    valueLabelFormat={`${values.layers[i].assets[j].occurrence}%`}
                  />
                  <Typography
                    variant="caption"
                    component="p"
                    color={grey[600]}
                    fontSize="11px"
                  >
                    {values.layers[i].assets[j].name} will appears{' '}
                    {Math.floor(
                      (values.layers[i].assets[j].occurrence / 100) *
                        values.generationAmount
                    ) / values.layers[i].assets.length}{' '}
                    times
                  </Typography>
                </Box>
=======
                <TextField
                  placeholder="Asset Occurrence"
                  value={values.layers[i].assets[j].occurrence}
                  name={`layers[${i}].assets[${j}].occurrence`}
                  onChange={handleChange}
                  size="small"
                  type="number"
                  sx={{ width: '200px' }}
                />
>>>>>>> bd18f79 (feat: add yup validation to customize asset form)
              </Stack>
            ))}
          </Stack>
          <Divider sx={{ marginY: 4 }} />
        </Box>
      ))}
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={handleSubmit}
      />
    </Box>
  )
}

export default CustomizeAssetForm
