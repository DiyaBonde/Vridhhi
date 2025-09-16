"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PredictionResult {
  predictedYield: number
  confidence: number
  factors: string[]
  weather: {
    temperature: number
    rainfall: number
    humidity: number
  }
  recommendations: {
    fertilizer: string[]
    irrigation: string[]
    pestControl: string[]
    general: string[]
  }
}

export function YieldPredictionForm() {
  const [formData, setFormData] = useState({
    cropType: "",
    landSize: "",
    soilType: "",
    location: "",
    sowingDate: "",
    previousYield: "",
    soilPh: "",
    organicMatter: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  })

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/predict-yield", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          landSize: Number.parseFloat(formData.landSize),
          previousYield: formData.previousYield ? Number.parseFloat(formData.previousYield) : undefined,
          soilPh: formData.soilPh ? Number.parseFloat(formData.soilPh) : undefined,
          organicMatter: formData.organicMatter ? Number.parseFloat(formData.organicMatter) : undefined,
          nitrogen: formData.nitrogen ? Number.parseFloat(formData.nitrogen) : undefined,
          phosphorus: formData.phosphorus ? Number.parseFloat(formData.phosphorus) : undefined,
          potassium: formData.potassium ? Number.parseFloat(formData.potassium) : undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setPrediction(result.prediction)
      } else {
        setError(result.error || "Failed to get prediction")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setPrediction(null)
    setFormData({
      cropType: "",
      landSize: "",
      soilType: "",
      location: "",
      sowingDate: "",
      previousYield: "",
      soilPh: "",
      organicMatter: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
    })
  }

  if (prediction) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Yield Prediction Results</h2>
          <Button variant="outline" onClick={resetForm}>
            New Prediction
          </Button>
        </div>

        {/* Prediction Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Predicted Yield</CardTitle>
            <CardDescription>Based on current conditions and AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{prediction.predictedYield} tons</div>
                <p className="text-sm text-muted-foreground">Expected yield</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{prediction.confidence}%</div>
                <p className="text-sm text-muted-foreground">Confidence level</p>
                <Progress value={prediction.confidence} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {Math.round((prediction.predictedYield / Number.parseFloat(formData.landSize)) * 100) / 100}
                </div>
                <p className="text-sm text-muted-foreground">Tons per acre</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Forecast</CardTitle>
            <CardDescription>Current weather conditions affecting your crop</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-semibold">{Math.round(prediction.weather.temperature)}°C</div>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-semibold">{Math.round(prediction.weather.rainfall)}mm</div>
                <p className="text-sm text-muted-foreground">Expected Rainfall</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-semibold">{Math.round(prediction.weather.humidity)}%</div>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Factors */}
        <Card>
          <CardHeader>
            <CardTitle>Key Factors Considered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {prediction.factors.map((factor, index) => (
                <Badge key={index} variant="secondary">
                  {factor}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Tabs defaultValue="fertilizer" className="space-y-4">
          <TabsList>
            <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
            <TabsTrigger value="pest">Pest Control</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="fertilizer">
            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prediction.recommendations.fertilizer.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="irrigation">
            <Card>
              <CardHeader>
                <CardTitle>Irrigation Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prediction.recommendations.irrigation.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pest">
            <Card>
              <CardHeader>
                <CardTitle>Pest Control Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prediction.recommendations.pestControl.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prediction.recommendations.general.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Yield Prediction</h2>
        <p className="text-muted-foreground">
          Get accurate crop yield predictions based on your farm data and weather conditions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="soil">Soil Data</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Crop Information</CardTitle>
                <CardDescription>Enter your basic crop and farm details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={formData.cropType} onValueChange={(value) => handleInputChange("cropType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                        <SelectItem value="barley">Barley</SelectItem>
                        <SelectItem value="mustard">Mustard</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landSize">Land Size (acres)</Label>
                    <Input
                      id="landSize"
                      type="number"
                      step="0.1"
                      value={formData.landSize}
                      onChange={(e) => handleInputChange("landSize", e.target.value)}
                      placeholder="Enter land size"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                        <SelectItem value="black">Black Cotton</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter your location"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sowingDate">Sowing Date</Label>
                    <Input
                      id="sowingDate"
                      type="date"
                      value={formData.sowingDate}
                      onChange={(e) => handleInputChange("sowingDate", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousYield">Previous Yield (tons) - Optional</Label>
                    <Input
                      id="previousYield"
                      type="number"
                      step="0.1"
                      value={formData.previousYield}
                      onChange={(e) => handleInputChange("previousYield", e.target.value)}
                      placeholder="Last year's yield"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="soil" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Soil Test Data</CardTitle>
                <CardDescription>
                  Enter soil test results for more accurate predictions (optional but recommended)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soilPh">Soil pH</Label>
                    <Input
                      id="soilPh"
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      value={formData.soilPh}
                      onChange={(e) => handleInputChange("soilPh", e.target.value)}
                      placeholder="6.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                    <Input
                      id="organicMatter"
                      type="number"
                      step="0.1"
                      value={formData.organicMatter}
                      onChange={(e) => handleInputChange("organicMatter", e.target.value)}
                      placeholder="2.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
                    <Input
                      id="nitrogen"
                      type="number"
                      value={formData.nitrogen}
                      onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                      placeholder="45"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
                    <Input
                      id="phosphorus"
                      type="number"
                      value={formData.phosphorus}
                      onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                      placeholder="25"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="potassium">Potassium (kg/ha)</Label>
                    <Input
                      id="potassium"
                      type="number"
                      value={formData.potassium}
                      onChange={(e) => handleInputChange("potassium", e.target.value)}
                      placeholder="35"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Generating Prediction..." : "Get Yield Prediction"}
        </Button>
      </form>
    </div>
  )
}
