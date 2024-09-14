"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import DockLive from "./dock-live"

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email")
    console.log({ email })
    setIsLoading(true)
    fetch("/api/audience", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        console.log({ res })
        setIsSuccess(true)
      })
      .catch((err) => {
        console.log({ err })
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidde p-4 sm:p-6 lg:p-8">
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8">
        <p className="text-lg sm:text-xl font-medium text-blue-600">
          Pour les enseignants qui passent plus de temps à chercher leurs
          ressources qu&apos;à enseigner
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  leading-tight">
          La Classe : Transformez votre chaos pédagogique en un
          chef-d&apos;œuvre organisé
        </h1>
        <p className="text-xl sm:text-2xl  max-w-3xl mx-auto">
          Assemblez facilement vos cours, vos ressources et vos évaluations.
          Créez une image complète et cohérente de votre enseignement - grâce à
          votre solution pédagogique unificatrice
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:space-x-4"
        >
          <Input
            name="email"
            type="email"
            placeholder="Votre adresse e-mail"
            className="w-full sm:w-72 md:w-80 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Rejoindre la liste d&apos;attente
          </Button>
        </form>
        {isSuccess && <p>Merci pour votre inscription</p>}
        {error && <p>Une erreur est survenue</p>}
        <div className="w-full flex justify-center">
          <DockLive />
        </div>
      </div>
    </div>
  )
}
