import { useRouter } from "next/router"
import React from "react"

function MarketEvent() {
  const router = useRouter()
  const { eventId } = router.query

  return <div>MarketEvent</div>
}

export default MarketEvent
