import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Politique",
    href: "/politique",
  },
  {
    title: "Économie",
    href: "/economie",
  },
  {
    title: "Culture",
    href: "/culture",
  },
  {
    title: "Sport",
    href: "/sport",
  },
  {
    title: "Société",
    href: "/societe",
  },
]

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn("text-sm font-medium transition-colors hover:text-primary")}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

