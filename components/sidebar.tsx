"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  Flame,
  Volume2,
  Calendar,
  Heart,
  FileEdit,
  Newspaper,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { label: "Accueil", icon: LayoutGrid, href: "/dashboard" },
  { label: "Messes", icon: Flame, href: "/dashboard/messes" },
  { label: "Ecoutes", icon: Volume2, href: "/dashboard/ecoutes" },
  { label: "Evénements", icon: Calendar, href: "/dashboard/evenements" },
  { label: "Dons", icon: Heart, href: "/dashboard/dons" },
]

const contentItems = [
  { label: "Médiation", icon: FileEdit, href: "/dashboard/mediation" },
  { label: "Actualités", icon: Newspaper, href: "/dashboard/actualites" },
  { label: "Contenu", icon: Users, href: "/dashboard/contenu" },
]

const adminItems = [
  { label: "Paramètres", icon: Settings, href: "/dashboard/parametres" },
  { label: "Déconnexion", icon: LogOut, href: "/" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsOpen(false)} />}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-72 bg-sidebar text-sidebar-foreground flex flex-col z-40 transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 pt-16 lg:pt-6 flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src="/logo-paroisse.png"
              alt="Logo Paroisse"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-white truncate">Paroisse St Sauveur</h2>
            <p className="text-sm text-white/70 truncate">Dashboard Administratif</p>
          </div>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-6">
          <div className="mb-6">
            <p className="px-3 mb-2 text-xs font-medium text-white/50 uppercase tracking-wider">Menu Principal</p>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive ? "bg-accent text-white" : "text-white/80 hover:bg-white/10",
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mb-6">
            <p className="px-3 mb-2 text-xs font-medium text-white/50 uppercase tracking-wider">Contenu</p>
            <ul className="space-y-1">
              {contentItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive ? "bg-accent text-white" : "text-white/80 hover:bg-white/10",
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <p className="px-3 mb-2 text-xs font-medium text-white/50 uppercase tracking-wider">Administration</p>
            <ul className="space-y-1">
              {adminItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive ? "bg-accent text-white" : "text-white/80 hover:bg-white/10",
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  )
}
