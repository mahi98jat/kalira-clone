import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { FC } from "react"

export const NotFound: FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Box>
        <Typography variant="h3" color="secondary">
          It seems you are lost
        </Typography>
      </Box>
    </div>
  )
}
