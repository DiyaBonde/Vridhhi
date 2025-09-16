"use client"

import { useState, useEffect } from "react"
import { getTranslation, type Language } from "@/lib/i18n"

export function useTranslation() {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "od", "mr"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "language" && e.newValue) {
        setLanguage(e.newValue as Language)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const t = (key: string): string => {
    return getTranslation(language, key)
  }

  return { t, language, setLanguage }
}
