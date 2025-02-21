"use client"

import * as React from "react"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { searchClient, ALGOLIA_INDEX_NAME } from "@/lib/algolia"
import { SearchHit } from "@/components/search/search-hit"
import { useRouter } from "next/navigation"

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleSelect = (url: string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-muted-foreground sm:w-64">
          <Search className="mr-2 h-4 w-4" />
          Rechercher...
          <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
          <SearchBox
            placeholder="Rechercher des articles..."
            autoFocus
            classNames={{
              root: "mb-4",
              form: "relative",
              input:
                "w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
              submit: "absolute right-0 top-0 h-10 px-3",
              submitIcon: "h-4 w-4 fill-current",
              reset: "hidden",
              loadingIndicator: "hidden",
            }}
          />
          <div className="h-[60vh] overflow-y-auto">
            <Hits hitComponent={({ hit }) => <SearchHit hit={hit} onSelect={handleSelect} />} />
          </div>
        </InstantSearch>
      </DialogContent>
    </Dialog>
  )
}

