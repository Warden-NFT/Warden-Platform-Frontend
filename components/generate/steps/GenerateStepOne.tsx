import { Container, FormControl, FormHelperText, InputLabel, Stack, TextField, Box } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { STEPS } from '../../../constants/generate/steps'
import GenerateContainer from './GenerateContainer'

function GenerateStepOne() {

      const { values, handleChange } = useFormik({
            initialValues: {
                  name: '',
                  url: '',
                  description: '',
                  dimension: {
                        width: 512,
                        height: 512
                  }
            },
            onSubmit: (data) => {
                  console.log(data)
            }
      })

      return (
            <GenerateContainer header={STEPS[0].header}>
                  <Stack spacing={2}>
                        <FormControl>
                              <label htmlFor="my-input">What's the collection name?</label>
                              <TextField
                                    required
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    margin='dense'
                                    name='name'
                                    id='name'
                                    value={values.name}
                                    onChange={handleChange}
                              // placeholder="(ex.https://example.com)"
                              />
                              <FormHelperText>{values.name.length}/80</FormHelperText>
                        </FormControl>
                        <FormControl>
                              <label htmlFor="my-input">What's your project URL?</label>
                              <TextField
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    margin='dense'
                                    name='url'
                                    id='url'
                                    value={values.url}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                              />
                              <FormHelperText>No worry if you don't have. Project URL is not required.</FormHelperText>
                        </FormControl>
                        <FormControl>
                              <label htmlFor="my-input">Project Description</label>
                              <TextField
                                    required
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    margin='dense'
                                    name='description'
                                    id='description'
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder="This is a description of my NFT collection..."
                              />
                              <FormHelperText>{values.description.length}/400</FormHelperText>
                        </FormControl>
                        <Stack direction='row' width='100%' justifyContent='space-between'>
                              <FormControl fullWidth>
                                    <label htmlFor="my-input">Assets Width</label>
                                    <TextField
                                          required
                                          variant="outlined"
                                          fullWidth
                                          size='small'
                                          margin='dense'
                                          name='dimension.width'
                                          id='dimension.width'
                                          value={values.dimension.width}
                                          onChange={handleChange}
                                          placeholder="This is a description of my NFT collection..."
                                          type='number'
                                    />
                              </FormControl>
                              <Box width='40px' />
                              <FormControl fullWidth>
                                    <label htmlFor="my-input">Assets Height</label>
                                    <TextField
                                          required
                                          variant="outlined"
                                          fullWidth
                                          size='small'
                                          margin='dense'
                                          name='dimension.height'
                                          id='dimension.height'
                                          value={values.dimension.height}
                                          onChange={handleChange}
                                          placeholder="This is a description of my NFT collection..."
                                          type='number'
                                    />
                              </FormControl>
                        </Stack>
                  </Stack>
                  <div>{JSON.stringify(values)}</div>
            </GenerateContainer>
      )
}

export default GenerateStepOne