import {
      Accordion,
      AccordionDetails,
      AccordionSummary,
      Box,
      FormControl,
      FormLabel,
      Stack,
      Step,
      StepLabel,
      Stepper,
      TextField,
      Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { LayeredCollectionInfo } from "../../../interfaces/generate/collection.interface";
import { LayeredFormSchema } from "../../../schema/generate/layered";
import ControlledEventTypeSelect from "../form/ControlledEventTypeSelect";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import { MINI_LAYERED_FORM_STEPS } from '../../../constants/generate/steps'
import ControlledLayerOccurrenceGrid from "../form/ControlledLayerOccurenceGrid";
import useDebounce from "../../../hooks/useDebounce";

function LayerForm() {
      const { layeredAssets, collectionInfo, setCollectionInfo } = useContext(GenerateLayerContext)

      const { values, handleChange, touched, errors, handleSubmit } = useFormik({
            initialValues: collectionInfo ?? {
                  collectionName: "",
                  distributedBy: "",
                  externalUrl: "",
                  description: "",
                  ticketType: "GENERAL",
                  amount: 1,
                  layers: layeredAssets,
            } as LayeredCollectionInfo,
            enableReinitialize: true,
            validationSchema: LayeredFormSchema,
            onSubmit: (data) => {
                  setCollectionInfo(data)
            },
      });

      const debounced = useDebounce(values, 2000)
      useEffect(() => {
            handleSubmit();
            console.log(collectionInfo)
      }, [debounced])

      return (
            <Stack direction="row" width='100%'>
                  <Box sx={{ marginRight: 4, width: '200px' }}>
                        <Stepper activeStep={1} orientation='vertical'>
                              {
                                    MINI_LAYERED_FORM_STEPS.map((step, index) =>
                                          <Step key={index}>
                                                <StepLabel>
                                                      <Typography>{step.title}</Typography>
                                                </StepLabel>
                                          </Step>
                                    )
                              }
                        </Stepper>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                        <Stack spacing={2} p={2}>
                              {/* ------- General Settings Accordion ------- */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                    >
                                          <Typography variant='h5' sx={{ width: '50%', flexShrink: 0, fontWeight: '600' }}>General Settings</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Stack spacing={2}>
                                                <FormControl required>
                                                      <FormLabel>Collection Name</FormLabel>
                                                      <Typography variant="caption" color="gray">
                                                            Collection name can be the event's name or unique name that
                                                            describe the event
                                                      </Typography>
                                                      <TextField
                                                            name="collectionName"
                                                            value={values.collectionName}
                                                            onChange={handleChange}
                                                            id="col-name-input"
                                                            data-testid="collection-name-input"
                                                            placeholder="My Ticket"
                                                            variant="outlined"
                                                            size="small"
                                                            error={errors.collectionName != null}
                                                            helperText={errors.collectionName}
                                                      />
                                                </FormControl>
                                                <FormControl required>
                                                      <FormLabel>Distributed By</FormLabel>
                                                      <Typography variant="caption" color="gray">
                                                            What is your organization name?
                                                      </Typography>
                                                      <TextField
                                                            name="distributedBy"
                                                            value={values.distributedBy}
                                                            onChange={handleChange}
                                                            id="dist-by-input"
                                                            data-testid="distributed-by-input"
                                                            placeholder="Your organization name"
                                                            variant="outlined"
                                                            size="small"
                                                            error={errors.distributedBy != null}
                                                            helperText={errors.distributedBy}
                                                      />
                                                </FormControl>
                                                <FormControl>
                                                      <FormLabel>Distributed By</FormLabel>
                                                      <Typography variant="caption" color="gray">
                                                            What is your organization name?
                                                      </Typography>
                                                      <TextField
                                                            name="externalUrl"
                                                            value={values.externalUrl}
                                                            onChange={handleChange}
                                                            id="external-url-input"
                                                            data-testid="external-url-input"
                                                            placeholder="www.myorganization.com/my-ticket"
                                                            variant="outlined"
                                                            size="small"
                                                            error={errors.externalUrl != null}
                                                            helperText={errors.externalUrl}
                                                      />
                                                </FormControl>
                                                <FormControl required>
                                                      <FormLabel>Project's Description</FormLabel>
                                                      <Typography variant="caption" color="gray">
                                                            Describe about your project to the customer
                                                      </Typography>
                                                      <TextField
                                                            name="description"
                                                            value={values.description}
                                                            onChange={handleChange}
                                                            id="desc-input"
                                                            data-testid="description-input"
                                                            placeholder="Information about your project"
                                                            variant="outlined"
                                                            size="small"
                                                            error={errors.description != null}
                                                            helperText={errors.description}
                                                            multiline
                                                      />
                                                </FormControl>
                                          </Stack>
                                    </AccordionDetails>
                              </Accordion>
                              {/* ------- About Ticket Accordion ------- */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel2a-content"
                                          id="panel2a-header"
                                    >
                                          <Typography variant='h5' sx={{ flexShrink: 0, fontWeight: '600' }}>About Ticket</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Stack spacing={2}>
                                                <FormControl required>
                                                      <ControlledEventTypeSelect
                                                            values={values}
                                                            handleChange={handleChange}
                                                            touched={touched}
                                                            errors={errors}
                                                      />
                                                </FormControl>
                                                <FormControl required>
                                                      <FormLabel>Total Amount</FormLabel>
                                                      <Typography variant="caption" color="gray">
                                                            How much tickets to be generated?
                                                      </Typography>
                                                      <TextField
                                                            name="amount"
                                                            value={values.amount}
                                                            onChange={handleChange}
                                                            id="amount-input"
                                                            data-testid="amount-input"
                                                            placeholder="Information about your project"
                                                            variant="outlined"
                                                            size="small"
                                                            error={errors.amount != null}
                                                            helperText={errors.amount}
                                                            multiline
                                                            type='number'
                                                      />
                                                </FormControl>
                                          </Stack>
                                    </AccordionDetails>
                              </Accordion>
                              {/* ----- Asset Settings ----- */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel3a-content"
                                          id="panel3a-header"
                                    >
                                          <Typography variant='h5' sx={{ flexShrink: 0, fontWeight: '600' }}>Asset Settings</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          {
                                                values.layers.map((layer, i) =>
                                                      <ControlledLayerOccurrenceGrid key={i} layer={layer} />
                                                )
                                          }
                                    </AccordionDetails>
                              </Accordion>

                        </Stack>
                  </Box>
            </Stack>
      );
}

export default LayerForm;
