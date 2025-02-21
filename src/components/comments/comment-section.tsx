"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    name: string
    image: string
  }
}

export function CommentSection({ articleId }: { articleId: string }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour commenter",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          content: newComment,
        }),
      })

      if (!response.ok) throw new Error()

      const comment = await response.json()
      setComments((prev) => [comment, ...prev])
      setNewComment("")

      toast({
        title: "Commentaire publié",
        description: "Votre commentaire a été publié avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Commentaires</h2>

      {session ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Votre commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Publication..." : "Publier"}
          </Button>
        </form>
      ) : (
        <p className="text-muted-foreground">Connectez-vous pour laisser un commentaire</p>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.author.image} />
              <AvatarFallback>{comment.author.name?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <p className="font-medium">{comment.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

