import { Container } from '@mui/material'
import React from 'react'
import GenerateModeSelector from '../../components/generate/GenerateModeSelector'

function GeneratePage() {
      return (
            <Container sx={{ display: 'grid', placeItems: 'center' }}>
                  <GenerateModeSelector />
                  <div>Some documentations</div>
            </Container>
      )
}

export default GeneratePage