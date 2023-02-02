import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import useAsyncEffect from "../../../../hooks/useAsyncEffect"
import { useEvents } from "../../../../hooks/useEvents"
import { Event } from "../../../../interfaces/event/event.interface"
import FadeEntrance from "../../../motion/FadeEntrance"

import FlatCard from "../../../UI/card/FlatCard"

type Props = {
  eventId: string
}

function EventSummary({ eventId }: Props) {
  const { getEvent } = useEvents()
  const [currentEvent, setCurrentEvent] = useState<Event>()
  const [loading, setLoading] = useState<boolean>(true)

  useAsyncEffect(async () => {
    if (!eventId) return
    if (currentEvent && currentEvent._id === eventId) return
    const _event = await getEvent(eventId)
    setCurrentEvent(_event)
    setLoading(false)
  }, [eventId])

  if (loading) return <Box>Loading...</Box>
  return (
    <FadeEntrance>
      <FlatCard sx={{ p: 0, overflow: "hidden" }}>
        <Box>
          <Image
            src={currentEvent?.image as string}
            width={1200}
            height={500}
            alt="event image"
            style={{ objectFit: "cover", width: "100%", height: "500px" }}
          />
        </Box>
        <Box sx={{ borderColor: "#000", borderBottom: 2, py: 2 }}>
          <Typography variant="h4">HI</Typography>
        </Box>
        <Box sx={{ borderColor: "#000" }}>
          <Typography>{currentEvent?.description}</Typography>
        </Box>
      </FlatCard>
    </FadeEntrance>
  )
}

export default EventSummary
