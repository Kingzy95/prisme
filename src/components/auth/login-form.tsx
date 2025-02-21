"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const handleOAuthSignIn = async (provider: "github" | "google") => {
    try {
      setIsLoading(true)
      await signIn(provider, { callbackUrl })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Button variant="outline" onClick={() => handleOAuthSignIn("github")} disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}
          Continuer avec GitHub
        </Button>
        <Button variant="outline" onClick={() => handleOAuthSignIn("google")} disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Continuer avec Google
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
        </div>
      </div>
      <Button variant="outline" asChild>
        <Link href="/auth/login/email">
          <Icons.mail className="mr-2 h-4 w-4" />
          Continuer avec Email
        </Link>
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/auth/register" className="hover:text-brand underline underline-offset-4">
          S'inscrire
        </Link>
      </p>
    </div>
  )
}

