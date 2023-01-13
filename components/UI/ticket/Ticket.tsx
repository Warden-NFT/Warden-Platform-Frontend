import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { QRCodeCanvas } from "qrcode.react";
import { TicketTypes } from "../../../interfaces/ticket/ticket.interface";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { motion } from "framer-motion";
// https://codepen.io/z-/pen/MJKNJZ
// https://codepen.io/amr-ibrahem/pen/wdrLjL

interface Props {
      backgroundColor?: string;
      img: string;
      eventName: string;
      eventOrganizer: string;
      ticketType: TicketTypes;
      date: Date;
      seat?: string;
      location: string;
      QRCodeValue?: string;
      showAsQRCode?: boolean;
      isDisabled?: boolean;
      onClick?: () => void;
}

function Ticket({
      backgroundColor,
      img,
      eventName,
      eventOrganizer,
      ticketType,
      date,
      seat,
      location,
      QRCodeValue,
      isDisabled,
      showAsQRCode,
      onClick
}: Props) {
      function getBgColor() {
            if (isDisabled) {
                  return grey[100];
            }

            return backgroundColor ? backgroundColor : "white";
      }

      function getImageOpacity() {
            return isDisabled ? 0.6 : 1;
      }

      return (
            <motion.div whileHover={{
                  scale: isDisabled ? 1 : 1.03
            }}
                  onClick={onClick}
            >
                  <Box
                        sx={[
                              {
                                    width: 330,
                                    minHeight: 580,
                                    "&:hover": {
                                          cursor: "pointer",
                                    },
                                    margin: 2,
                              },
                              isDisabled ? { color: grey[500] } : null,
                        ]}
                  >
                        <Box
                              sx={{
                                    backgroundColor: getBgColor(),
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "12px",
                              }}
                        >
                              <Image
                                    src={img}
                                    width="330"
                                    alt={`${eventName} cover`}
                                    height="200"
                                    style={{
                                          borderTopLeftRadius: 12,
                                          borderTopRightRadius: 12,
                                          opacity: getImageOpacity(),
                                    }}
                              />
                              <Box sx={{ p: 2 }}>
                                    <Box>
                                          <Typography fontSize={18} fontWeight="800">
                                                {eventName}
                                          </Typography>
                                          <Typography fontSize={12} fontWeight="300">
                                                {eventOrganizer}
                                          </Typography>
                                    </Box>
                                    <Chip sx={{ mt: 1 }} size="small" label={ticketType} />

                                    {/* TODO: Loop all ticket attributes */}
                                    <Box sx={{ mt: 4 }}>
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
                                    </Box>
                              </Box>
                              <Box position="relative">
                                    <Box
                                          sx={{
                                                backgroundColor: "#faf8ff",
                                                width: "24px",
                                                height: "24px",
                                                borderRadius: "50%",
                                                position: "absolute",
                                                top: "-12px",
                                                left: "-12px",
                                          }}
                                    />
                                    <Divider sx={{ borderStyle: "dotted" }} />
                                    <Box
                                          sx={{
                                                backgroundColor: "#faf8ff",
                                                width: "24px",
                                                height: "24px",
                                                borderRadius: "50%",
                                                position: "absolute",
                                                top: "-12px",
                                                right: "-12px",
                                          }}
                                    />
                              </Box>
                              {QRCodeValue && (
                                    <Box
                                          sx={{
                                                width: "100%",
                                                height: 160,
                                                display: "grid",
                                                placeItems: "center",
                                          }}
                                    >
                                          {showAsQRCode ? (
                                                <>
                                                      {!isDisabled ? (
                                                            <QRCodeCanvas value={QRCodeValue} />
                                                      ) : (
                                                            <Typography>Ticket Disabled</Typography>
                                                      )}
                                                </>
                                          ) : (
                                                <Box sx={{ width: "200px", textAlign: "center" }}>
                                                      <Typography>{QRCodeValue}</Typography>
                                                </Box>
                                          )}
                                    </Box>
                              )}
                        </Box>
                  </Box>
            </motion.div>
      );
}

export default Ticket;
