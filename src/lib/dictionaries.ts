import "server-only"

const dictionaries = {
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  if (!Object.keys(dictionaries).includes(locale)) {
    locale = "fr"
  }
  return dictionaries[locale as keyof typeof dictionaries]()
}

