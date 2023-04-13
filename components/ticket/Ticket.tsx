import { Box, Chip, Stack, SxProps, Typography } from "@mui/material"
import React from "react"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import EventIcon from "@mui/icons-material/Event"
import EventSeatIcon from "@mui/icons-material/EventSeat"
import { QRCodeCanvas } from "qrcode.react"
import { TicketTypes } from "../../interfaces/ticket/ticket.interface"
import moment from "moment"
import { grey } from "@mui/material/colors"
import { motion } from "framer-motion"
import PNGAssetPreview from "../assets/PNGAssetPreview"
import { Theme } from "@mui/system"

// https://codepen.io/z-/pen/MJKNJZ
// https://codepen.io/amr-ibrahem/pen/wdrLjL

interface Props {
  assetSrc: string // Image string
  assetName: string
  eventName: string
  eventOrganizer: string
  ticketType: TicketTypes
  hasUsed?: boolean
  date: Date
  seat?: string
  location: string
  isDisabled?: boolean
  codeDisplayMode: "BAR" | "QR" | "TEXT" // NOTE: Barcode should only has numeric value
  codeValue?: string
  onClick?: () => void
  cardSx?: SxProps<Theme>
  isOrganizer: boolean
}

function Ticket({
  assetSrc,
  assetName,
  eventName,
  eventOrganizer,
  ticketType,
  date,
  seat,
  location,
  codeValue,
  isDisabled,
  codeDisplayMode,
  hasUsed,
  onClick,
  cardSx,
  isOrganizer
}: Props) {
  return (
    <motion.div whileHover={{ y: -12 }} style={{ position: "relative" }}>
      <Box
        onClick={!isDisabled ? onClick : undefined}
        sx={{
          position: "relative",
          width: "320px",
          overflow: "hidden",
          border: 2,
          backgroundColor: "white",
          borderRadius: 4,
          margin: 2,
          ...cardSx
        }}
      >
        <Stack sx={{ overflow: "hidden" }}>
          <Box>
            <PNGAssetPreview
              name={assetName}
              data={assetSrc}
              width={320}
              height={240}
            />
          </Box>
          <Stack spacing={1} sx={{ padding: 2, borderBottom: "dashed 2px" }}>
            <Box sx={{ textAlign: "start" }}>
              <Typography
                component="h2"
                fontSize="18"
                fontWeight="700"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {eventName}
              </Typography>
              <Typography
                component="p"
                fontSize="14px"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {eventOrganizer}
              </Typography>
              <Box>
                <Chip sx={{ marginY: 1 }} size="small" label={ticketType} />
              </Box>
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              <Stack direction="row">
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography>Location</Typography>
                <Box sx={{ width: "40px" }} />
              </Stack>
              <Typography whiteSpace="nowrap">{location}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row">
                <EventIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography>Date</Typography>
              </Stack>
              <Typography>
                {moment(date).format("DD/MM/YYYY hh:mm a")}
              </Typography>
            </Stack>
            {seat && (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                  <EventSeatIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography>Seat</Typography>
                </Stack>
                <Typography>{seat}</Typography>
              </Stack>
            )}
          </Stack>

          <Box sx={{ display: "grid", placeItems: "center", padding: 2 }}>
            {isDisabled ? (
              <Box>
                <Typography fontSize="18px" color={grey[600]}>
                  Ticket Disabled
                </Typography>
              </Box>
            ) : (
              <Box>
                {!hasUsed ? (
                  <>
                    {codeValue && (
                      <Box>
                        <QRCodeCanvas
                          width="200"
                          height="200"
                          value={codeValue}
                          imageSettings={{
                            src: "/images/logo/WardenDark.svg",
                            width: 40,
                            height: 14,
                            excavate: true
                          }}
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      height: "100px"
                    }}
                  >
                    <Typography>
                      This ticket has been used or is in resale
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
            {isOrganizer && (
              <Typography fontSize="14px" color={grey[600]} sx={{ mt: 2 }}>
                You are the event organizer and cannot use this ticket.
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </motion.div>
  )
}

export default Ticket
