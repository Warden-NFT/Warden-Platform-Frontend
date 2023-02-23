import { ButtonBase, Card, Typography, CardContent, Box } from "@mui/material"
import Image from "next/image"
import React from "react"
import { Event } from "../../interfaces/event/event.interface"
import ContainerCard from "../UI/card/ContainerCard"

type Props = {
  event: Event
}

function EventCard({ event }: Props) {
  return (
    <ContainerCard
      sx={{ height: "fit-content", minHeight: "400px", borderRadius: 1, p: 0 }}
    >
      <ButtonBase sx={{ textAlign: "start", width: "100%" }}>
        <Card
          sx={{
            p: 0,
            height: "fit-content",
            width: "100%"
          }}
          elevation={0}
        >
          <Box
            sx={{
              height: 280,
              position: "relative"
            }}
          >
            <Image
              height={200}
              width={200}
              src={event.image as string}
              alt={event.name}
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                position: "absolute"
              }}
            />
            <Box
              sx={{
                height: "50%",
                width: "100%",
                position: "absolute",
                bottom: 0,
                background:
                  "linear-gradient(to bottom, rgba(86, 41, 231, 0), rgba(0, 0, 0, 0.8))"
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                position: "absolute",
                bottom: 0,
                pt: 2,
                px: 2,
                fontWeight: 500,
                color: "#fff"
              }}
            >
              {event.name}
            </Typography>
          </Box>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    </ContainerCard>
  )
}

export default EventCard
