import { EventTicket } from "../dtos/ticket/ticket.dto"

export function checkResaleTicket(
  ticket: EventTicket | undefined,
  address: `0x${string}` | undefined
) {
  return Boolean(
    ticket &&
      address &&
      ticket?.ownerHistory.length > 1 &&
      ticket?.ownerHistory.at(-2) !== address
  )
}
