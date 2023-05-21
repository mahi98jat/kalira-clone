import { createTheme, ThemeProvider } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { themeOptions } from "theme/mui-theme-styles"
import "./App.scss"
// import Container from "@mui/material/Container"
// import Typography from "@mui/material/Typography"
// import Box from "@mui/material/Box"
// import { Copyright } from "components/copyright"
// import { collections } from "./data/collection"
// import ReactJson from "react-json-view"
// import { product } from "./data/product"
import AppRoutes from "Routes/AppRoutes"

function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    setAppIsReady(true)
  }, [])

  if (!appIsReady) return null

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
