import { Container, Grid } from "@mui/material"
import React from "react"
import MyTicketsList from "../components/ticket/myTickets/MyTicketsList"
import MyTicketsSearch from "../components/ticket/myTickets/MyTicketsSearch"
import BannerLayout from "../components/UI/layout/BannerLayout"
import MyTicketsContextProvider from "../contexts/ticket/myTicketsContext"

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
            <Grid item xs={12} lg={8}>
              <MyTicketsList />
            </Grid>
            <Grid item xs={12} lg={4}>
              Activities
            </Grid>
          </Grid>
        </Container>
      </BannerLayout>
    </MyTicketsContextProvider>
  )
}

export default MyTickets
