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
import { RegisterSchema } from '../../schema/auth/register.schema'
import ContainedButton from '../../components/UI/button/ContainedButton'
import Link from 'next/link'

function Register() {
  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      phoneNumber: '',
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: ''
    },
    enableReinitialize: true,
    validationSchema: RegisterSchema,
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
              Register
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" component="h1">
              Personal Information
            </Typography>

            <FormControl required sx={{ width: '100%', height: 84 }}>
              <FormLabel>First Name</FormLabel>
              <TextField
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                id="first-name-input"
                data-testid="first-name-input"
                placeholder="ex: John"
                variant="outlined"
                size="small"
                error={errors.firstName != null}
                helperText={errors.firstName ?? undefined}
              />
            </FormControl>

            <FormControl required sx={{ width: '100%', height: 84 }}>
              <FormLabel>Last Name</FormLabel>
              <TextField
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                id="last-name-input"
                data-testid="last-name-input"
                placeholder="ex: Doe"
                variant="outlined"
                size="small"
                error={errors.lastName != null}
                helperText={touched.lastName ? errors.lastName : undefined}
              />
            </FormControl>

            <FormControl required sx={{ width: '100%', height: 84 }}>
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                value={values.email}
                onChange={handleChange}
                id="email-input"
                data-testid="email-input"
                placeholder="ex: example@email.com"
                variant="outlined"
                size="small"
                error={errors.email != null}
                helperText={touched.email ? errors.email : undefined}
              />
            </FormControl>

            <FormControl required sx={{ width: '100%', height: 84 }}>
              <FormLabel>Username</FormLabel>
              <TextField
                name="username"
                value={values.username}
                onChange={handleChange}
                id="username-input"
                data-testid="username-input"
                placeholder="ex: username"
                variant="outlined"
                size="small"
                error={errors.username != null}
                helperText={touched.username ? errors.username : undefined}
              />
            </FormControl>

            <Typography variant="h6" component="h1">
              Credentials
            </Typography>

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

            <FormControl required sx={{ width: '100%', height: 84 }}>
              <FormLabel>Repeat Password</FormLabel>
              <TextField
                name="repeatPassword"
                value={values.repeatPassword}
                onChange={handleChange}
                id="repeat-password-input"
                data-testid="repeat-password-input"
                placeholder="ex: password"
                variant="outlined"
                size="small"
                type="password"
                error={errors.repeatPassword != null}
                helperText={
                  touched.repeatPassword ? errors.repeatPassword : undefined
                }
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
                Already have an account?{' '}
                <Link href="/auth/login">Log in here</Link>
              </Typography>
            </Box>
          </>
        </ContainerCard>
      </Grid>
    </Grid>
  )
}

export default Register
