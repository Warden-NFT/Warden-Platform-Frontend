import {
  Divider,
  FormLabel,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import ContainerCard from '../../components/UI/card/ContainerCard'
import Link from 'next/link'
import EventOrganizerRegisterForm from '../../components/auth/EventOrganizerRegisterForm'
import { grey } from '@mui/material/colors'
import CustomerRegisterForm from '../../components/auth/CustomerRegisterForm'

type RegisterMode = 'Customer' | 'EventOrganizer'

function Register() {
  const [registerMode, setRegisterMode] = useState<RegisterMode>('Customer')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: RegisterMode
  ) => {
    setRegisterMode(newMode)
  }

  return (
    <Grid container spacing={0} marginTop={4} justifyContent="center">
      <Grid item xs={12} sm={8} lg={6}>
        <ContainerCard>
          <>
            <Typography variant="h5" fontWeight="bold" component="h1">
              Register
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                borderRadius: '12px',
                padding: 2,
                backgroundColor: grey[100]
              }}
            >
              <FormLabel sx={{ fontWeight: 600 }}>
                Are you registerring as a customer or an event organizer?
              </FormLabel>
              <Box sx={{ my: 2 }} />
              <Box>
                <ToggleButtonGroup
                  color="primary"
                  value={registerMode}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="Customer">Customer</ToggleButton>
                  <ToggleButton value="EventOrganizer">
                    Event Organizer
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />

            {registerMode === 'Customer' && <CustomerRegisterForm />}
            {registerMode === 'EventOrganizer' && (
              <EventOrganizerRegisterForm />
            )}

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
