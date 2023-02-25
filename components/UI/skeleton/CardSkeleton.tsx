import { Box, Skeleton } from "@mui/material"
import React from "react"

function CardSkeleton() {
  return (
    <>
      <Skeleton variant="rectangular" height={140} />
      <Box sx={{ p: 2 }}>
        <Skeleton height={40} />
        <Skeleton width="60%" />
        <Skeleton width="60%" />
        <Skeleton width="60%" />
      </Box>
    </>
  )
}

export default CardSkeleton
