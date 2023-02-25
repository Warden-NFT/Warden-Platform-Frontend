import { useRouter } from "next/router"
import React from "react"

function MarketTicket() {
  const router = useRouter()
  const { eventId, ticketId } = router.query

  return (
    <div>
      MarketTicket for {eventId} {ticketId}
    </div>
  )
}

export default MarketTicket
