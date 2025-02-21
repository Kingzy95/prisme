import { ArticleSkeleton } from "@/components/loading/article-skeleton"

export function ArticlesGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  )
}

