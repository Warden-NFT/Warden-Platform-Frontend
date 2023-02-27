import { useRouter } from "next/router"
import React, { useContext } from "react"
import EventInfoBanner from "../../../../../components/market/event/EventInfoBanner"
import BannerLayout from "../../../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../../../contexts/market/MarketContext"

function MarketTicket() {
  const router = useRouter()
  const { eventId, ticketId } = router.query
  const { marketTickets, getMarketTickets } = useContext(MarketContext)

  return (
    <div>
      <BannerLayout
        backgroundImage={marketTickets?.event.image as string}
        title=""
        subtitle=""
        actionName=""
      >
        <EventInfoBanner
          imgFallbackSrc={marketTickets?.organizerInfo.profileImage as string}
          organizationName={marketTickets?.organizerInfo.organizationName ?? ""}
          organizerId={marketTickets?.organizerInfo._id}
          marketTicketName={marketTickets?.event.name ?? ""}
          eventStartDate={marketTickets?.event.startDate ?? new Date(0)}
          eventName={marketTickets?.event.name ?? ""}
          location={
            marketTickets?.event.location?.structured_formatting.main_text ||
            marketTickets?.event.online_url
          }
        />
      </BannerLayout>
      MarketTicket for {eventId} {ticketId}
    </div>
  )
}

export default MarketTicket
