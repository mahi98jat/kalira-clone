import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "components/Home"
import { Details, NotFound } from "components/index"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
