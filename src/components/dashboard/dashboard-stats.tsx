import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Eye, MessageSquare } from "lucide-react"

// Cette fonction serait remplacée par un appel API réel
const getStats = async () => {
  return {
    totalUsers: 12543,
    totalArticles: 856,
    totalViews: 1234567,
    totalComments: 8765,
    usersGrowth: 12.5,
    articlesGrowth: 8.3,
    viewsGrowth: 15.7,
    commentsGrowth: 5.2,
  }
}

export async function DashboardStats() {
  const stats = await getStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.usersGrowth}% depuis le mois dernier</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Articles publiés</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalArticles.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.articlesGrowth}% depuis le mois dernier</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vues totales</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.viewsGrowth}% depuis le mois dernier</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commentaires</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalComments.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+{stats.commentsGrowth}% depuis le mois dernier</p>
        </CardContent>
      </Card>
    </div>
  )
}

