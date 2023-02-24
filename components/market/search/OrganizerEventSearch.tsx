import { Typography, Box, Divider } from "@mui/material"
import React, { useContext } from "react"
import { MarketContext } from "../../../contexts/market/MarketContext"
import EventCard from "../event/EventCard"
import EventSearchBar from "./EventSearchBar"

function EventSearch() {
  const { searchedEvents } = useContext(MarketContext)
  return (
    <>
      <EventSearchBar />
      <Box sx={{ height: 64 }} />
      {searchedEvents && (
        <>
          <Typography variant="h5" component="h2">
            Search results
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              mt: 2,
              gridTemplateColumns: "repeat(4, 1fr)"
            }}
          >
            {searchedEvents.length === 0 && (
              <Typography>No matching results</Typography>
            )}
            {searchedEvents.length > 0 && (
              <>
                {searchedEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </>
            )}
          </Box>
          <Divider sx={{ mt: 5 }} />
        </>
      )}
    </>
  )
}

export default EventSearch
