import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface Article {
    id: string
    title: string
    excerpt: string
    slug: string
    image: string
    category: string
    publishedAt: string
}

interface RelatedArticlesProps {
    category: string
    currentArticleId: string
    limit?: number
}

// Cette fonction serait remplacée par un appel API réel
const getRelatedArticles = async (category: string, currentArticleId: string, limit = 3): Promise<Article[]> => {
    // Simulation d'articles connexes
    return [
        {
            id: "1",
            title: "La croissance économique en Afrique de l'Ouest",
            excerpt: "Analyse des tendances économiques dans la région...",
            slug: "croissance-economique-afrique-ouest",
            image: "/placeholder.svg?height=200&width=300",
            category: "Économie",
            publishedAt: "2024-02-20",
        },
        {
            id: "2",
            title: "Les investissements étrangers en Afrique",
            excerpt: "Le continent attire de plus en plus d'investisseurs...",
            slug: "investissements-etrangers-afrique",
            image: "/placeholder.svg?height=200&width=300",
            category: "Économie",
            publishedAt: "2024-02-19",
        },
        {
            id: "3",
            title: "Le développement des infrastructures",
            excerpt: "Les grands projets d'infrastructure en cours...",
            slug: "developpement-infrastructures-afrique",
            image: "/placeholder.svg?height=200&width=300",
            category: "Économie",
            publishedAt: "2024-02-18",
        },
    ]
}

export async function RelatedArticles({ category, currentArticleId, limit = 3 }: RelatedArticlesProps) {
    const articles = await getRelatedArticles(category, currentArticleId, limit)

    if (articles.length === 0) {
        return null
    }

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold">Articles similaires</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="secondary">{article.category}</Badge>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}

