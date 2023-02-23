import { Box, Card, Skeleton, Typography } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { MarketContext } from "../../contexts/market/MarketContext"
import EventCard from "../event/EventCard"

function LatestEvents() {
  const { latestEvents, getLatestEvents } = useContext(MarketContext)

  useEffect(() => {
    getLatestEvents()
  }, [])

  return (
    <>
      <Typography variant="h5" component="h2">
        Latest
      </Typography>
      <Box sx={{ height: 12 }} />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mt: 2,
          gridTemplateColumns: "repeat(4, 1fr)"
        }}
      >
        {!latestEvents && (
          <Card
            sx={{ p: 0, border: "2px solid #000", height: 400 }}
            elevation={0}
          >
            <Skeleton variant="rectangular" height={140} />
            <Box sx={{ p: 2 }}>
              <Skeleton height={40} />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Box>
          </Card>
        )}
        {latestEvents && latestEvents.length === 0 && (
          <Typography>No events at the moment.</Typography>
        )}
        {latestEvents && latestEvents.length > 0 && (
          <>
            {latestEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </>
        )}
      </Box>
    </>
  )
}

export default LatestEvents
