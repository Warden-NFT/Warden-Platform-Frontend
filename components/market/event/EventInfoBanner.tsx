import { CalendarToday, LocationOnOutlined } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import moment from "moment"
import { useRouter } from "next/router"
import React from "react"
import ContainedButton from "../../UI/button/ContainedButton"
import ContainerCard from "../../UI/card/ContainerCard"
import { ImageWithFallback } from "../../UI/image/ImageWithFallback"

interface P {
  imgFallbackSrc: string
  organizationName: string
  organizerId?: string
  marketTicketName: string
  eventStartDate: Date
  eventName: string
  location?: string
}

// {marketTickets?.event.location?.structured_formatting
//   .main_text || marketTickets?.event.online_url}

function EventInfoBanner({
  imgFallbackSrc,
  organizationName,
  organizerId,
  eventName,
  eventStartDate,
  location
}: P) {
  const router = useRouter()
  const onClickBrowseEvent = () => {
    if (organizerId) {
      router.push(`/marketplace/${organizerId}`)
    }
  }

  return (
    <ContainerCard sx={{ mt: 12 }}>
      <Box
        sx={{
          marginTop: -7,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          <ImageWithFallback
            src={imgFallbackSrc}
            draggable={false}
            width={100}
            height={100}
            alt={organizationName}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              border: "4px solid #000"
            }}
          />
          <Stack>
            <Typography>Event Organizer</Typography>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              {organizationName}
            </Typography>
          </Stack>
        </Box>
        <ContainedButton
          label="Browse Events"
          variant="contained"
          onClick={onClickBrowseEvent}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#F4F4F0",
          mx: -2,
          mt: 2,
          mb: -2,
          p: 2,
          borderTop: "1px solid #000"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {eventName}
          </Typography>
          <Box sx={{ height: "50px", display: "grid", placeItems: "center" }}>
            <ContainedButton label="Sell Tickets" variant="outlined" />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <CalendarToday sx={{ fontSize: 18 }} />
          <Typography>{moment(eventStartDate).format("lll")}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <LocationOnOutlined sx={{ fontSize: 18 }} />
          <Typography>{location}</Typography>
        </Box>
      </Box>
    </ContainerCard>
  )
}

export default EventInfoBanner
