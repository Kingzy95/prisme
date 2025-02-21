"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ShareButtons({ title }: { title: string }) {
  const { toast } = useToast()
  const url = typeof window !== "undefined" ? window.location.href : ""

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Lien copié",
        description: "Le lien a été copié dans le presse-papier",
      })
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold">Partager l'article</h3>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={() => window.open(shareUrls.twitter, "_blank")}>
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Partager sur Twitter</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => window.open(shareUrls.facebook, "_blank")}>
          <Facebook className="h-4 w-4" />
          <span className="sr-only">Partager sur Facebook</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => window.open(shareUrls.linkedin, "_blank")}>
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">Partager sur LinkedIn</span>
        </Button>
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Link2 className="h-4 w-4" />
          <span className="sr-only">Copier le lien</span>
        </Button>
      </div>
    </div>
  )
}

