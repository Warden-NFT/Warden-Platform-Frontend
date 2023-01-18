import { FormControl, FormLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { client } from '../../configs/axios/axiosConfig'
import { UserContext } from '../../contexts/user/UserContext'
import { SuccessfulAuthDTO } from '../../interfaces/auth/auth.interface'
import { EventOrganizerRegisterSchema } from '../../schema/auth/register.schema'
import ContainedButton from '../UI/button/ContainedButton'

function EventOrganizerRegisterForm() {
  const { setUserInfo } = useContext(UserContext)
  const router = useRouter()
  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      phoneNumber: '',
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      organizationName: ''
    },
    validationSchema: EventOrganizerRegisterSchema,
    onSubmit: async (data) => {
      const payload = {
        phoneNumber: data.phoneNumber,
        email: data.email,
        username: data.username,
        password: data.password,
        organizationName: data.organizationName,
        verificationStatus: 'NotVerified'
      }
      try {
        const res = await client.post<SuccessfulAuthDTO>(
          '/user/registerEventOrganizer',
          payload
        )
        console.log(res)
        setUserInfo(res.data)
        router.push('/auth/confirm-phone')
      } catch (error) {
        console.log(error)
        // setup sentry
      }
    }
  })

  return (
    <>
      <Typography variant="h6" component="h1">
        Organization Information
      </Typography>

      <FormControl required fullWidth sx={{ height: 84 }}>
        <FormLabel>Organization Name</FormLabel>
        <TextField
          name="organizationName"
          value={values.organizationName}
          onChange={handleChange}
          id="first-name-input"
          data-testid="first-name-input"
          placeholder="ex: John"
          variant="outlined"
          size="small"
          error={errors.organizationName != null}
          helperText={errors.organizationName ?? undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
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

      <FormControl required fullWidth sx={{ height: 84 }}>
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

      <FormControl required fullWidth sx={{ height: 84 }}>
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
          autoComplete="username"
          error={errors.phoneNumber != null}
          helperText={touched.phoneNumber ? errors.phoneNumber : undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
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
          autoComplete="current-password"
          type="password"
          error={errors.password != null}
          helperText={touched.password ? errors.password : undefined}
        />
      </FormControl>

      <FormControl required fullWidth sx={{ height: 84 }}>
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
    </>
  )
}

export default EventOrganizerRegisterForm
