import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { client } from "../../../../configs/axios/axiosConfig"
import { CreateEventContext } from "../../../../contexts/event/CreateEventContext"
import { UserContext } from "../../../../contexts/user/UserContext"
import { Event } from "../../../../interfaces/event/event.interface"
import FadeEntrance from "../../../motion/FadeEntrance"
import ContainedButton from "../../../UI/button/ContainedButton"
import FlatCard from "../../../UI/card/FlatCard"

function EventSummary() {
  const { event, setEvent } = useContext(CreateEventContext)
  const { user } = useContext(UserContext)
  const [eventImage, setEventImage] = useState<File>()

  const handleSaveEvent = async () => {
    setEvent({ ...event, organizerId: user?._id ?? "" })
    const _event = { ...event }
    try {
      const formData = new FormData()
      type E = keyof Event
      for (const key in _event) {
        if (key === "ticketSupply") continue
        formData.append(key, JSON.stringify(_event[key as E]))
      }
      formData.append("ticketSupply", JSON.stringify(event.ticketSupply))
      const res = await client.post<Event>("event/createEvent", formData)
      setEvent({ ...event, ...res.data })
    } catch (error) {
      // TODO display error alert
    }
  }

  useEffect(() => {
    setEventImage(event.image as File)
  }, [event.image])

  return (
    <FadeEntrance>
      <FlatCard sx={{ p: 0, overflow: "hidden" }}>
        {eventImage && (
          <Box>
            <Image
              src={URL.createObjectURL(eventImage)}
              width={1200}
              height={500}
              alt="event image"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Box>
        )}
        <Box sx={{ borderColor: "#000", borderTop: 2, borderBottom: 2, p: 2 }}>
          <Typography variant="h4">HI</Typography>
        </Box>
      </FlatCard>
      <ContainedButton
        label="Save Event"
        variant="contained"
        onClick={handleSaveEvent}
      />
    </FadeEntrance>
  )
}

export default EventSummary
