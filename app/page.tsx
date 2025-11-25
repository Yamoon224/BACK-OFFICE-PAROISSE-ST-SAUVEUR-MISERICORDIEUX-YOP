"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/bg-auth.png')`,
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-primary rounded-t-2xl px-6 py-3 lg:px-8 lg:py-4 text-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 lg:mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/logo-paroisse.png"
              alt="Logo Paroisse"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl lg:text-xl font-bold text-white text-balance">
            Paroisse Saint Sauveur Miséricordieux
          </h1>
          <p className="text-white/80 text-sm lg:text-base">{"Portail d'administration"}</p>
        </div>

        <div className="bg-white rounded-b-2xl p-6 lg:p-8">
          <div className="space-y-5 lg:space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Adresse email</label>
              <Input
                type="email"
                placeholder="Votre Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>
              <Input
                type="password"
                placeholder="Votre Mot de Passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  Se souvenir de moi
                </label>
              </div>
              <Link href="#" className="text-sm text-foreground underline">
                Mot de passe oublié?
              </Link>
            </div>

            <Link href="/dashboard">
              <Button className="w-full bg-accent hover:bg-accent/90 text-white py-5 lg:py-6">Se connecter</Button>
            </Link>
          </div>
        </div>

        <div className="bg-muted rounded-b-2xl -mt-4 pt-8 pb-4 text-center px-4">
          <p className="text-sm text-muted-foreground">
            {"Besoin d'aide? "}
            <Link href="#" className="text-foreground underline">
              {"Contacter l'administrateur"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
