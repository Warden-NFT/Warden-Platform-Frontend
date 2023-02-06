import { Card, Typography } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import Link from "next/link"
import React from "react"
import ContainedButton from "../../../UI/button/ContainedButton"

type Props = {
  smartContractAddress: string
}

function ViewEventBanner({ smartContractAddress }: Props) {
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: deepPurple[100]
      }}
      elevation={0}
    >
      <Typography fontWeight={600}>
        View your smart contract deployed on the Polygon Blockchain.
      </Typography>
      {/* TODO: Detect the url for polygonscan prod and dev from env. For now, use dev only */}
      <Link
        href={`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/address/${smartContractAddress}`}
        style={{ textDecoration: "none" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ContainedButton
          label="View Smart Contract"
          variant="contained"
          width="240px"
          isLink
        />
      </Link>
    </Card>
  )
}

export default ViewEventBanner
