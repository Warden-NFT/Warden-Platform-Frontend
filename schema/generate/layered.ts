import { number, object, string } from 'yup'
import { TicketTypes } from '../../interfaces/ticket/ticket.interface'
import { calculateCombination } from '../../utils/random/combination'

export const LayeredAssetTicketFormSchema = object({
  currency: string()
    .oneOf(['ETH', 'MATIC'], 'This currency is not yet supported')
    .required('Currency is required'),
  name: string()
    .max(100, 'Ticket name is too long')
    .required('Ticket name is required'),
  subjectOf: string().required('All ticket must be binded with an event'),
  description: string().max(500, 'Ticket description is too long'),
  // ticketMetadata: object(),
  price: number()
    .min(0, 'Ticket price must be a positive number')
    .required('Ticket price is required'),
  ticketType: string()
    .oneOf(
      ['GENERAL', 'RESERVED_SEAT'] as TicketTypes[],
      'This ticket type is not supported'
    )
    .required('Ticket type is required')
})
