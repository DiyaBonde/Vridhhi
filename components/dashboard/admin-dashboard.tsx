"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Farmer {
  id: string
  name: string
  email: string
  location: string
  landSize: number
  status: "active" | "pending" | "suspended"
  joinDate: string
  lastActive: string
}

interface SystemMetrics {
  totalFarmers: number
  activeFarmers: number
  totalPredictions: number
  accuracyRate: number
  avgYieldIncrease: number
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalFarmers: 0,
    activeFarmers: 0,
    totalPredictions: 0,
    accuracyRate: 0,
    avgYieldIncrease: 0,
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const userType = localStorage.getItem("userType")

    if (!auth || userType !== "admin") {
      router.push("/auth/login")
      return
    }

    setIsAuthenticated(true)
    loadMockData()
  }, [router])

  const loadMockData = () => {
    // Mock farmers data
    const mockFarmers: Farmer[] = [
      {
        id: "1",
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        location: "Punjab",
        landSize: 5.2,
        status: "active",
        joinDate: "2024-01-15",
        lastActive: "2024-12-15",
      },
      {
        id: "2",
        name: "Priya Sharma",
        email: "priya@example.com",
        location: "Haryana",
        landSize: 3.8,
        status: "active",
        joinDate: "2024-02-20",
        lastActive: "2024-12-14",
      },
      {
        id: "3",
        name: "Amit Patel",
        email: "amit@example.com",
        location: "Gujarat",
        landSize: 7.1,
        status: "pending",
        joinDate: "2024-12-10",
        lastActive: "2024-12-10",
      },
      {
        id: "4",
        name: "Sunita Devi",
        email: "sunita@example.com",
        location: "Bihar",
        landSize: 2.5,
        status: "active",
        joinDate: "2024-03-05",
        lastActive: "2024-12-13",
      },
      {
        id: "5",
        name: "Mohan Singh",
        email: "mohan@example.com",
        location: "Rajasthan",
        landSize: 4.3,
        status: "suspended",
        joinDate: "2024-01-30",
        lastActive: "2024-11-20",
      },
    ]

    const mockMetrics: SystemMetrics = {
      totalFarmers: mockFarmers.length,
      activeFarmers: mockFarmers.filter((f) => f.status === "active").length,
      totalPredictions: 1247,
      accuracyRate: 87.5,
      avgYieldIncrease: 12.3,
    }

    setFarmers(mockFarmers)
    setMetrics(mockMetrics)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userType")
    router.push("/auth/login")
  }

  const handleStatusChange = (farmerId: string, newStatus: "active" | "pending" | "suspended") => {
    setFarmers((prev) => prev.map((farmer) => (farmer.id === farmerId ? { ...farmer, status: newStatus } : farmer)))
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Vriddhi - Admin</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage farmers, monitor system performance, and oversee AI models</p>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalFarmers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metrics.activeFarmers}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalPredictions}</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{metrics.accuracyRate}%</div>
              <p className="text-xs text-muted-foreground">Prediction accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Yield Increase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{metrics.avgYieldIncrease}%</div>
              <p className="text-xs text-muted-foreground">Using our platform</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="farmers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="farmers">Farmer Management</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farmer Accounts</CardTitle>
                <CardDescription>Manage farmer registrations and account status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Input placeholder="Search farmers..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Land Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {farmers.map((farmer) => (
                        <TableRow key={farmer.id}>
                          <TableCell className="font-medium">{farmer.name}</TableCell>
                          <TableCell>{farmer.email}</TableCell>
                          <TableCell>{farmer.location}</TableCell>
                          <TableCell>{farmer.landSize} acres</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                farmer.status === "active"
                                  ? "default"
                                  : farmer.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {farmer.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(farmer.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {farmer.status === "pending" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(farmer.id, "active")}
                                  className="h-8"
                                >
                                  Approve
                                </Button>
                              )}
                              {farmer.status === "active" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(farmer.id, "suspended")}
                                  className="h-8"
                                >
                                  Suspend
                                </Button>
                              )}
                              {farmer.status === "suspended" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(farmer.id, "active")}
                                  className="h-8"
                                >
                                  Reactivate
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Performance</CardTitle>
                  <CardDescription>Current model accuracy and performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Wheat Yield Model</span>
                      <span>89.2%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "89.2%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rice Yield Model</span>
                      <span>85.7%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "85.7%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Maize Yield Model</span>
                      <span>91.4%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "91.4%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Training</CardTitle>
                  <CardDescription>Retrain models with new data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Model</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose model to retrain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat Yield Model</SelectItem>
                        <SelectItem value="rice">Rice Yield Model</SelectItem>
                        <SelectItem value="maize">Maize Yield Model</SelectItem>
                        <SelectItem value="all">All Models</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Training Data Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                        <SelectItem value="last-year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Start Training</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>Platform usage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-semibold">342</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Predictions Generated Today</span>
                      <span className="font-semibold">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Session Duration</span>
                      <span className="font-semibold">12 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Most Popular Crop</span>
                      <span className="font-semibold">Wheat</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                  <CardDescription>Farmers by state</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Punjab</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <span className="text-sm font-medium">156</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Haryana</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <span className="text-sm font-medium">124</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Gujarat</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm font-medium">98</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bihar</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                        <span className="text-sm font-medium">76</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-approve farmer registrations</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve new farmer accounts</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable SMS notifications</Label>
                      <p className="text-sm text-muted-foreground">Send SMS alerts to farmers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Daily model retraining</Label>
                      <p className="text-sm text-muted-foreground">Automatically retrain models daily</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage system data and backups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Database Backup</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Create Backup
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Restore Backup
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Data Export</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Export Farmers
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Export Predictions
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>System Maintenance</Label>
                    <Button variant="outline" className="w-full bg-transparent">
                      Clear Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
