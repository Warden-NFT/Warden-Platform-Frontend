import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  ButtonBase
} from "@mui/material"
import { Box } from "@mui/system"

import React, { useEffect } from "react"
import { useEvents } from "../../../hooks/useEvents"
import HoverCard from "../../motion/HoverCard"
import { Event } from "../../../interfaces/event/event.interface"
import { useRouter } from "next/router"

function EventsList() {
  const { events, getEventFromOrganizer } = useEvents()
  const router = useRouter()

  useEffect(() => {
    getEventFromOrganizer()
  }, [])

  const handleClickEvent = (eventId: string | undefined) => {
    if (!eventId) return
    router.push({
      pathname: `/event/detail/${eventId}`
    })
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        mt: 2,
        gridTemplateColumns: "repeat(3, 1fr)"
      }}
    >
      {events.length ? (
        events.map((event: Event, index: number) => (
          <HoverCard key={index} sx={{ height: 400 }}>
            <ButtonBase
              sx={{ textAlign: "start", width: "100%" }}
              onClick={() => handleClickEvent(event._id)}
            >
              <Card
                sx={{ p: 0, height: 400, width: "100%", borderRadius: 0 }}
                key={index}
                elevation={0}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={event.image as string}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </HoverCard>
        ))
      ) : (
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
    </Box>
  )
}

export default EventsList
