"use client"

import { Flame, Volume2, Heart } from "lucide-react"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const barData = [
  { name: "Jan", value: 65 },
  { name: "Fev", value: 85 },
  { name: "Mars", value: 55 },
  { name: "Avr", value: 45 },
  { name: "Mai", value: 95 },
  { name: "Jun", value: 70 },
]

const pieData = [
  { name: "Fonctionnement (30%)", value: 30, color: "#4A4A68" },
  { name: "Construction (35%)", value: 35, color: "#E040FB" },
  { name: "Actions caritatives (20%)", value: 20, color: "#2196F3" },
  { name: "Autres (15%)", value: 15, color: "#FF9800" },
]

const tableData = [
  {
    id: "#M001",
    date: "02/05/2025 - 10:30",
    demandeur: "Jean Konan",
    type: "Pour un défunt",
    paiement: "paid",
    statut: "pending",
    statutLabel: "En attentes",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "date", label: "Date demandée" },
  { key: "demandeur", label: "Demandeur" },
  { key: "type", label: "Type d'intention" },
  {
    key: "paiement",
    label: "Paiement",
    render: (value: unknown) => (
      <StatusBadge status={value as "paid" | "unpaid"} label={value === "paid" ? "Payé" : "Non payé"} />
    ),
  },
  {
    key: "statut",
    label: "Statut",
    render: (_: unknown, row: Record<string, unknown>) => (
      <StatusBadge status={row.statut as "pending" | "confirmed" | "cancelled"} label={row.statutLabel as string} />
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
]

export default function DashboardPage() {
  return (
    <div>
      <Header title="" showSearch />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon={Flame}
          value="20"
          label="Demandes de messes cette semaine"
          trend="12%"
          trendUp
          iconBgColor="bg-accent/10"
          iconColor="text-accent"
        />
        <StatCard icon={Volume2} value="08" label="Demandes d'écoutes en attente" trend="12%" trendUp={false} />
        <StatCard
          icon={Heart}
          value="50 000 F"
          label="Dons reçus ce mois-ci"
          trend="12%"
          trendUp
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      <h2 className="text-lg lg:text-xl font-bold text-primary mb-4 lg:mb-6">Demandes Récentes</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-card rounded-xl p-4 lg:p-6 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="font-semibold text-primary">Évolution des dons</h3>
            <span className="text-xs lg:text-sm text-muted-foreground">Janvier - Juin 2025</span>
          </div>
          <BarChart data={barData} />
        </div>

        <div className="bg-card rounded-xl p-4 lg:p-6 border border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="font-semibold text-primary">Répartition des dons par projet</h3>
            <span className="text-xs lg:text-sm text-muted-foreground">2025</span>
          </div>
          <PieChart data={pieData} />
        </div>
      </div>

      <DataTable columns={columns} data={tableData} actionButton={{ label: "Exporter", onClick: () => {} }} />
    </div>
  )
}
