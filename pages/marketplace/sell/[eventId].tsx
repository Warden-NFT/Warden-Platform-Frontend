import { Grid } from "@mui/material"
import { Container } from "@mui/system"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { useAccount } from "wagmi"
import EventInfoBanner from "../../../components/market/event/EventInfoBanner"
import SellTicketForm from "../../../components/market/sell/SellTicket"
import BannerLayout from "../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../contexts/market/MarketContext"
import SellTicketContextProvider from "../../../contexts/market/SellTicketContext"

function SellTicket() {
  const router = useRouter()
  const { address: walletAddress } = useAccount()
  const { eventId } = router.query
  const { marketTickets, getOwnedMarketTickets } = useContext(MarketContext)

  useEffect(() => {
    if (!walletAddress) return
    if (!eventId || typeof eventId !== "string") return
    getOwnedMarketTickets(eventId, walletAddress)
  }, [eventId, walletAddress])

  return (
    <SellTicketContextProvider>
      <BannerLayout
        backgroundImage={marketTickets?.event.image as string}
        title=""
        subtitle=""
        actionName=""
      >
        <Container>
          <Grid container>
            <Grid item xs={12} lg={5} sx={{ pr: [0, 0, 0, 2] }}>
              <EventInfoBanner
                imgFallbackSrc={marketTickets?.organizerInfo.profileImage ?? ""}
                organizationName={
                  marketTickets?.organizerInfo.organizationName ?? ""
                }
                organizerId={marketTickets?.organizerInfo._id}
                marketTicketName={marketTickets?.event.name ?? ""}
                eventStartDate={marketTickets?.event.startDate ?? new Date(0)}
                eventName={marketTickets?.event.name ?? ""}
                location={
                  marketTickets?.event.location?.structured_formatting
                    .main_text || marketTickets?.event.online_url
                }
                showBrowseEvents={false}
              />
            </Grid>
            {marketTickets && (
              <Grid item xs={12} lg={7}>
                <SellTicketForm ownedTickets={marketTickets} />
              </Grid>
            )}
          </Grid>
        </Container>
      </BannerLayout>
    </SellTicketContextProvider>
  )
}

export default SellTicket
