import { Chip, Grid, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import moment from "moment"
import Image from "next/image"
import React, { useState } from "react"
import FadeEntrance from "../../motion/FadeEntrance"
import ContainedButton from "../../UI/button/ContainedButton"
import FallbackImage from "../../../public/images/common/fallback-image.svg"
import FlatCard from "../../UI/card/FlatCard"
import Link from "next/link"
import { Event } from "../../../interfaces/event/event.interface"
import { grey } from "@mui/material/colors"
import { useRouter } from "next/router"

type Props = {
  event: Event
}

function EventSummary({ event }: Props) {
  // States
  const [eventImage, setEventImage] = useState(event?.image)
  const router = useRouter()

  if (!event) return null
  return (
    <FadeEntrance>
      <FlatCard sx={{ padding: 0 }} noPadding>
        <Box sx={{ fontSize: 0 }}>
          {event.image && (
            <Image
              src={(event.image as string) ?? eventImage}
              width={1200}
              height={520}
              alt="event image"
              draggable={false}
              onError={() => {
                setEventImage(FallbackImage)
                setTimeout(() => {
                  setEventImage(event.image as string)
                }, 500)
              }}
              style={{ objectFit: "cover", width: "100%" }}
            />
          )}
        </Box>
        <Box sx={{ borderTop: "2px solid #000" }}>
          <Grid container>
            <Grid item xs={8} sx={{ borderRight: "2px solid #000" }}>
              <Box sx={{ borderColor: "#000", borderBottom: 2, p: 2 }}>
                <Typography variant="h4">{event.name}</Typography>
              </Box>
              <Box sx={{ borderColor: "#000", p: 2 }}>
                <Typography fontWeight={600}>Description</Typography>
                <Typography>{event.description}</Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography fontWeight={600}>Keywords</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  {event.eventKeywords &&
                    event.eventKeywords.map(
                      (keyword: string, index: number) => (
                        <Chip
                          key={index}
                          label={keyword}
                          color="primary"
                          variant="outlined"
                        />
                      )
                    )}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ bgcolor: "info.main", p: 2 }}>
                  {event.online_url && (
                    <Box sx={{ height: 80 }}>
                      <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
                        Online Event
                      </Typography>
                      <Link
                        href={event.online_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Box>
                          <ContainedButton
                            variant="outlined"
                            label="Join online event"
                            width="200px"
                            onClick={undefined}
                            isLink
                          />
                        </Box>
                      </Link>
                    </Box>
                  )}
                  {event.location && (
                    <Box sx={{ height: 80 }}>
                      <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
                        Event Location
                      </Typography>
                      <Link
                        href={`https://www.google.com/maps/place/?q=place_id:${event.location.place_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Box>
                          <ContainedButton
                            variant="outlined"
                            label="Open in maps"
                            width="200px"
                            onClick={undefined}
                            isLink
                          />
                        </Box>
                      </Link>
                    </Box>
                  )}
                </Box>
                <Box sx={{ height: 16 }} />
                <Box
                  sx={{
                    bgcolor: "info.main",
                    p: 2
                  }}
                >
                  <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
                    Schedule
                  </Typography>
                  <Stack direction="row">
                    <Typography sx={{ width: 100 }}>Start</Typography>
                    <Typography>
                      {moment(event.startDate).format("lll")}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 100 }}>End</Typography>
                    <Typography>
                      {moment(event.endDate).format("lll")}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ width: 100 }}>Doortime</Typography>
                    <Typography>
                      {moment(event.doorTime).format("lll")}
                    </Typography>
                  </Stack>
                </Box>
                {event.smartContractAddress && event.ticketCollectionId && (
                  <Box sx={{ width: "100%", my: 2 }}>
                    <Link
                      href={{
                        pathname: `${router.basePath}/admission`,
                        query: {
                          eid: event._id
                        }
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <ContainedButton
                        isLink
                        variant="contained"
                        label="Admit User"
                        sx={{ width: "100%" }}
                      />
                    </Link>
                    <Typography color={grey[600]} variant="caption">
                      Admit User to allow user to enter this event
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FlatCard>
    </FadeEntrance>
  )
}

export default EventSummary
