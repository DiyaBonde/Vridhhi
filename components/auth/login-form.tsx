"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslation } from "@/hooks/use-translation"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"farmer" | "admin" | "expert">("farmer")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user type in localStorage for demo purposes
    localStorage.setItem("userType", userType)
    localStorage.setItem("isAuthenticated", "true")

    // Redirect based on user type
    switch (userType) {
      case "farmer":
        router.push("/dashboard/farmer")
        break
      case "admin":
        router.push("/dashboard/admin")
        break
      case "expert":
        router.push("/dashboard/expert")
        break
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <LanguageSelector className="w-32" />
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t("auth.signIn")}</TabsTrigger>
          <TabsTrigger value="register">{t("auth.register")}</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">{t("auth.userType")}</Label>
              <Select value={userType} onValueChange={(value: "farmer" | "admin" | "expert") => setUserType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">{t("auth.farmer")}</SelectItem>
                  <SelectItem value="admin">{t("auth.admin")}</SelectItem>
                  <SelectItem value="expert">{t("auth.expert")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("common.email")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("common.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("common.password")}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("auth.signingIn") : t("auth.signIn")}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Registration will be available soon. Please contact your local agriculture office for account setup.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
