import {
      Accordion,
      AccordionDetails,
      AccordionSummary,
      Box,
      Divider,
      FormControl,
      FormHelperText,
      FormLabel,
      Stack,
      Step,
      StepLabel,
      Stepper,
      TextField,
      Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { LayeredCollectionInfo } from "../../../interfaces/generate/collection.interface";
import { LayeredFormScham } from "../../../schema/generate/layered";
import ControlledEventTypeSelect from "../form/ControlledEventTypeSelect";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";

function LayerForm() {
      const { layeredAssets } = useContext(GenerateLayerContext)
      const { values, handleChange, touched, errors, handleSubmit } = useFormik({
            initialValues: {
                  collectionName: "",
                  distributedBy: "",
                  externalUrl: "",
                  description: "",
                  ticketType: "GENERAL",
                  amount: 1,
                  layers: layeredAssets,
            } as LayeredCollectionInfo,
            enableReinitialize: true,
            validationSchema: LayeredFormScham,
            onSubmit: (data) => {
                  console.log(data);
            },
      });

      const MINI_STEPS = [
            {
                  step: 1,
                  title: "General settings",
            },
            {
                  step: 2,
                  title: "About the Ticket",
            },
            {
                  step: 3,
                  title: "Assets Settings",
            },
      ];

      return (
            <Stack direction="row">
                  <div>{JSON.stringify(values.amount)}</div>
                  <Box sx={{ marginRight: 4 }}>
                        <Stepper activeStep={1} orientation='vertical'>
                              {
                                    MINI_STEPS.map((step, index) =>
                                          <Step key={index}>
                                                <StepLabel>
                                                      <Typography>{step.title}</Typography>
                                                </StepLabel>
                                          </Step>
                                    )
                              }
                        </Stepper>
                  </Box>
                  <Box>
                        <Stack spacing={2} p={2}>
                              {/* ------- General Settings Accordion ------- */}
                              <Accordion>
                                    <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                    >
                                          <Typography sx={{ width: '50%', flexShrink: 0, fontWeight: '600' }}>General Settings</Typography>
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
                                          <Typography sx={{ flexShrink: 0, fontWeight: '600' }}>About Ticket</Typography>
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
                                          <Typography sx={{ flexShrink: 0, fontWeight: '600' }}>Asset Settings</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                          <Stack spacing={2}>


                                          </Stack>
                                    </AccordionDetails>
                              </Accordion>

                        </Stack>
                  </Box>
            </Stack>
      );
}

export default LayerForm;
