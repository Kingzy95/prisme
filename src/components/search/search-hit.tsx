import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface SearchHitProps {
  hit: any
  onSelect: (url: string) => void
}

export function SearchHit({ hit, onSelect }: SearchHitProps) {
  return (
    <Card className="mb-2 cursor-pointer hover:bg-muted/50" onClick={() => onSelect(`/articles/${hit.slug}`)}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {hit.image && (
            <div className="relative h-20 w-32 flex-none">
              <Image src={hit.image || "/placeholder.svg"} alt={hit.title} fill className="object-cover rounded-md" />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{hit.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(hit.publishedAt).toLocaleDateString("fr-FR")}
              </div>
            </div>
            <h3 className="font-semibold">{hit.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{hit.excerpt}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

