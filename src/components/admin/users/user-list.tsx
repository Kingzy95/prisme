"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, UserX } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "EDITOR" | "USER"
  status: "active" | "inactive"
  image?: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Marie Dubois",
      email: "marie@example.com",
      role: "ADMIN",
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Jean Martin",
      email: "jean@example.com",
      role: "EDITOR",
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Sophie Diallo",
      email: "sophie@example.com",
      role: "USER",
      status: "inactive",
    },
  ])
  const { toast } = useToast()

  const handleRoleChange = async (userId: string, newRole: User["role"]) => {
    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))

      toast({
        title: "Rôle mis à jour",
        description: "Le rôle de l'utilisateur a été mis à jour avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (userId: string) => {
    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                status: user.status === "active" ? "inactive" : "active",
              }
            : user,
        ),
      )

      toast({
        title: "Statut mis à jour",
        description: "Le statut de l'utilisateur a été mis à jour avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des utilisateurs</CardTitle>
        <CardDescription>Gérez les utilisateurs et leurs permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === "ADMIN" ? "default" : user.role === "EDITOR" ? "secondary" : "outline"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "destructive"}>
                    {user.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRoleChange(user.id, "ADMIN")}>
                        Définir comme Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user.id, "EDITOR")}>
                        Définir comme Éditeur
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user.id, "USER")}>
                        Définir comme Utilisateur
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(user.id)} className="text-destructive">
                        <UserX className="mr-2 h-4 w-4" />
                        {user.status === "active" ? "Désactiver" : "Activer"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

