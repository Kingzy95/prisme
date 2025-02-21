import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { BarChart, FileText, Users, Settings, Tags, MessageSquare } from "lucide-react"
import Link from "next/link"

export function AdminNav() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/admin/dashboard">
            <BarChart className="h-4 w-4" />
            <span>Tableau de bord</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/admin/articles">
            <FileText className="h-4 w-4" />
            <span>Articles</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/admin/categories">
            <Tags className="h-4 w-4" />
            <span>Catégories</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/admin/comments">
            <MessageSquare className="h-4 w-4" />
            <span>Commentaires</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/admin/users">
            <Users className="h-4 w-4" />
            <span>Utilisateurs</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/admin/settings">
            <Settings className="h-4 w-4" />
            <span>Paramètres</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

