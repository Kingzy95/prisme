"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  metaTitle: z.string().min(1, "Le titre meta est requis"),
  metaDescription: z.string().min(1, "La description meta est requise"),
  ogImage: z.string().url("URL invalide"),
  googleAnalyticsId: z.string(),
  robotsTxt: z.string(),
  sitemapUrl: z.string().url("URL invalide"),
})

export function SeoSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "Jeune Afrique - L'actualité africaine en continu",
      metaDescription:
        "Suivez toute l'actualité africaine en temps réel : politique, économie, sport, culture et société.",
      ogImage: "https://example.com/og-image.jpg",
      googleAnalyticsId: "UA-XXXXXXXXX-X",
      robotsTxt: "User-agent: *\nAllow: /",
      sitemapUrl: "https://example.com/sitemap.xml",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Paramètres mis à jour",
        description: "Les paramètres SEO ont été mis à jour",
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
    <Card>
      <CardHeader>
        <CardTitle>Paramètres SEO</CardTitle>
        <CardDescription>Configurez les paramètres de référencement</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre meta par défaut</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Le titre qui apparaîtra dans les résultats de recherche</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description meta par défaut</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>La description qui apparaîtra dans les résultats de recherche</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ogImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Open Graph par défaut</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>L'image qui sera partagée sur les réseaux sociaux</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="googleAnalyticsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Google Analytics</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Votre identifiant de suivi Google Analytics</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="robotsTxt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu robots.txt</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>Instructions pour les robots d'indexation</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sitemapUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du sitemap</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>L'URL de votre sitemap XML</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

