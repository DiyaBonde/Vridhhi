"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageSelector } from "@/components/language-selector"
import { VoiceAssistant } from "@/components/voice-assistant"
import { useTranslation } from "@/hooks/use-translation"

export function FarmerDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const userType = localStorage.getItem("userType")

    if (!auth || userType !== "farmer") {
      router.push("/auth/login")
      return
    }

    setIsAuthenticated(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userType")
    router.push("/auth/login")
  }

  const handleGetPrediction = () => {
    router.push("/prediction")
  }

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()

    // Simple voice command processing
    if (
      lowerCommand.includes("prediction") ||
      lowerCommand.includes("predict") ||
      lowerCommand.includes("पूर्वानुमान") ||
      lowerCommand.includes("ପୂର୍ବାନୁମାନ") ||
      lowerCommand.includes("अंदाज")
    ) {
      handleGetPrediction()
    } else if (
      lowerCommand.includes("logout") ||
      lowerCommand.includes("लॉगआउट") ||
      lowerCommand.includes("ଲଗଆଉଟ") ||
      lowerCommand.includes("लॉगआउट")
    ) {
      handleLogout()
    }
  }

  if (!isAuthenticated) {
    return <div>{t("common.loading")}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Vriddhi</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector className="w-32" />
            <Button onClick={handleGetPrediction}>{t("dashboard.getPrediction")}</Button>
            <Button variant="outline" onClick={handleLogout}>
              {t("common.logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">{t("dashboard.welcomeBack")}</h2>
              <p className="text-muted-foreground">{t("dashboard.farmingOverview")}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.currentSeason")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rabi 2025</div>
                  <p className="text-xs text-muted-foreground">
                    {t("crops.wheat")}, {t("crops.barley")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.landArea")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5.2 acres</div>
                  <p className="text-xs text-muted-foreground">3 plots registered</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.expectedYield")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">12.5 tons</div>
                  <p className="text-xs text-muted-foreground">+15% from last year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{t("dashboard.weatherAlert")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-1">
                    Moderate Rain
                  </Badge>
                  <p className="text-xs text-muted-foreground">Next 3 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">{t("dashboard.overview")}</TabsTrigger>
                <TabsTrigger value="predictions">{t("dashboard.predictions")}</TabsTrigger>
                <TabsTrigger value="recommendations">{t("dashboard.recommendations")}</TabsTrigger>
                <TabsTrigger value="alerts">{t("dashboard.alerts")}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("dashboard.cropHealth")}</CardTitle>
                      <CardDescription>Current status of your crops</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("crops.wheat")} (Plot A)</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("crops.barley")} (Plot B)</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("crops.mustard")} (Plot C)</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("dashboard.recentActivities")}</CardTitle>
                      <CardDescription>Your farming activities this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Fertilizer applied to Plot A</p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Irrigation scheduled</p>
                            <p className="text-xs text-muted-foreground">3 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Pest inspection completed</p>
                            <p className="text-xs text-muted-foreground">5 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="predictions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI {t("dashboard.predictions")}</CardTitle>
                    <CardDescription>Based on current conditions and historical data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">{t("crops.wheat")}</h3>
                        <div className="text-2xl font-bold text-green-600 mb-1">8.5 tons</div>
                        <p className="text-sm text-muted-foreground">Expected yield</p>
                        <Badge variant="secondary" className="mt-2">
                          High Confidence
                        </Badge>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">{t("crops.barley")}</h3>
                        <div className="text-2xl font-bold text-green-600 mb-1">2.8 tons</div>
                        <p className="text-sm text-muted-foreground">Expected yield</p>
                        <Badge variant="secondary" className="mt-2">
                          Medium Confidence
                        </Badge>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">{t("crops.mustard")}</h3>
                        <div className="text-2xl font-bold text-green-600 mb-1">1.2 tons</div>
                        <p className="text-sm text-muted-foreground">Expected yield</p>
                        <Badge variant="secondary" className="mt-2">
                          High Confidence
                        </Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button onClick={handleGetPrediction}>{t("dashboard.getDetailedPrediction")}</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t("prediction.fertilizer")} {t("dashboard.recommendations")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-1">{t("crops.wheat")} (Plot A)</h4>
                        <p className="text-sm text-muted-foreground mb-2">Apply 25kg Urea per acre</p>
                        <Button size="sm" variant="outline">
                          Schedule Application
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-1">{t("crops.barley")} (Plot B)</h4>
                        <p className="text-sm text-muted-foreground mb-2">Apply 15kg DAP per acre</p>
                        <Button size="sm" variant="outline">
                          Schedule Application
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("prediction.irrigation")} Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-1">Next {t("prediction.irrigation")}</h4>
                        <p className="text-sm text-muted-foreground mb-2">Tomorrow, 6:00 AM</p>
                        <p className="text-xs text-muted-foreground">Duration: 2 hours per plot</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-1">Water Requirement</h4>
                        <p className="text-sm text-muted-foreground">Moderate - 2 inches</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <div className="space-y-4">
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader>
                      <CardTitle className="text-yellow-800">{t("dashboard.weatherAlert")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-yellow-700">
                        Moderate rainfall expected in the next 3 days. Consider postponing fertilizer application.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800">{t("prediction.irrigation")} Reminder</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-700">
                        Plot A requires irrigation tomorrow morning. Optimal time: 6:00 AM - 8:00 AM
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-800">Seasonal Advisory</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-blue-700">
                        Consider sowing summer crops ({t("crops.maize")}, {t("crops.cotton")}) in the next 2 weeks for
                        optimal yield.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Voice Assistant Sidebar */}
          <div className="lg:w-80">
            <VoiceAssistant onCommand={handleVoiceCommand} />
          </div>
        </div>
      </div>
    </div>
  )
}
