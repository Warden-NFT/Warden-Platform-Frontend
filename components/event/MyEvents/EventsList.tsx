import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  ButtonBase
} from "@mui/material"
import { Box } from "@mui/system"

import React, { useContext, useEffect } from "react"
import { useEvents } from "../../../hooks/useEvents"
import HoverCard from "../../motion/HoverCard"
import { Event } from "../../../interfaces/event/event.interface"
import { useRouter } from "next/router"
import { UserContext } from "../../../contexts/user/UserContext"

function EventsList() {
  const { user } = useContext(UserContext)
  const { events, getEventFromOrganizer, eventLoading } = useEvents()
  const router = useRouter()

  useEffect(() => {
    if (!user?._id) return
    getEventFromOrganizer(user?._id)
  }, [user])

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
        gridTemplateColumns: [
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)"
        ]
      }}
    >
      {eventLoading ? (
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
      ) : (
        <>
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
                      title={event.name}
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
            <Box>
              <Typography>Create your first event now!</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default EventsList
