import type { Metadata } from "next"
import { SiteSettings } from "@/components/admin/settings/site-settings"
import { NotificationSettings } from "@/components/admin/settings/notification-settings"
import { SeoSettings } from "@/components/admin/settings/seo-settings"

export const metadata: Metadata = {
  title: "Paramètres | Administration",
  description: "Paramètres du site",
}

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
        <p className="text-muted-foreground">Configurez les paramètres généraux du site</p>
      </div>

      <div className="grid gap-8">
        <SiteSettings />
        <NotificationSettings />
        <SeoSettings />
      </div>
    </div>
  )
}

