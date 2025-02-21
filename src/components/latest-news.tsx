import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Cette fonction serait remplacée par un appel API réel
const getLatestNews = async () => {
  return [
    {
      id: "1",
      title: "Développement durable : les initiatives vertes en Afrique",
      excerpt: "De nouvelles solutions écologiques émergent à travers le continent...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Environnement",
      date: "2024-02-20",
    },
    {
      id: "2",
      title: "Éducation : vers une digitalisation des apprentissages",
      excerpt: "Les nouvelles technologies transforment l'éducation en Afrique...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Société",
      date: "2024-02-20",
    },
    {
      id: "3",
      title: "Sport : les espoirs africains aux JO 2024",
      excerpt: "Les athlètes africains se préparent pour les Jeux Olympiques...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Sport",
      date: "2024-02-20",
    },
  ]
}

export async function LatestNews() {
  const news = await getLatestNews()

  return (
    <section className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold">Dernières actualités</h2>
      <div className="space-y-4">
        {news.map((article) => (
          <Card key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-40 flex-none">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    <time className="text-sm text-muted-foreground" dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}

