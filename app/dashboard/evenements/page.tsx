"use client"

import { useState } from "react"
import { Calendar, Check, X, Eye } from "lucide-react"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/data-table"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DetailModal } from "@/components/detail-modal"

const tableData = [
  {
    id: "#EV001",
    organisateur: "Chorale Paroissiale",
    type: "Répétition",
    date: "05/05/2025",
    heure: "18:00 - 20:00",
    statut: "pending",
    statutLabel: "En attentes",
    lieu: "Paroisse St Sauveur",
    description:
      "Répétition hebdomadaire de la chorale paroissiale pour la préparation de la messe du dimanche. Nous aurons besoin de la grande salle avec le piano et les chaises pour environ 25 personnes.",
  },
  {
    id: "#EV002",
    organisateur: "Groupe de jeunes",
    type: "Réunion",
    date: "06/05/2025",
    heure: "16:00 - 18:00",
    statut: "confirmed",
    statutLabel: "Approuvé",
    lieu: "Salle paroissiale",
    description: "Réunion mensuelle du groupe de jeunes pour préparer les activités du mois.",
  },
  {
    id: "#EV003",
    organisateur: "Catéchèse",
    type: "Formation",
    date: "07/05/2025",
    heure: "14:00 - 16:00",
    statut: "pending",
    statutLabel: "En attentes",
    lieu: "Salle de catéchisme",
    description: "Session de formation pour les catéchistes sur les nouveaux programmes.",
  },
  {
    id: "#EV004",
    organisateur: "Mouvement charismatique",
    type: "Prière",
    date: "08/05/2025",
    heure: "19:00 - 21:00",
    statut: "cancelled",
    statutLabel: "Annulée",
    lieu: "Chapelle",
    description: "Soirée de prière et louange. Événement annulé pour cause de rénovation.",
  },
  {
    id: "#EV005",
    organisateur: "Conseil paroissial",
    type: "Réunion",
    date: "09/05/2025",
    heure: "17:00 - 19:00",
    statut: "confirmed",
    statutLabel: "Approuvé",
    lieu: "Bureau pastoral",
    description: "Réunion trimestrielle du conseil paroissial pour le bilan des activités.",
  },
  {
    id: "#EV006",
    organisateur: "Chorale Paroissiale",
    type: "Concert",
    date: "10/05/2025",
    heure: "15:00 - 17:00",
    statut: "pending",
    statutLabel: "En attentes",
    lieu: "Église principale",
    description: "Concert de louange ouvert à tous les fidèles.",
  },
]

export default function EvenementsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null)

  const handleRowClick = (row: Record<string, unknown>) => {
    setSelectedItem(row)
    setDetailOpen(true)
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "organisateur", label: "Organisateur" },
    { key: "type", label: "Type" },
    { key: "date", label: "Date" },
    { key: "heure", label: "Heure" },
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
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
            onClick={() => handleRowClick(row)}
          >
            <Eye className="w-4 h-4" />
          </Button>
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

  return (
    <div>
      <Header title="Gestion des Événements" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard icon={Calendar} value="02" label="Événements en attente" trend="12%" trendUp />
        <StatCard icon={Calendar} value="19" label="Événements approuvés" trend="12%" trendUp />
        <StatCard icon={Calendar} value="10" label="Événements ce mois" trend="12%" trendUp />
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        actionButton={{ label: "+ Nouvel événement", onClick: () => setIsOpen(true) }}
        itemsPerPage={5}
      />

      {/* Create event dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">Nouvel événement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">{"Titre de l'événement"}</label>
              <Input placeholder="Nom" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Organisateur</label>
              <Input placeholder="Nom" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <Input placeholder="Nom" className="mt-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Heure</label>
                <Input type="time" className="mt-1" />
              </div>
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-white">{"Créer l'événement"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail modal */}
      {selectedItem && (
        <DetailModal
          open={detailOpen}
          onOpenChange={setDetailOpen}
          title="Détails de l'événement"
          data={{
            image: "/church-choir-blue-robes-cross-formation.jpg",
            organisateur: selectedItem.organisateur as string,
            type: selectedItem.type as string,
            date: selectedItem.date as string,
            heure: selectedItem.heure as string,
            lieu: selectedItem.lieu as string,
            description: selectedItem.description as string,
          }}
        />
      )}
    </div>
  )
}
