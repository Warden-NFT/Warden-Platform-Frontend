import {
      FormControl,
      FormLabel,
      Stack,
      TextField,
      Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import { CompleteAssetFormSchema } from "../../../schema/generate/complete";

function CompleteForm() {
      const { formInfo } = useContext(GenerateCompleteContext);
      const { values, handleChange, touched, errors, handleSubmit } = useFormik({
            initialValues: { ...formInfo },
            enableReinitialize: true,
            validationSchema: CompleteAssetFormSchema,
            onSubmit: (data) => {
                  console.log(data);
            },
      });

      return (
            <Stack spacing={2} p={2}>
                  <div>{JSON.stringify(values)}</div>
                  <FormControl required>
                        <FormLabel>Event Name</FormLabel>
                        <Typography variant="caption" color="gray">
                              Event name is a unique name that describe the event
                        </Typography>
                        <TextField
                              name="eventName"
                              value={values.eventName}
                              onChange={handleChange}
                              id="event-name-input"
                              data-testid="event-name-input"
                              placeholder="My Event"
                              variant="outlined"
                              size="small"
                              error={errors.eventName != null}
                              helperText={errors.eventName}
                        />
                  </FormControl>
                  <FormControl required>
                        <FormLabel>Organizer Name</FormLabel>
                        <Typography variant="caption" color="gray">
                              What is your organization name?
                        </Typography>
                        <TextField
                              name="organizerName"
                              value={values.organizerName}
                              onChange={handleChange}
                              id="dist-by-input"
                              data-testid="organizer-name-input"
                              placeholder="Your organization name"
                              variant="outlined"
                              size="small"
                              error={errors.organizerName != null}
                              helperText={errors.organizerName}
                        />
                  </FormControl>
                  <FormControl>
                        <FormLabel>Event URL</FormLabel>
                        <Typography variant="caption" color="gray">
                              Do you have your event external URL?
                        </Typography>
                        <TextField
                              name="eventExternalUrl"
                              value={values.eventExternalUrl}
                              onChange={handleChange}
                              id="event-external-url-input"
                              data-testid="event-external-url-input"
                              placeholder="www.myorganization.com/my-ticket"
                              variant="outlined"
                              size="small"
                              error={errors.eventExternalUrl != null}
                              helperText={errors.eventExternalUrl}
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
