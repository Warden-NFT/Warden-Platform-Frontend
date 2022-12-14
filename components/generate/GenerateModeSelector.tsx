import { Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import ModeSelectionCard from "./ModeSelectionCard";

function GenerateModeSelector() {
      const router = useRouter()
      function handleClickCompleteAsset() {
            router.push('/generate/asset')
      }

      function handleClickLayeredAsset() {
            router.push('/generate/layer')
      }

      return (
            <Container>
                  <Stack direction="column" spacing={2}>
                        <Typography variant="h6">Welcome to NFT ticket generator</Typography>
                        <Typography variant="body1"></Typography>
                        <Stack direction="row" justifyContent="space-around">
                              <ModeSelectionCard
                                    heading="Upload complete assets"
                                    description="Upload finished assets and mint ticket NFT collection!"
                                    image='/images/generate/completed-asset-card-image.jpg'
                                    imageAlt='Completed generation mode cover'
                                    handleClick={handleClickCompleteAsset}
                              />
                              <ModeSelectionCard
                                    heading="Upload asset layers"
                                    description="Upload multiple layers of your assets, get it randomize, and mint ticket NFT collection!"
                                    image='/images/generate/layer-asset-card-image.avif'
                                    imageAlt='Layered generation mode cover'
                                    handleClick={handleClickLayeredAsset}
                              />
                        </Stack>
                  </Stack>
            </Container>
      );
}

export default GenerateModeSelector;
