import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { QRCodeCanvas } from "qrcode.react";
// https://codepen.io/z-/pen/MJKNJZ
// https://codepen.io/amr-ibrahem/pen/wdrLjL
function Ticket() {
      return (
            <Box sx={{ width: 330, minHeight: 580 }}>
                  <Box
                        sx={{
                              backgroundColor: "white",
                              width: "100%",
                              height: "100%",
                              borderRadius: "12px",
                        }}
                  >
                        <Image
                              src="/images/background/ticket-cover-test.jpg"
                              width="330"
                              alt="Ticket cover image"
                              height="200"
                              style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                        />
                        <Box sx={{ p: 2 }}>
                              <Box>
                                    <Typography fontSize={18} fontWeight="800">
                                          Event Name
                                    </Typography>
                                    <Typography fontSize={12} fontWeight="300">
                                          Event Organizer
                                    </Typography>
                              </Box>
                              <Chip sx={{ mt: 1 }} size='small' label="Reseaved Seating" />


                              {/* TODO: Loop all ticket attributes */}
                              <Box sx={{ mt: 4 }}>
                                    <Stack direction="row" justifyContent="space-between">
                                          <Stack direction="row">
                                                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                                                <Typography>Location</Typography>
                                          </Stack>
                                          <Typography>Location</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                          <Stack direction="row">
                                                <EventIcon fontSize="small" sx={{ mr: 1 }} />
                                                <Typography>Date</Typography>
                                          </Stack>
                                          <Typography>21/04/2023 11:15 AM</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                          <Stack direction="row">
                                                <EventSeatIcon fontSize="small" sx={{ mr: 1 }} />
                                                <Typography>Seat</Typography>
                                          </Stack>
                                          <Typography>A 69</Typography>
                                    </Stack>
                              </Box>
                        </Box>
                        <Box position='relative'>
                              <Box
                                    sx={{
                                          backgroundColor: "#efefef",
                                          width: "24px",
                                          height: "24px",
                                          borderRadius: "50%",
                                          position: "absolute",
                                          top: '-12px',
                                          left: '-12px'
                                    }}
                              /
                              >
                              <Divider sx={{ borderStyle: 'dotted' }} />
                              <Box
                                    sx={{
                                          backgroundColor: "#efefef",
                                          width: "24px",
                                          height: "24px",
                                          borderRadius: "50%",
                                          position: "absolute",
                                          top: '-12px',
                                          right: '-12px'
                                    }}
                              />
                        </Box>
                        <Box
                              sx={{
                                    width: "100%",
                                    height: 160,
                                    display: "grid",
                                    placeItems: "center",
                              }}
                        >
                              <QRCodeCanvas value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
                        </Box>
                  </Box>
            </Box>
      );
}

export default Ticket;
