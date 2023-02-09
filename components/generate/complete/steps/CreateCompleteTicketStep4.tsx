import { Stack, Typography } from "@mui/material"
import Image from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { GenerateCompleteContext } from "../../../../contexts/generate/GenerateCompleteContext"
import { LayoutContext } from "../../../../contexts/layout/LayoutContext"
import { useStorageBucket } from "../../../../hooks/useStorageBucket"
import { StoredAsset } from "../../../../interfaces/gcp/storage.interface"
import FlatCard from "../../../UI/card/FlatCard"
import ControlledStepperButtons from "../../../UI/navigation/ControlledStepperButtons"

function CreateCompleteTicketStep4() {
  const {
    setActiveStep,
    assets,
    vipAssets,
    uploadedAssets,
    uploadedVipAssets,
    formInfo
  } = useContext(GenerateCompleteContext)
  const { saveFile, getFilesFromDirectory } = useStorageBucket()
  const { setShowLoadingBackdrop } = useContext(LayoutContext)

  const [storedAsset, setStoredAsset] = useState<StoredAsset[]>([])

  useEffect(() => {
    setShowLoadingBackdrop(true)

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
        if (assets.length > 0) {
          await saveFile(assets, formInfo.subjectOf, assetMetadata)
        }

        if (vipAssets.length > 0) {
          await saveFile(vipAssets, formInfo.subjectOf, vipAssetMetadata)
        }
        setShowLoadingBackdrop(false)
      } catch (e) {
        setShowLoadingBackdrop(false)
        console.log(e)
      }
    }

    fn()
  }, [])

  return (
    <FlatCard>
      <div>{formInfo.subjectOf}</div>
      <div>{JSON.stringify(storedAsset)}</div>
      <Typography variant="h3" component="h1">
        Create Ticket For You
      </Typography>
      <Typography>Hang tight! your ticket is being create...</Typography>
      <Stack direction="column" sx={{ placeItems: "center" }}>
        <Image
          src="/gifs/generate/nft-minting.gif"
          width="400"
          height="400"
          alt="Minting"
        />
        <Typography fontWeight="500">Generating</Typography>
        {/* <Typography>{JSON.stringify(assetPin)}</Typography> */}
        {/* <Typography>{JSON.stringify(assetVipPin)}</Typography> */}
      </Stack>
      <ControlledStepperButtons
        handlePrevious={() => setActiveStep((prev) => prev - 1)}
        handleNext={() => setActiveStep((prev) => prev + 1)}
      />
    </FlatCard>
  )
}

export default CreateCompleteTicketStep4
