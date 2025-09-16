"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

interface VoiceAssistantProps {
  onCommand?: (command: string) => void
}

export function VoiceAssistant({ onCommand }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")
  const { t, language } = useTranslation()

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      setIsSupported(true)
    }
  }, [])

  const startListening = () => {
    if (!isSupported) return

    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false

    // Set language based on current selection
    const speechLang = {
      en: "en-US",
      hi: "hi-IN",
      od: "or-IN",
      mr: "mr-IN",
    }[language]

    recognition.lang = speechLang

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
    }

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript
      setTranscript(result)
      onCommand?.(result)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)

      // Set voice language
      const voices = speechSynthesis.getVoices()
      const languageVoice = voices.find((voice) => {
        const voiceLang = {
          en: "en",
          hi: "hi",
          od: "or",
          mr: "mr",
        }[language]
        return voice.lang.startsWith(voiceLang || "en")
      })

      if (languageVoice) {
        utterance.voice = languageVoice
      }

      speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-sm">Voice Assistant</CardTitle>
          <CardDescription className="text-xs">Voice commands not supported in this browser</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-sm">Voice Assistant</CardTitle>
        <CardDescription className="text-xs">
          {language === "hi" && "आवाज़ सहायक - बोलकर सवाल पूछें"}
          {language === "od" && "ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ - କଥା କହି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ"}
          {language === "mr" && "व्हॉइस असिस्टंट - बोलून प्रश्न विचारा"}
          {language === "en" && "Voice Assistant - Ask questions by speaking"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={startListening}
          disabled={isListening}
          className="w-full"
          variant={isListening ? "secondary" : "default"}
        >
          {isListening ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>
                {language === "hi" && "सुन रहा है..."}
                {language === "od" && "ଶୁଣୁଛି..."}
                {language === "mr" && "ऐकत आहे..."}
                {language === "en" && "Listening..."}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              <span>
                {language === "hi" && "बोलें"}
                {language === "od" && "କୁହନ୍ତୁ"}
                {language === "mr" && "बोला"}
                {language === "en" && "Speak"}
              </span>
            </div>
          )}
        </Button>

        {transcript && (
          <div className="p-2 bg-muted rounded text-sm">
            <strong>
              {language === "hi" && "आपने कहा:"}
              {language === "od" && "ଆପଣ କହିଲେ:"}
              {language === "mr" && "तुम्ही म्हणालात:"}
              {language === "en" && "You said:"}
            </strong>
            <p className="mt-1">{transcript}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          {language === "hi" && "उदाहरण: 'गेहूं की उत्पादन की भविष्यवाणी करें'"}
          {language === "od" && "ଉଦାହରଣ: 'ଗହମର ଅମଳ ପୂର୍ବାନୁମାନ କରନ୍ତୁ'"}
          {language === "mr" && "उदाहरण: 'गहूचे उत्पादन अंदाज करा'"}
          {language === "en" && "Example: 'Predict wheat yield'"}
        </div>
      </CardContent>
    </Card>
  )
}
