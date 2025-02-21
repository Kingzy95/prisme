"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const categories = [
  {
    title: "Toute l'actualité",
    href: "/",
  },
  {
    title: "Politique",
    href: "/politique",
  },
  {
    title: "Économie",
    href: "/economie",
  },
  {
    title: "Société",
    href: "/societe",
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
    title: "Technologie",
    href: "/technologie",
  },
  {
    title: "Environnement",
    href: "/environnement",
  },
]

export function CategoryNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="w-full whitespace-nowrap border-b">
      <div className="flex w-max space-x-6 p-4">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === category.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {category.title}
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

