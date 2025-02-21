import Link from "next/link"

export function SiteFooter() {
  return (
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">À propos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:underline">
                    Qui sommes-nous
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">
                    Carrières
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Rubriques</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/politique" className="hover:underline">
                    Politique
                  </Link>
                </li>
                <li>
                  <Link href="/economie" className="hover:underline">
                    Économie
                  </Link>
                </li>
                <li>
                  <Link href="/culture" className="hover:underline">
                    Culture
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/abonnements" className="hover:underline">
                    Abonnements
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="hover:underline">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="/publicite" className="hover:underline">
                    Publicité
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/mentions-legales" className="hover:underline">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="/confidentialite" className="hover:underline">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:underline">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Prisme. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
  )
}

