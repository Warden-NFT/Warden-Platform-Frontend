import { number, object, string, date, array } from 'yup'
import { TicketTypes } from '../../interfaces/ticket/ticket.interface'
import moment from 'moment'

export const CompleteAssetFormSchema = object({
  eventName: string()
    .required('This field is required')
    .max(100, 'Event name is too long'),
  organizerName: string()
    .required('This field is required')
    .max(100, 'Event organizer name is too long'),
  eventExternalUrl: string().url('Please enter a valid URL'),
  description: string(),
  ticketType: string()
    .oneOf(['GENERAL', 'RESERVED_SEAT'] as TicketTypes[])
    .required('This field is required')
})

export const CompleteAssetTicketFormSchema = object({
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

export const CompleteAssetCustomizeUtilitySchema = object({
  publicationDatetime: date()
    .test(
      'isDateFuture',
      'Publication date must be at least 1 day from now',
      (date) => {
        const time = moment(date)
        const now = moment()

        if (time.diff(now, 'days') >= 1) {
          return true
        }
        return false
      }
    )
    .required('Publication date is required'),
  assets: array().of(
    object({
      id: number(),
      name: string().max(100, 'Name is too long').required('Name is required'),
      quantity: number()
        .min(0, 'Zero is the minimum quantity')
        .required('Quantity is required')
    })
  ),
  vipAssets: array().of(
    object({
      id: number(),
      name: string().max(100, 'Name is too long').required('Name is required'),
      quantity: number()
        .min(0, 'Zero is the minimum quantity')
        .required('Quantity is required')
    })
  )
})
