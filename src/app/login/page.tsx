import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <h1>Jeune Afrique</h1>
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
            <h1 className="text-2xl font-semibold tracking-tight">Connexion à votre compte</h1>
            <p className="text-sm text-muted-foreground">Entrez vos identifiants pour accéder à votre compte</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

