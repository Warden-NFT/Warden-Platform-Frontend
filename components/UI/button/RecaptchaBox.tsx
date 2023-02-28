import { FormControl, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import React, { useContext } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { LayoutContext } from "../../../contexts/layout/LayoutContext"
import { AlertType } from "../../../interfaces/modal/alert.interface"

interface Props {
  name: string
  setFieldValue: (fieldName: string, val: any) => void
  error?: string
}

function RecaptchaBox({ name, error, setFieldValue }: Props) {
  const { showErrorAlert } = useContext(LayoutContext)

  function handleChangeCaptcha(val: string | null) {
    if (val === null) {
      setFieldValue(name, "NOT_TESTED")
      showErrorAlert({
        type: AlertType.INFO,
        title: "RECAPTCHA Timeout",
        description: "You did not finish recaptcha in time. Please redo."
      })
    }

    setFieldValue(name, "TESTED")
  }

  return (
    <FormControl>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={handleChangeCaptcha}
      />
      {error && (
        <Typography variant="caption" color={red[600]}>
          {error}
        </Typography>
      )}
    </FormControl>
  )
}

export default RecaptchaBox
