import type { Metadata } from "next"
import { CategoryList } from "@/components/admin/categories/category-list"
import { CategoryForm } from "@/components/admin/categories/category-form"

export const metadata: Metadata = {
  title: "Catégories | Administration",
  description: "Gestion des catégories d'articles",
}

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Catégories</h2>
        <p className="text-muted-foreground">Gérez les catégories d'articles du site</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <CategoryList />
        <CategoryForm />
      </div>
    </div>
  )
}

