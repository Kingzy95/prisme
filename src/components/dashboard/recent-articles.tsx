import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2 } from "lucide-react"

// Cette fonction serait remplacée par un appel API réel
const getRecentArticles = async () => {
  return [
    {
      id: "1",
      title: "Les défis économiques de l'Afrique en 2024",
      author: "Marie Dubois",
      category: "Économie",
      status: "published",
      date: "2024-02-20",
    },
    {
      id: "2",
      title: "Innovation technologique : l'Afrique à l'avant-garde",
      author: "Jean Martin",
      category: "Technologie",
      status: "draft",
      date: "2024-02-19",
    },
    {
      id: "3",
      title: "Culture : Festival panafricain du cinéma",
      author: "Sophie Diallo",
      category: "Culture",
      status: "published",
      date: "2024-02-18",
    },
    {
      id: "4",
      title: "Sport : les espoirs africains aux JO 2024",
      author: "Pierre Kamara",
      category: "Sport",
      status: "review",
      date: "2024-02-17",
    },
  ]
}

export async function RecentArticles() {
  const articles = await getRecentArticles()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Articles récents</h2>
        <Button asChild>
          <Link href="/admin/articles/new">Nouvel article</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(article.status)}>{getStatusLabel(article.status)}</Badge>
                </TableCell>
                <TableCell>{new Date(article.date).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "published":
      return "default"; // Remplace "success" par "default"
    case "draft":
      return "secondary";
    case "review":
      return "outline"; // Remplace "warning" par "outline"
    default:
      return "default";
  }
}


function getStatusLabel(status: string) {
  switch (status) {
    case "published":
      return "Publié"
    case "draft":
      return "Brouillon"
    case "review":
      return "En révision"
    default:
      return status
  }
}

