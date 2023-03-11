import { Container, Typography } from "@mui/material"
import React, { useContext } from "react"
import TicketCardList from "../../components/market/ticket/TicketCardList"
import MyTicketsSearch from "../../components/ticket/myTickets/MyTicketsSearch"
import FlatCard from "../../components/UI/card/FlatCard"
import BannerLayout from "../../components/UI/layout/BannerLayout"
import { MyTicketsContext } from "../../contexts/ticket/MyTicketsContext"

function MyTickets() {
  const { filteredMyTickets } = useContext(MyTicketsContext)

  return (
    <BannerLayout
      backgroundImage="/images/background/my-tickets-background.png"
      title="My Tickets"
      subtitle="Tickets I own or listed for sale"
      enableActionButton={false}
    >
      <Container>
        <MyTicketsSearch />
        {filteredMyTickets?.myTicketListing &&
          filteredMyTickets?.myTicketListing.length > 0 && (
          <FlatCard sx={{ marginY: 4, marginTop: 8, borderRadius: 4 }}>
            <Typography variant="h4" component="h2">
                Ticket for sale
            </Typography>
            <TicketCardList tickets={filteredMyTickets?.myTicketListing} />
          </FlatCard>
        )}
        <FlatCard sx={{ marginY: 4, marginTop: 8, borderRadius: 4 }}>
          <Typography variant="h4" component="h2">
            My Tickets
          </Typography>
          {filteredMyTickets?.myTickets &&
            filteredMyTickets?.myTickets.length > 0 && (
            <TicketCardList tickets={filteredMyTickets?.myTickets} />
          )}
        </FlatCard>
      </Container>
    </BannerLayout>
  )
}

export default MyTickets
