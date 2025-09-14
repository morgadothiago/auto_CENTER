import React, { useState } from "react"
import { Link } from "react-router-dom"

import "./styles.css"

type MenuItemProps = {
  path: string
  label: string
}

type HeaderProps = {
  slug: string
  menuItem: MenuItemProps[]
}

export default function Header({ slug, menuItem }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-full h-full bg-[#222]">
      <div className="content flex justify-between items-center py-4 px-4 md:px-0">
        {/* Lado esquerdo: logo e título */}
        <div className="header-left flex items-center gap-2">
          <img src="" alt={slug} className="w-10 h-10" />
          <h1 className="text-xl font-bold text-white">{slug}</h1>
        </div>

        {/* Menu hamburguer para mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Navegação desktop */}
        <nav className="header-right hidden md:block">
          <ul className="flex gap-4">
            {menuItem.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-gray-300 hover:text-blue-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="md:hidden bg-[#222] absolute top-16 left-0 w-full z-50">
          <ul className="flex flex-col gap-4 p-4">
            {menuItem.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-gray-300 hover:text-blue-400 block"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
