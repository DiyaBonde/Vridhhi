"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLanguageName, type Language } from "@/lib/i18n"

interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void
  className?: string
}

export function LanguageSelector({ onLanguageChange, className }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "od", "mr"].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("language", language)
    onLanguageChange?.(language)
  }

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{getLanguageName("en")}</SelectItem>
        <SelectItem value="hi">{getLanguageName("hi")}</SelectItem>
        <SelectItem value="od">{getLanguageName("od")}</SelectItem>
        <SelectItem value="mr">{getLanguageName("mr")}</SelectItem>
      </SelectContent>
    </Select>
  )
}
