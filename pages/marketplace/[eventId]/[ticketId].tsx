import { useRouter } from "next/router"
import React from "react"

function TicketListing() {
  const router = useRouter()
  const { eventId, ticketId } = router.query

  return (
    <div>
      TicketListing for {eventId} {ticketId}
    </div>
  )
}

export default TicketListing
