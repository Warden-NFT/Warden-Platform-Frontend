import {
      Box,
      FormControl,
      FormHelperText,
      FormLabel,
      Stack,
      TextField,
      Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { CompleteCollectionInfo } from "../../../interfaces/generate/collection.interface";
import ControlledEventTypeSelect from "../form/ControlledEventTypeSelect";

function CompleteForm() {
      const { values, handleChange, touched, errors, handleSubmit } = useFormik({
            initialValues: {
                  collectionName: "",
                  distributedBy: "",
                  externalUrl: "",
                  description: "",
                  ticketType: 'GENERAL',
            } as CompleteCollectionInfo,
            onSubmit: (data) => {
                  console.log(data);
            },
      });

      return (
            <Stack spacing={2} p={2}>
                  <FormControl required>
                        <FormLabel>Collection Name</FormLabel>
                        <Typography variant="caption" color="gray">
                              Collection name can be the event's name or unique name that describe
                              the event
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
                  <FormControl required>
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
                        <ControlledEventTypeSelect
                              values={values}
                              handleChange={handleChange}
                              touched={touched}
                              errors={errors}
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
      );
}

export default CompleteForm;
