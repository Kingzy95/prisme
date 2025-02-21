import Link from "next/link"
import { Eye, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Cette fonction serait remplacée par un appel API réel
const getPopularArticles = async () => {
  return [
    {
      id: "1",
      title: "Les défis économiques de l'Afrique en 2024",
      views: 12345,
      comments: 89,
      category: "Économie",
    },
    {
      id: "2",
      title: "Innovation technologique : l'Afrique à l'avant-garde",
      views: 10234,
      comments: 67,
      category: "Technologie",
    },
    {
      id: "3",
      title: "Culture : Festival panafricain du cinéma",
      views: 8765,
      comments: 45,
      category: "Culture",
    },
    {
      id: "4",
      title: "Sport : les espoirs africains aux JO 2024",
      views: 7654,
      comments: 34,
      category: "Sport",
    },
  ]
}

export async function PopularArticles() {
  const articles = await getPopularArticles()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles populaires</CardTitle>
        <CardDescription>Les articles les plus consultés cette semaine</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center justify-between space-x-4">
              <div className="space-y-1">
                <Link href={`/articles/${article.id}`} className="font-medium hover:underline">
                  {article.title}
                </Link>
                <p className="text-sm text-muted-foreground">{article.category}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{article.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

