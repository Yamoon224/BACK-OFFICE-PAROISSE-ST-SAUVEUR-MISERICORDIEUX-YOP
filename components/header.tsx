"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  title: string
  showSearch?: boolean
}

export function Header({ title, showSearch = false }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
      <h1 className="text-xl lg:text-2xl font-bold text-primary">{title}</h1>

      <div className="flex items-center gap-3 lg:gap-4">
        {showSearch && (
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Recherche" className="pl-10 w-full sm:w-48 lg:w-80 bg-white border-border" />
          </div>
        )}

        <button className="p-2 rounded-full hover:bg-muted transition-colors shrink-0">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
            <AvatarImage src="/priest-african-man.jpg" />
            <AvatarFallback>PT</AvatarFallback>
          </Avatar>
          <span className="font-medium hidden sm:inline">Père Thomas</span>
        </div>
      </div>
    </header>
  )
}
