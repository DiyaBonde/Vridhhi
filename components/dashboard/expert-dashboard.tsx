"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConsultationRequest {
  id: string
  farmerName: string
  location: string
  cropType: string
  issue: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "resolved"
  submittedDate: string
}

export function ExpertDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([])
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const userType = localStorage.getItem("userType")

    if (!auth || userType !== "expert") {
      router.push("/auth/login")
      return
    }

    setIsAuthenticated(true)
    loadMockData()
  }, [router])

  const loadMockData = () => {
    const mockConsultations: ConsultationRequest[] = [
      {
        id: "1",
        farmerName: "Rajesh Kumar",
        location: "Punjab",
        cropType: "Wheat",
        issue: "Yellow spots appearing on wheat leaves. Concerned about possible disease.",
        priority: "high",
        status: "pending",
        submittedDate: "2024-12-15",
      },
      {
        id: "2",
        farmerName: "Priya Sharma",
        location: "Haryana",
        cropType: "Rice",
        issue: "Rice plants are not growing as expected. Growth seems stunted.",
        priority: "medium",
        status: "in-progress",
        submittedDate: "2024-12-14",
      },
      {
        id: "3",
        farmerName: "Amit Patel",
        location: "Gujarat",
        cropType: "Cotton",
        issue: "Pest infestation in cotton field. Need immediate advice on treatment.",
        priority: "high",
        status: "pending",
        submittedDate: "2024-12-15",
      },
      {
        id: "4",
        farmerName: "Sunita Devi",
        location: "Bihar",
        cropType: "Maize",
        issue: "Soil seems too dry despite regular irrigation. Seeking advice on water management.",
        priority: "low",
        status: "resolved",
        submittedDate: "2024-12-12",
      },
    ]

    setConsultations(mockConsultations)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userType")
    router.push("/auth/login")
  }

  const handleStatusChange = (consultationId: string, newStatus: "pending" | "in-progress" | "resolved") => {
    setConsultations((prev) =>
      prev.map((consultation) =>
        consultation.id === consultationId ? { ...consultation, status: newStatus } : consultation,
      ),
    )
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Vriddhi - Expert</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Expert Dashboard</h2>
          <p className="text-muted-foreground">Provide expert guidance and validate AI recommendations for farmers</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {consultations.filter((c) => c.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {consultations.filter((c) => c.status === "in-progress").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently working</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {consultations.filter((c) => c.status === "resolved").length}
              </div>
              <p className="text-xs text-muted-foreground">Completed cases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {consultations.filter((c) => c.priority === "high" && c.status !== "resolved").length}
              </div>
              <p className="text-xs text-muted-foreground">Urgent cases</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="consultations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="ai-validation">AI Validation</TabsTrigger>
            <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          </TabsList>

          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farmer Consultations</CardTitle>
                <CardDescription>Review and respond to farmer queries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Crop</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">{consultation.farmerName}</TableCell>
                        <TableCell>{consultation.location}</TableCell>
                        <TableCell>{consultation.cropType}</TableCell>
                        <TableCell className="max-w-xs truncate">{consultation.issue}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              consultation.priority === "high"
                                ? "destructive"
                                : consultation.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {consultation.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              consultation.status === "resolved"
                                ? "default"
                                : consultation.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {consultation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {consultation.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(consultation.id, "in-progress")}
                                className="h-8"
                              >
                                Start
                              </Button>
                            )}
                            {consultation.status === "in-progress" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(consultation.id, "resolved")}
                                className="h-8"
                              >
                                Resolve
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="h-8 bg-transparent">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-validation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations to Review</CardTitle>
                  <CardDescription>Validate AI-generated farming recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Wheat Fertilizer Recommendation</h4>
                      <Badge variant="outline">Pending Review</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI recommends 25kg Urea per acre for Rajesh Kumar's wheat field in Punjab.
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Modify
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">Rice Irrigation Schedule</h4>
                      <Badge variant="outline">Pending Review</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI suggests irrigation every 7 days for Priya Sharma's rice field in Haryana.
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Modify
                      </Button>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expert Override</CardTitle>
                  <CardDescription>Provide custom recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Farmer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose farmer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rajesh">Rajesh Kumar - Punjab</SelectItem>
                        <SelectItem value="priya">Priya Sharma - Haryana</SelectItem>
                        <SelectItem value="amit">Amit Patel - Gujarat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Recommendation Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fertilizer">Fertilizer</SelectItem>
                        <SelectItem value="irrigation">Irrigation</SelectItem>
                        <SelectItem value="pest">Pest Control</SelectItem>
                        <SelectItem value="general">General Advice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Expert Recommendation</Label>
                    <Textarea placeholder="Enter your expert recommendation..." className="min-h-[100px]" />
                  </div>

                  <Button className="w-full">Send Recommendation</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="knowledge-base" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Issues & Solutions</CardTitle>
                  <CardDescription>Frequently encountered farming problems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">Wheat Leaf Rust</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Orange-red pustules on leaves, common in humid conditions.
                    </p>
                    <p className="text-sm">
                      <strong>Solution:</strong> Apply fungicide (Propiconazole) at 0.1% concentration.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">Rice Blast Disease</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Diamond-shaped lesions with gray centers on leaves.
                    </p>
                    <p className="text-sm">
                      <strong>Solution:</strong> Use resistant varieties and apply Tricyclazole fungicide.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">Cotton Bollworm</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Larvae feeding on cotton bolls, causing significant damage.
                    </p>
                    <p className="text-sm">
                      <strong>Solution:</strong> Use pheromone traps and apply Bt cotton varieties.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add Knowledge Article</CardTitle>
                  <CardDescription>Contribute to the knowledge base</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Article Title</Label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md"
                      placeholder="Enter article title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diseases">Plant Diseases</SelectItem>
                        <SelectItem value="pests">Pest Control</SelectItem>
                        <SelectItem value="nutrition">Plant Nutrition</SelectItem>
                        <SelectItem value="irrigation">Irrigation</SelectItem>
                        <SelectItem value="general">General Farming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea placeholder="Write the article content..." className="min-h-[120px]" />
                  </div>

                  <Button className="w-full">Publish Article</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
