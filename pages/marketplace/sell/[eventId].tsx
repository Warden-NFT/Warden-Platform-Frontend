import { Alert, Box, Grid } from "@mui/material"
import { Container } from "@mui/system"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { useAccount } from "wagmi"
import EventInfoBanner from "../../../components/market/event/EventInfoBanner"
import SellTicketForm from "../../../components/market/sell/SellTicket"
import ContainedButton from "../../../components/UI/button/ContainedButton"
import ContainerCard from "../../../components/UI/card/ContainerCard"
import BannerLayout from "../../../components/UI/layout/BannerLayout"
import { MarketContext } from "../../../contexts/market/MarketContext"
import SellTicketContextProvider from "../../../contexts/market/SellTicketContext"
import {
  withCustomerGuard,
  withEventOrganizerGuard
} from "../../../guards/withAuth"

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
      <Head>
        <title>Sell ticket | {marketTickets?.event.name}</title>
      </Head>
      <BannerLayout
        backgroundImage={marketTickets?.event.image as string}
        title=""
        subtitle=""
        actionName=""
      >
        <Container>
          <Grid container>
            <Grid item xs={12} lg={5} sx={{ pr: [0, 0, 0, 2] }}>
              {marketTickets && (
                <EventInfoBanner
                  event={marketTickets.event}
                  imgFallbackSrc={
                    marketTickets?.organizerInfo.profileImage ?? ""
                  }
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
              )}
            </Grid>
            {marketTickets && !marketTickets.ticketCollection.enableResale && (
              <Grid item xs={12} lg={7}>
                <ContainerCard sx={{ mt: [2, 2, 2, 12] }}>
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    The event organizer did not enable ticket resale for this
                    event.
                  </Alert>
                  <Box sx={{ my: 2 }} />
                  <Box sx={{ width: 200, height: 40 }}>
                    <ContainedButton
                      label="Back to event"
                      variant="outlined"
                      onClick={() =>
                        router.push(
                          `/marketplace/${marketTickets.organizerInfo._id}/${marketTickets.event._id}`
                        )
                      }
                      sx={{ width: 200 }}
                    />
                  </Box>
                </ContainerCard>
              </Grid>
            )}
            {marketTickets && marketTickets.ticketCollection.enableResale && (
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

export default withCustomerGuard(SellTicket)
