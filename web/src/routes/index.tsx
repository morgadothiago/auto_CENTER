import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "../Page/LandingPage"
import Dashboard from "../Page/Dashboard"
import AgendarServicoPage from "../Page/AgendarServico"

export default function AppRouter() {
  const user = true

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/agendar" element={<AgendarServicoPage />} />

        {user && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
