"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: Record<string, unknown>[]
  searchPlaceholder?: string
  actionButton?: {
    label: string
    onClick: () => void
  }
  itemsPerPage?: number
  onRowClick?: (row: Record<string, unknown>) => void
}

export function DataTable({
  columns,
  data,
  searchPlaceholder = "Recherche",
  actionButton,
  itemsPerPage = 5,
  onRowClick,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data
    return data.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [data, searchQuery])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-3 lg:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10 bg-white border-border"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
            <Filter className="w-4 h-4" />
          </Button>
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              className="bg-accent hover:bg-accent/90 text-white flex-1 sm:flex-initial text-sm"
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-t border-border">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-medium text-muted-foreground whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  "border-t border-border",
                  onRowClick && "cursor-pointer hover:bg-muted/50 transition-colors",
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-3 lg:px-4 py-3 lg:py-4 text-xs lg:text-sm whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : (row[column.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                  Aucun résultat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 lg:p-4 flex items-center justify-between border-t border-border">
        <span className="text-xs lg:text-sm text-muted-foreground">
          {filteredData.length > 0
            ? `${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredData.length)} sur ${filteredData.length}`
            : "0 résultat"}
        </span>
        <div className="flex items-center gap-1 lg:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 lg:h-9 lg:w-9"
          >
            <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
            <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4 -ml-1.5 lg:-ml-2" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 lg:h-9 lg:w-9"
          >
            <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum: number
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(pageNum)}
                className={cn(
                  "h-8 w-8 lg:h-9 lg:w-9 text-xs lg:text-sm",
                  pageNum === currentPage && "bg-primary text-primary-foreground",
                )}
              >
                {pageNum}
              </Button>
            )
          })}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 lg:h-9 lg:w-9"
          >
            <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 lg:h-9 lg:w-9"
          >
            <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
            <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 -ml-1.5 lg:-ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
