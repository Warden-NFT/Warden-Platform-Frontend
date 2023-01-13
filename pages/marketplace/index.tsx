import { Container } from "@mui/material";
import React from "react";
import Ticket from "../../components/UI/ticket/Ticket";

function MarketplacePage() {
      return (
            <Container>
              <Ticket
                    img="/images/background/ticket-cover-test.jpg"
                    eventName="Among Us Party"
                    eventOrganizer="Warden"
                    ticketType="GENERAL"
                    date={new Date()}
                    seat="A 14"
                    location="MIRA HQ"
                    QRCodeValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
        </Container>
  );
}

export default MarketplacePage;
