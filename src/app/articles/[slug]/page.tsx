import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CommentSection } from "@/components/comments/comment-section"
import { ShareButtons } from "@/components/share-buttons"
import {RelatedArticles} from "@/components/related-articles";

// Cette fonction serait remplacée par un appel API réel
async function getArticle(slug: string) {
  // Simulation d'un article
  return {
    id: "1",
    title: "Les défis économiques de l'Afrique en 2024",
    content: `
      <p>L'année 2024 s'annonce comme une période charnière pour l'économie africaine. Face aux défis mondiaux et aux opportunités émergentes, le continent africain se trouve à un moment décisif de son développement économique.</p>
      
      <h2>Les principaux enjeux</h2>
      <p>Plusieurs facteurs clés influenceront la trajectoire économique du continent :</p>
      <ul>
        <li>La transition énergétique</li>
        <li>La digitalisation de l'économie</li>
        <li>L'intégration régionale</li>
      </ul>
      
      <h2>Les perspectives</h2>
      <p>Malgré les défis, de nombreuses opportunités se présentent...</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Économie",
    author: {
      name: "Marie Dubois",
      image: "/placeholder.svg?height=100&width=100",
      role: "Journaliste économique",
    },
    date: "2024-02-20",
    readTime: "5 min",
    views: 1234,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container max-w-4xl py-10">
      <div className="space-y-4">
        <Badge variant="secondary" className="mb-2">
          {article.category}
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{article.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={article.author.image || "/placeholder.svg"}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{article.author.name}</p>
              <p>{article.author.role}</p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <Separator orientation="vertical" className="h-4" />
          <p>{article.readTime} de lecture</p>
          <Separator orientation="vertical" className="h-4" />
          <p>{article.views} vues</p>
        </div>
      </div>

      <div className="relative aspect-video my-8">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <Separator className="my-8" />

      <ShareButtons title={article.title} />

      <Separator className="my-8" />

      <CommentSection articleId={article.id} />

      <Separator className="my-8" />

      <RelatedArticles category={article.category} currentArticleId={article.id} />
    </article>
  )
}

