import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Slider,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import Image from "next/image"
import React, { useContext, useEffect } from "react"
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext"
import { FormLayerData } from "../../../interfaces/generate/file.interface"
import { createLayerOccurrenceForm } from "../../../schema/generate/layered"
import { calculateCombination } from "../../../utils/random/combination"
import ControlledStepperButtons from "../../UI/navigation/ControlledStepperButtons"
import { grey } from "@mui/material/colors"

function CustomizeAssetForm() {
  const { layers, setLayers, formInfo, setFormInfo, setActiveStep } =
    useContext(GenerateLayerContext)

  const { values, handleChange, touched, errors, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        generationAmount: formInfo.generationAmount,
        layers: [] as FormLayerData[]
      },
      validationSchema: createLayerOccurrenceForm(layers),
      onSubmit: (data) => {
        const _formInfo = { ...formInfo }
        const _layers = [...layers]
        _formInfo.generationAmount = data.generationAmount

        _layers.forEach((layer, i) => {
          layer.layerOccurrence = data.layers[i].layerOccurrence
          layer.layerName = data.layers[i].layerName
          layer.assets.forEach((asset, j) => {
            asset.occurrence = data.layers[i].assets[j].occurrence
            asset.name = data.layers[i].assets[j].name
          })
        })

        setFormInfo(_formInfo)
        setLayers(_layers)
        setActiveStep((prev) => prev + 1)
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
    setFieldValue("layers", _layers)
    setFieldValue("assetOccurrences", _assetOccurrences)
  }, [layers, setFieldValue])

  return (
    <Box
      sx={{
        padding: 4,
        marginY: 4,
        backgroundColor: "white",
        borderRadius: 4
      }}
    >
      <form>
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
            Maximum generation amount is:{" "}
            <span style={{ fontWeight: "600" }}>
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
                  />
                </FormControl>
              </Stack>
              <Stack
                direction="row"
                alignItems="end"
                justifyContent="space-between"
              >
                <Box>
                  <Typography>Layer Occurrance %</Typography>
                  <Typography variant="caption" color="gray">
                    How often this layer should appear?
                  </Typography>
                </Box>
                <FormControl required>
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
                    <Typography
                      variant="caption"
                      component="p"
                      color={grey[600]}
                    >
                      This layer will appears {layer.layerOccurrence}% of the
                      time
                    </Typography>
                  </Box>
                </FormControl>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginY: 2 }}
              >
                <Typography fontWeight="600" sx={{ width: "100px" }}>
                  ID
                </Typography>
                <Typography fontWeight="600" sx={{ width: "200px" }}>
                  Asset
                </Typography>
                <Typography fontWeight="600" sx={{ width: "200px" }}>
                  Name
                </Typography>
                <Typography fontWeight="600" sx={{ width: "200px" }}>
                  Occurance %
                </Typography>
              </Stack>
              {layers[i].assets.map((asset, j) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  key={asset.name}
                  sx={{ width: "100%" }}
                >
                  <Typography sx={{ width: "100px" }}>{j + 1}</Typography>
                  <Box sx={{ width: "140px" }}>
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
                    error={
                      //@ts-ignore
                      (errors.layers && errors.layers[i].assets[j].name) != null
                    }
                    helperText={
                      // @ts-ignore
                      errors.layers && errors.layers[i].assets[j].name
                    }
                    sx={{ width: "200px" }}
                  />

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
                      {values.layers[i].assets[j].name} will appears ≈{" "}
                      {(
                        ((values.layers[i].assets[j].occurrence / 100) *
                          values.generationAmount) /
                        values.layers[i].assets.length
                      ).toFixed(2)}{" "}
                      time(s)
                    </Typography>
                  </Box>
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
      </form>
    </Box>
  )
}

export default CustomizeAssetForm
