import { Container, Grid, Typography } from "@mui/material"
import React, { useContext } from "react"
import TicketCardList from "../../components/market/ticket/TicketCardList"
import MyTicketActivities from "../../components/ticket/MyTicketActivities"
import MyTicketsList from "../../components/ticket/myTickets/MyTicketsList"
import MyTicketsSearch from "../../components/ticket/myTickets/MyTicketsSearch"
import FlatCard from "../../components/UI/card/FlatCard"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import MyTicketsContextProvider, {
  MyTicketsContext
} from "../../contexts/ticket/myTicketsContext"

function MyTickets() {
  const { filteredMyTickets, getUserTickets } = useContext(MyTicketsContext)

  return (
    <MyTicketsContextProvider>
      <BannerLayout
        backgroundImage="/images/background/my-tickets-background.png"
        title="My Tickets"
        subtitle="Tickets I own or listed for sale"
        enableActionButton={false}
      >
        <Container>
          <MyTicketsSearch />
          <FlatCard sx={{ marginY: 4, marginTop: 8, borderRadius: 4 }}>
            <Typography variant="h4" component="h2">
              Ticket for sale
            </Typography>
            <TicketCardList tickets={filteredMyTickets?.myTicketListing} />
          </FlatCard>
          {/* <MyTicketsList /> */}
          {/* <Grid container>
            <Grid item xs={12}>
              <MyTicketActivities />
            </Grid>
            <Grid item xs={12}>
              <MyTicketsList />
            </Grid>
          </Grid> */}
        </Container>
      </BannerLayout>
    </MyTicketsContextProvider>
  )
}

export default MyTickets
