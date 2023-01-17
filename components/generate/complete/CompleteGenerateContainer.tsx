import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { COMPLETE_MODE_STEPS } from '../../../constants/generate/steps'
import { GenerateCompleteContext } from '../../../contexts/generate/GenerateCompleteContext'
import ActiveStepper from '../../UI/navigation/ActiveStepper'
import CompleteDropzone from './CompleteDropzone'
import queryString from 'query-string'
import { TicketTypes } from '../../../interfaces/ticket/ticket.interface'

import CustomizeUtilityForm from './CustomizeUtilityForm'
import CompleteAssetTicketForm from './CompleteAssetTicketForm'

function CompleteGenerateContainer() {
  const { activeStep, formInfo, setFormInfo } = useContext(
    GenerateCompleteContext
  )
  const router = useRouter()

  useEffect(() => {
    const { query } = queryString.parseUrl(window.location.href)
    const { ticketType } = query
    const _form = { ...formInfo }
    if (ticketType) {
      _form.ticketType = ticketType as TicketTypes
      setFormInfo(_form)
    } else {
      router.push('/generate')
    }
  }, [window.location])

  return (
    <ActiveStepper steps={COMPLETE_MODE_STEPS} activeStep={activeStep}>
      {activeStep === 1 && <CompleteAssetTicketForm />}
      {activeStep === 2 && <CompleteDropzone />}
      {/* {activeStep === 2 && <CompleteForm />} */}
      {activeStep === 3 && formInfo.ticketType === 'GENERAL' && (
        <CustomizeUtilityForm />
      )}
      {activeStep === 3 && formInfo.ticketType === 'RESERVED_SEAT' && (
        <div>Work in progress...</div>
      )}
    </ActiveStepper>
  )
}

export default CompleteGenerateContainer
