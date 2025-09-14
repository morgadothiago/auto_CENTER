import React from "react"
import Header from "../../components/header"
import FormAgendarServico from "../../components/FormAgendarServico"

export default function AgendarServicoPage() {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Sobre", path: "/sobre" },
    { label: "Contato", path: "/contato" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Header */}
      <Header
        slug="Auto Center"
        menuItem={menuItems}
        className="fixed w-full backdrop-blur-md bg-black/50 text-white py-4 px-8 z-20"
      />

      {/* Main Content */}
      <main className="pt-24  pb-16 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <FormAgendarServico />
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
    </div>
  )
}
