import { CalendarToday, LocationOnOutlined } from "@mui/icons-material"
import { Box, Grid, Stack, SxProps, Typography } from "@mui/material"
import { grey, purple } from "@mui/material/colors"
import moment from "moment"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { Event } from "../../../interfaces/event/event.interface"
import ContainedButton from "../../UI/button/ContainedButton"
import ContainerCard from "../../UI/card/ContainerCard"
import { ImageWithFallback } from "../../UI/image/ImageWithFallback"
import { UserContext } from "../../../contexts/user/UserContext"
import { Account } from "../../../interfaces/auth/user.interface"

interface P {
  event: Event
  imgFallbackSrc: string
  organizationName: string
  organizerId?: string
  marketTicketName: string
  eventStartDate: Date
  eventName: string
  location?: string
  showBrowseEvents?: boolean
  enabledResale?: boolean
  sx?: SxProps
}

function EventInfoBanner({
  event,
  imgFallbackSrc,
  organizationName,
  organizerId,
  eventName,
  eventStartDate,
  location,
  showBrowseEvents,
  enabledResale,
  sx
}: P) {
  const router = useRouter()
  const { user } = useContext(UserContext)

  const onClickBrowseEvent = () => {
    if (organizerId) {
      router.push(`/marketplace/${organizerId}`)
    }
  }

  return (
    <ContainerCard sx={{ mt: 12, ...sx }}>
      <Grid
        container
        sx={{
          height: "fit-content",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 2,
          position: "relative"
        }}
      >
        <Grid
          item
          sx={{ display: "flex", alignItems: "flex-end", gap: 2, mt: -2 }}
        >
          {imgFallbackSrc && (
            <Box>
              <ImageWithFallback
                src={imgFallbackSrc}
                draggable={false}
                width={100}
                height={100}
                alt={organizationName}
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid #000",
                  position: "absolute",
                  top: -50
                }}
              />
            </Box>
          )}
          <Stack sx={{ position: "relative", bottom: 0, ml: 14, mt: 2 }}>
            <Typography>Event Organizer</Typography>
            <Link
              href={`/marketplace/${organizerId}`}
              style={{
                textDecoration: "none",

                color: "#000"
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                {organizationName}
              </Typography>
            </Link>
          </Stack>
        </Grid>
        {showBrowseEvents && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <ContainedButton
              label="Browse Events"
              variant="contained"
              onClick={onClickBrowseEvent}
            />
          </Box>
        )}
      </Grid>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Link
            href={`/event/detail/${event._id}`}
            style={{ color: grey[900], textDecoration: "none" }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                "&:hover": { textDecoration: "underline" }
              }}
            >
              {eventName}
            </Typography>
          </Link>
          {showBrowseEvents && enabledResale && (
            <Box
              sx={{
                height: "32px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                gap: 2
              }}
            >
              {user?.accountType === Account.CUSTOMER && (
                <ContainedButton
                  label="Sell Tickets"
                  variant="outlined"
                  height="32px"
                  onClick={() => router.push(`/marketplace/sell/${event._id}`)}
                />
              )}
              <Link
                href={`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/address/${event.smartContractAddress}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <ContainedButton
                  label="View All Transactions History"
                  variant="contained"
                  height="32px"
                  isLink
                  sx={{
                    background: purple[400],
                    "&:hover": { background: purple[400] }
                  }}
                />
              </Link>
            </Box>
          )}
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
