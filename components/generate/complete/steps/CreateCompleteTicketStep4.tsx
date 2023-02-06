import { Box, Stack, Typography } from "@mui/material"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { usePinnie } from "../../../../hooks/usePinnie"
import { PinataPinResponse } from "../../../../interfaces/mint/pinata.interface"
import ContainedButton from "../../../UI/button/ContainedButton"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"

function CreateCompleteTicketStep4() {
  const {
    setActiveStep,
    assets,
    vipAssets,
    uploadedAssets,
    uploadedVipAssets
  } = useContext(GenerateCompleteContext)
  const [uploadedAssetAmount, setUploadedAssetAmount] = useState(0)
  const [uploadedVipAmount, setUploadedVipAmount] = useState(0)
  const { authenticated, pinFilesToIPFS } = usePinnie()

  const [assetPin, setAssetPin] = useState<PinataPinResponse[]>([])
  const [assetVipPin, setVipAssetPin] = useState<PinataPinResponse[]>([])

  useEffect(() => {
    if (!authenticated) return
    setUploadedAssetAmount(0)
    setUploadedVipAmount(0)

    async function fn() {
      const assetMetadata = uploadedAssets.map((asset) => {
        return {
          id: asset.id,
          name: asset.name,
          quantity: asset.quantity,
          occurrence: asset.occurrence
        }
      })
      const vipAssetMetadata = uploadedVipAssets.map((asset) => {
        return {
          id: asset.id,
          name: asset.name,
          quantity: asset.quantity,
          occurrence: asset.occurrence
        }
      })

      try {
        const _assetPin = await pinFilesToIPFS(assets, assetMetadata)
        const _vipAssetPin = await pinFilesToIPFS(vipAssets, vipAssetMetadata)
        setAssetPin((prev) => [...prev, _assetPin])
        setVipAssetPin((prev) => [...prev, _vipAssetPin])
      } catch (e) {
        console.log(e)
      }
    }

    fn()
  }, [authenticated])

  return (
    <FlatCard>
      <Typography variant="h3" component="h1">
        Create Ticket For You
      </Typography>
      <Typography>Hang tight! your ticket is being create...</Typography>
      <Stack direction="column" sx={{ placeItems: "center" }}>
        <div>{authenticated.toString()}</div>
        <Image
          src="/gifs/generate/nft-minting.gif"
          width="400"
          height="400"
          alt="Minting"
        />
        <Typography fontWeight="500">Generating</Typography>
        {assets.length > 0 && (
          <Typography fontWeight="500">
            Regular Assets {uploadedAssetAmount}/{assets.length}
          </Typography>
        )}
        {vipAssets.length > 0 && (
          <Typography fontWeight="500">
            VIP Assets {uploadedVipAmount}/{vipAssets.length}
          </Typography>
        )}
        <Typography>{JSON.stringify(assetPin)}</Typography>
        <Typography>{JSON.stringify(assetVipPin)}</Typography>
      </Stack>
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={() => setActiveStep((prev) => prev + 1)}
      />
    </FlatCard>
  )
}

export default CreateCompleteTicketStep4
