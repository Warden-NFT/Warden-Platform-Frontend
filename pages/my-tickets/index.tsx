import { Container, Grid } from "@mui/material"
import React from "react"
import MyTicketActivities from "../../components/ticket/MyTicketActivities"
import MyTicketsList from "../../components/ticket/myTickets/MyTicketsList"
import MyTicketsSearch from "../../components/ticket/myTickets/MyTicketsSearch"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import MyTicketsContextProvider from "../../contexts/ticket/myTicketsContext"

function MyTickets() {
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
          <Grid container>
            <Grid item xs={12}>
              <MyTicketActivities />
            </Grid>
            <Grid item xs={12}>
              <MyTicketsList />
            </Grid>
          </Grid>
        </Container>
      </BannerLayout>
    </MyTicketsContextProvider>
  )
}

export default MyTickets
