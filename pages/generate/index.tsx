import React from 'react'
import GenerateMainUI from '../../components/generate/GenerateMainUI'
import GenerateContextProvider from '../../contexts/GenerateContext'

function GeneratePage() {
      return (
            <GenerateContextProvider>
                  <GenerateMainUI />
            </GenerateContextProvider>
      )
}

export default GeneratePage