import React from "react"
import Header from "../../components/header"

export default function LandingPage() {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Sobre", path: "/sobre" },
    { label: "Contato", path: "/contato" },
  ]

  return <Header slug="Auto Center" menuItem={menuItems} />
}
