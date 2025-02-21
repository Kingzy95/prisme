"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, LinkIcon, PhoneIcon as WhatsApp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { analytics } from "@/lib/analytics"

interface ShareButtonsProps {
  title: string
  url: string
  dict: any
}

export function ShareButtons({ title, url, dict }: ShareButtonsProps) {
  const { toast } = useToast()

  const shareUrls: Record<"twitter" | "facebook" | "linkedin" | "whatsapp", string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank");
    analytics.trackEvent({
      name: "share_article",
      properties: { platform, title, url },
    });
  };


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: dict.share.copySuccess,
        description: dict.share.copyMessage,
      })
      analytics.trackEvent({
        name: "copy_article_link",
        properties: { title, url },
      })
    } catch (err) {
      toast({
        title: dict.share.copyError,
        description: dict.share.copyErrorMessage,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold">{dict.share.title}</h3>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="icon" onClick={() => handleShare("twitter")} aria-label={dict.share.twitter}>
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare("facebook")} aria-label={dict.share.facebook}>
          <Facebook className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")} aria-label={dict.share.linkedin}>
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => handleShare("whatsapp")} aria-label={dict.share.whatsapp}>
          <WhatsApp className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label={dict.share.copyLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

