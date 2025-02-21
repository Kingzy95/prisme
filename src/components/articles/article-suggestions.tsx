import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Article {
  id: string
  title: string
  excerpt: string
  slug: string
  image: string
  category: string
  publishedAt: string
}

interface ArticleSuggestionsProps {
  currentArticleId: string
  category: string
  dict: any
}

// Cette fonction serait remplacée par un appel API réel
const getSuggestedArticles = async (currentArticleId: string, category: string) => {
  return [
    {
      id: "1",
      title: "Les défis économiques de l'Afrique en 2024",
      excerpt: "Analyse des perspectives économiques du continent africain...",
      slug: "defis-economiques-afrique-2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "Économie",
      publishedAt: "2024-02-20",
    },
    {
      id: "2",
      title: "Innovation technologique : l'Afrique à l'avant-garde",
      excerpt: "Les startups africaines révolutionnent le paysage technologique...",
      slug: "innovation-technologique-afrique",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technologie",
      publishedAt: "2024-02-19",
    },
  ]
}

export async function ArticleSuggestions({ currentArticleId, category, dict }: ArticleSuggestionsProps) {
  const articles = await getSuggestedArticles(currentArticleId, category)

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{dict.article.suggestions}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="aspect-video relative mb-4">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <Badge variant="secondary" className="mb-2">
                  {article.category}
                </Badge>
                <h3 className="font-semibold line-clamp-2 mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

