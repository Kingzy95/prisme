import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Search } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 ml-20 flex items-center space-x-2">
            <span className="text-xl font-bold">Prisme</span>
          </Link>
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Rechercher</span>
              </Button>
              <ModeToggle />
              <Button variant="secondary" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
  )
}

