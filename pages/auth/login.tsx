import {
  Divider,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ContainerCard from '../../components/UI/card/ContainerCard'
import { useFormik } from 'formik'
import ContainedButton from '../../components/UI/button/ContainedButton'
import { LoginSchema } from '../../schema/auth/login.schema'
import Link from 'next/link'

function Login() {
  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      phoneNumber: '',
      password: ''
    },
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      console.log(data)
    }
  })

  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
      <Grid item xs={12} lg={6}>
        <ContainerCard>
          <>
            <Typography variant="h5" fontWeight="bold" component="h1">
              Log in
            </Typography>

            <Divider sx={{ my: 2 }} />

            <FormControl required sx={{ width: '100%', height: 84 }}>
              <FormLabel>Phone Number</FormLabel>
              <TextField
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                id="phone-number-input"
                data-testid="phone-number-input"
                placeholder="ex: 0912345678"
                variant="outlined"
                size="small"
                error={errors.phoneNumber != null}
                helperText={
                  touched.phoneNumber ? errors.phoneNumber : undefined
                }
              />
            </FormControl>

            <FormControl required sx={{ width: '100%', height: 84 }}>
              <FormLabel>Password</FormLabel>
              <TextField
                name="password"
                value={values.password}
                onChange={handleChange}
                id="password-input"
                data-testid="password-input"
                placeholder="ex: password"
                variant="outlined"
                size="small"
                type="password"
                error={errors.password != null}
                helperText={touched.password ? errors.password : undefined}
              />
            </FormControl>

            <Box sx={{ height: 24 }} />

            <ContainedButton
              onClick={() => handleSubmit()}
              disabled={false}
              variant="contained"
              label="Next"
              height="40px"
              width="100%"
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Typography>
                No account? <Link href="/auth/register">Register here</Link>
              </Typography>
            </Box>
          </>
        </ContainerCard>
      </Grid>
    </Grid>
  )
}

export default Login
