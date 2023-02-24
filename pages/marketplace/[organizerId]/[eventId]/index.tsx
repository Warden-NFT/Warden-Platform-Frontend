import { Box } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import BannerLayout from "../../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../../contexts/market/MarketContext"

function MarketEvent() {
  const router = useRouter()
  const { eventId } = router.query
  const { marketTickets, getMarketTickets } = useContext(MarketContext)

  useEffect(() => {
    if (!router.query) return
    if (!eventId) return
    getMarketTickets(eventId as string)
  }, [router.query])

  return (
    <BannerLayout
      backgroundImage={marketTickets?.event.image as string}
      title=""
      subtitle=""
      enableActionButton={false}
    >
      <Box />
    </BannerLayout>
  )
}

export default MarketEvent
