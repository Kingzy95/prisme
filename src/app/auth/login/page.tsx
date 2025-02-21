import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Connexion | Prisme",
  description: "Connectez-vous à votre compte Prisme",
}

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} className="h-10 w-10" />
          <span className="text-lg font-bold">Jeune Afrique</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">L'information africaine au cœur de l'actualité mondiale</p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>
            <p className="text-sm text-muted-foreground">Connectez-vous avec l'une des méthodes suivantes</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

