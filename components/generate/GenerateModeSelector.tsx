import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import ImageLabelCard from "../UI/card/ImageLabelCard";
import Link from "next/link";

function GenerateModeSelector() {
      return (
            <Container>
                  <Stack direction="column" spacing={2}>

                        <Typography variant="body1"></Typography>
                        <Stack direction="column" gap={4}>
                              <Link
                                    href="/generate/asset"
                                    style={{ textDecoration: "none", color: "black" }}
                              >
                                    <ImageLabelCard
                                          backgroundColor="white"
                                          imageSrc="/images/generate/event-scheduling.jpg"
                                          imageAlt="Create event completely"
                                          width="100%"
                                    />
                              </Link>
                              <Link
                                    href="/generate/layer"
                                    style={{ textDecoration: "none", color: "black" }}
                              >
                                    <ImageLabelCard
                                          backgroundColor="white"
                                          imageSrc="/images/generate/complete-asset-card.avif"
                                          imageAlt="Create event completely"
                                          width="100%"
                                    />
                              </Link>
                        </Stack>
                  </Stack>
            </Container>
      );
}

export default GenerateModeSelector;
