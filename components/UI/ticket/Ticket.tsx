import { Box, Chip, Stack, SxProps, Typography } from "@mui/material"
import React from "react"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import EventIcon from "@mui/icons-material/Event"
import EventSeatIcon from "@mui/icons-material/EventSeat"
import { QRCodeCanvas } from "qrcode.react"
import { TicketTypes } from "../../../interfaces/ticket/ticket.interface"
import moment from "moment"
import { grey } from "@mui/material/colors"
import { motion } from "framer-motion"
import PNGAssetPreview from "../../assets/PNGAssetPreview"
import { Theme } from "@mui/system"
import Barcode from "react-barcode"

// https://codepen.io/z-/pen/MJKNJZ
// https://codepen.io/amr-ibrahem/pen/wdrLjL

interface Props {
  assetSrc: string // Image string
  assetName: string
  eventName: string
  eventOrganizer: string
  ticketType: TicketTypes
  date: Date
  seat?: string
  location: string
  isDisabled?: boolean
  codeDisplayMode: "BAR" | "QR" | "TEXT" // NOTE: Barcode should only has numeric value
  codeValue?: string
  onClick?: () => void
  cardSx?: SxProps<Theme>
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
  onClick,
  cardSx
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
        <Stack>
          <PNGAssetPreview
            name={assetName}
            data={assetSrc}
            width={320}
            height={240}
          />
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

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row">
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography>Location</Typography>
              </Stack>
              <Typography>{location}</Typography>
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
                {codeValue ? (
                  <Box>
                    {codeDisplayMode === "QR" && (
                      <QRCodeCanvas value={codeValue} />
                    )}
                    {codeDisplayMode === "BAR" && (
                      <Barcode
                        value={codeValue}
                        displayValue={false}
                        height={50}
                      />
                    )}
                    {codeDisplayMode === "TEXT" && (
                      <Typography>{codeValue}</Typography>
                    )}
                  </Box>
                ) : (
                  <Typography>Waiting</Typography>
                )}
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </motion.div>
  )
}

export default Ticket
