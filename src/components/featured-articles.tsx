import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Cette fonction serait remplacée par un appel API réel
const getFeaturedArticles = async () => {
  return [
    {
      id: "1",
      title: "Les défis économiques de l'Afrique en 2024",
      excerpt: "Analyse des perspectives économiques du continent africain pour l'année à venir...",
      image: "/placeholder.svg",
      category: "Économie",
      author: "Marie Dubois",
      date: "2024-02-20",
    },
    {
      id: "2",
      title: "Innovation technologique : l'Afrique à l'avant-garde",
      excerpt: "Les startups africaines révolutionnent le paysage technologique mondial...",
      image: "/placeholder.svg",
      category: "Technologie",
      author: "Jean Martin",
      date: "2024-02-19",
    },
    {
      id: "3",
      title: "Culture : Festival panafricain du cinéma",
      excerpt: "Le plus grand rassemblement du cinéma africain ouvre ses portes...",
      image: "/placeholder.svg",
      category: "Culture",
      author: "Sophie Diallo",
      date: "2024-02-18",
    },
  ]
}

export async function FeaturedArticles() {
  const articles = await getFeaturedArticles()

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">À la une</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <Link href={`/articles/${article.id}`}>
              <div className="relative aspect-video">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">
                  {article.category}
                </Badge>
                <h3 className="text-xl font-bold line-clamp-2 mb-2">{article.title}</h3>
                <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                <div className="flex items-center justify-between w-full">
                  <span>{article.author}</span>
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}

