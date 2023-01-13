import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { COMPLETE_MODE_STEPS } from "../../../constants/generate/steps";
import { GenerateCompleteContext } from "../../../contexts/generate/GenerateCompleteContext";
import ActiveStepper from "../../UI/navigation/ActiveStepper";
import CompleteDropzone from "./CompleteDropzone";
import CompleteForm from "./CompleteForm";
import queryString from "query-string";
import { TicketTypes } from "../../../interfaces/ticket/ticket.interface";
import { useFormik } from "formik";
import { CompleteAssetFormSchema } from "../../../schema/generate/complete";

function CompleteGenerateContainer() {
      const { activeStep, setActiveStep, formInfo, setFormInfo } = useContext(
            GenerateCompleteContext
      );
      const router = useRouter();

      const { values, handleChange, touched, errors, handleSubmit, isValid } = useFormik({
            initialValues: { ...formInfo },
            isInitialValid: false,
            enableReinitialize: true,
            validationSchema: CompleteAssetFormSchema,
            onSubmit: (data) => {
                  console.log(data);
            },
      });

      useEffect(() => {
            const { query } = queryString.parseUrl(window.location.href);
            const { ticketType } = query;
            const _form = { ...formInfo };
            if (ticketType) {
                  _form.ticketType = ticketType as TicketTypes;
                  setFormInfo(_form);
            } else {
                  router.push("/generate");
            }
      }, [window]);

      function handleNext() {
            if (activeStep === 1) {
                  return true;
            } else if (activeStep === 2) {
                  handleSubmit();

                  if (isValid) return true;
            }


            return false;
      }

      return (
            <ActiveStepper
                  steps={COMPLETE_MODE_STEPS}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  onNext={handleNext}
            >
                  {activeStep === 1 && <CompleteDropzone />}
                  {activeStep === 2 && (
                        <CompleteForm
                              values={values}
                              handleChange={handleChange}
                              touched={touched}
                              errors={errors}
                        />
                  )}
            </ActiveStepper>
      );
}

export default CompleteGenerateContainer;
