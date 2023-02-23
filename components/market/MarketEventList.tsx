import { Box, Card, Skeleton, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { MarketContext } from "../../contexts/market/MarketContext"
import useAsyncEffect from "../../hooks/useAsyncEffect"
import { Event } from "../../interfaces/event/event.interface"
import {
  EventListMode,
  EVENT_LIST_MODE
} from "../../interfaces/event/eventSearch.interface"
import EventCard from "../event/EventCard"

type Props = {
  mode: EventListMode
}

function MarketEventList(props: Props) {
  const { featuredEvents, getFeaturedEvents } = useContext(MarketContext)
  const { latestEvents, getLatestEvents } = useContext(MarketContext)

  const [eventList, setEventList] = useState<Event[] | undefined>([])

  useAsyncEffect(async () => {
    if (props.mode === EVENT_LIST_MODE.FEATURED) {
      if (!featuredEvents) {
        const _eventList = await getFeaturedEvents()
        setEventList(_eventList)
      } else {
        setEventList(featuredEvents)
      }
    }
    if (props.mode === EVENT_LIST_MODE.LATEST) {
      if (!featuredEvents) {
        const _eventList = await getLatestEvents()
        setEventList(_eventList)
      } else {
        setEventList(latestEvents)
      }
    }
  }, [])

  return (
    <>
      <Typography variant="h5" component="h2">
        {props.mode === EVENT_LIST_MODE.FEATURED
          ? EVENT_LIST_MODE.FEATURED
          : EVENT_LIST_MODE.LATEST}
      </Typography>
      <Box sx={{ height: 12 }} />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mt: 2,
          gridTemplateColumns: [
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)"
          ]
        }}
      >
        {!eventList && (
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
        {eventList && eventList.length === 0 && (
          <Typography>No featured events at the moment.</Typography>
        )}
        {eventList && eventList.length > 0 && (
          <>
            {eventList.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </>
        )}
      </Box>
      <Box sx={{ height: 12 }} />
    </>
  )
}

export default MarketEventList
