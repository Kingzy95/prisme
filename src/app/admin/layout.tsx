import type React from "react"
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { AdminNav } from "@/components/admin-nav"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({children,}: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  return (
      <SidebarProvider>
        <div className="flex h-screen">
          <Sidebar>
            <SidebarHeader>
              <h2 className="px-4 text-lg font-semibold">Administration</h2>
            </SidebarHeader>
            <SidebarContent>
              <AdminNav />
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
      </SidebarProvider>
  )
}
