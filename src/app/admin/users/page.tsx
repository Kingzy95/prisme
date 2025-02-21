import type { Metadata } from "next"
import { UserList } from "@/components/admin/users/user-list"

export const metadata: Metadata = {
  title: "Utilisateurs | Administration",
  description: "Gestion des utilisateurs",
}

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Utilisateurs</h2>
        <p className="text-muted-foreground">Gérez les utilisateurs et leurs rôles</p>
      </div>

      <UserList />
    </div>
  )
}

