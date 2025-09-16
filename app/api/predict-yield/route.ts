import { type NextRequest, NextResponse } from "next/server"

interface PredictionRequest {
  cropType: string
  landSize: number
  soilType: string
  location: string
  sowingDate: string
  previousYield?: number
  soilPh?: number
  organicMatter?: number
  nitrogen?: number
  phosphorus?: number
  potassium?: number
}

interface WeatherData {
  temperature: number
  rainfall: number
  humidity: number
}

// Mock weather API call
async function getWeatherData(location: string): Promise<WeatherData> {
  // In a real implementation, this would call a weather API
  return {
    temperature: 25 + Math.random() * 10,
    rainfall: 50 + Math.random() * 100,
    humidity: 60 + Math.random() * 30,
  }
}

// Mock ML prediction algorithm
function calculateYieldPrediction(
  data: PredictionRequest,
  weather: WeatherData,
): {
  predictedYield: number
  confidence: number
  factors: string[]
} {
  const baseYield = getCropBaseYield(data.cropType)
  let yieldMultiplier = 1.0
  const factors: string[] = []

  // Soil factors
  if (data.soilPh) {
    if (data.soilPh >= 6.0 && data.soilPh <= 7.5) {
      yieldMultiplier *= 1.1
      factors.push("Optimal soil pH")
    } else {
      yieldMultiplier *= 0.9
      factors.push("Sub-optimal soil pH")
    }
  }

  // NPK factors
  if (data.nitrogen && data.phosphorus && data.potassium) {
    const npkScore = (data.nitrogen + data.phosphorus + data.potassium) / 300
    yieldMultiplier *= Math.min(1.2, 0.8 + npkScore * 0.4)
    factors.push("NPK levels considered")
  }

  // Weather factors
  if (weather.rainfall > 100) {
    yieldMultiplier *= 1.05
    factors.push("Good rainfall expected")
  } else if (weather.rainfall < 30) {
    yieldMultiplier *= 0.85
    factors.push("Low rainfall - irrigation needed")
  }

  if (weather.temperature > 35) {
    yieldMultiplier *= 0.9
    factors.push("High temperature stress")
  }

  // Previous yield factor
  if (data.previousYield) {
    const avgYield = baseYield * data.landSize
    if (data.previousYield > avgYield) {
      yieldMultiplier *= 1.05
      factors.push("Good historical performance")
    }
  }

  // Seasonal timing
  const sowingMonth = new Date(data.sowingDate).getMonth()
  if (isOptimalSowingTime(data.cropType, sowingMonth)) {
    yieldMultiplier *= 1.1
    factors.push("Optimal sowing time")
  }

  const predictedYield = baseYield * data.landSize * yieldMultiplier
  const confidence = Math.min(95, 70 + Math.random() * 20)

  return {
    predictedYield: Math.round(predictedYield * 100) / 100,
    confidence: Math.round(confidence),
    factors,
  }
}

function getCropBaseYield(cropType: string): number {
  const baseYields: Record<string, number> = {
    wheat: 2.5, // tons per acre
    rice: 3.0,
    maize: 4.0,
    barley: 2.0,
    mustard: 0.8,
    cotton: 1.5,
    sugarcane: 45.0,
    soybean: 1.2,
  }
  return baseYields[cropType.toLowerCase()] || 2.0
}

function isOptimalSowingTime(cropType: string, month: number): boolean {
  const optimalTimes: Record<string, number[]> = {
    wheat: [10, 11, 0], // Nov-Jan
    rice: [5, 6, 7], // Jun-Aug
    maize: [2, 3, 6, 7], // Mar-Apr, Jul-Aug
    barley: [10, 11], // Nov-Dec
    mustard: [9, 10], // Oct-Nov
    cotton: [3, 4, 5], // Apr-Jun
  }
  return optimalTimes[cropType.toLowerCase()]?.includes(month) || false
}

export async function POST(request: NextRequest) {
  try {
    const data: PredictionRequest = await request.json()

    // Validate required fields
    if (!data.cropType || !data.landSize || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get weather data
    const weather = await getWeatherData(data.location)

    // Calculate prediction
    const prediction = calculateYieldPrediction(data, weather)

    // Generate recommendations
    const recommendations = generateRecommendations(data, weather, prediction)

    return NextResponse.json({
      success: true,
      prediction: {
        ...prediction,
        weather,
        recommendations,
      },
    })
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateRecommendations(
  data: PredictionRequest,
  weather: WeatherData,
  prediction: { predictedYield: number; confidence: number; factors: string[] },
): {
  fertilizer: string[]
  irrigation: string[]
  pestControl: string[]
  general: string[]
} {
  const recommendations = {
    fertilizer: [] as string[],
    irrigation: [] as string[],
    pestControl: [] as string[],
    general: [] as string[],
  }

  // Fertilizer recommendations
  if (!data.nitrogen || data.nitrogen < 40) {
    recommendations.fertilizer.push(`Apply 25-30 kg Urea per acre for ${data.cropType}`)
  }
  if (!data.phosphorus || data.phosphorus < 20) {
    recommendations.fertilizer.push("Apply 15-20 kg DAP per acre to improve phosphorus levels")
  }
  if (!data.potassium || data.potassium < 30) {
    recommendations.fertilizer.push("Apply 10-15 kg MOP per acre for potassium deficiency")
  }

  // Irrigation recommendations
  if (weather.rainfall < 50) {
    recommendations.irrigation.push("Schedule irrigation every 7-10 days due to low rainfall forecast")
    recommendations.irrigation.push("Consider drip irrigation to conserve water")
  } else if (weather.rainfall > 150) {
    recommendations.irrigation.push("Ensure proper drainage to prevent waterlogging")
    recommendations.irrigation.push("Reduce irrigation frequency due to high rainfall")
  }

  // Pest control recommendations
  if (weather.humidity > 80) {
    recommendations.pestControl.push("High humidity increases fungal disease risk - apply preventive fungicide")
  }
  if (data.cropType.toLowerCase() === "cotton") {
    recommendations.pestControl.push("Monitor for bollworm infestation during flowering stage")
  }
  if (data.cropType.toLowerCase() === "wheat") {
    recommendations.pestControl.push("Watch for rust diseases, especially during grain filling stage")
  }

  // General recommendations
  if (prediction.confidence < 80) {
    recommendations.general.push("Consider soil testing for more accurate predictions")
  }
  recommendations.general.push(`Optimal harvest time for ${data.cropType} is typically 90-120 days after sowing`)
  recommendations.general.push("Monitor crop regularly and maintain farm records for better future predictions")

  return recommendations
}
