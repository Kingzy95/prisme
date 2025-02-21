"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type Article = {
  id?: string;
  title: string;
  content: string;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
};

type ArticleEditorProps = {
  article?: Article;
  categories: Category[];
};

export function ArticleEditor({ article, categories }: ArticleEditorProps) {
  const [title, setTitle] = useState<string>(article?.title || "");
  const [content, setContent] = useState<string>(article?.content || "");
  const [category, setCategory] = useState<string>(article?.categoryId || "");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/articles", {
        method: article ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: article?.id,
          title,
          content,
          categoryId: category,
        }),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Succès",
        description: article ? "Article mis à jour" : "Article créé",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat: Category) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Contenu</Label>
          <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={content}
              onEditorChange={setContent}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                    "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
          />
        </div>

        <Button type="submit">{article ? "Mettre à jour" : "Publier"}</Button>
      </form>
  );
}
