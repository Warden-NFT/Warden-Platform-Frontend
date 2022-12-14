import { Container, Divider, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { GenerateContext } from '../../../contexts/GenerateContext'
import { STEPS } from '../../../constants/generate/steps'

interface Props {
      children: React.ReactNode,
      header: string
}

function GenerateContainer({ children, header }: Props) {
      const { activeStep } = useContext(GenerateContext)

      return (
            <Container sx={{ width: '100%', p: 4, backgroundColor: 'white', borderRadius: 3 }}>
                  <Typography variant='h6' fontWeight='600' color='primary'>{header}</Typography>
                  <Typography fontSize='11' color='gray'>{STEPS[activeStep - 1].description}</Typography>
                  <Divider sx={{ mt: 2, mb: 3 }} />
                  <main>
                        {children}
                  </main>
            </Container>
      )
}

export default GenerateContainer