import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-100 via-lime-50 to-yellow-50 animate-pulse"
        style={{ animationDuration: "12s" }}
      />

      {/* Farm landscape image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="/beautiful-green-farm-fields-with-crops-rolling-hil.jpg"
          alt="Farm landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='0.6'%3E%3Cpath d='M60 60c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30zm30-30c16.569 0 30 13.431 30 30s-13.431 30-30 30-30-13.431-30-30 13.431-30 30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Floating agricultural elements with enhanced animations */}
      <div className="absolute top-12 left-12 opacity-40 animate-bounce" style={{ animationDuration: "4s" }}>
        <div className="w-20 h-20 bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-200/50 shadow-lg">
          <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zm8-10l-6-4v8l6-4zM4 12l6 4V8l-6 4z" />
          </svg>
        </div>
      </div>

      <div className="absolute top-24 right-20 opacity-35 animate-pulse" style={{ animationDuration: "6s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-lime-400/30 to-green-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-lime-200/50 shadow-lg">
          <svg className="w-12 h-12 text-lime-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-20 left-24 opacity-40 animate-bounce" style={{ animationDuration: "7s" }}>
        <div className="w-18 h-18 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-yellow-200/50 shadow-lg">
          <svg className="w-9 h-9 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/6 opacity-30 animate-pulse" style={{ animationDuration: "8s" }}>
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-emerald-200/50 shadow-lg">
          <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 2C8.45 2 8 2.45 8 3v1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1V7h1c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-1V3c0-.55-.45-1-1-1z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-1/5 opacity-35 animate-bounce" style={{ animationDuration: "9s" }}>
        <div className="w-22 h-22 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-200/50 shadow-lg">
          <svg className="w-11 h-11 text-green-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      {/* Additional floating elements for more visual richness */}
      <div className="absolute top-1/4 right-1/3 opacity-25 animate-pulse" style={{ animationDuration: "10s" }}>
        <div className="w-14 h-14 bg-gradient-to-br from-lime-500/30 to-green-600/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-lime-200/50 shadow-lg">
          <svg className="w-7 h-7 text-lime-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-1/2 left-1/3 opacity-30 animate-bounce" style={{ animationDuration: "11s" }}>
        <div className="w-16 h-16 bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-teal-200/50 shadow-lg">
          <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary via-green-600 to-emerald-700 rounded-full mb-6 shadow-2xl animate-pulse border-4 border-white/50"
            style={{ animationDuration: "4s" }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Vriddhi
          </h1>
          <p className="text-xl text-green-700 font-semibold mb-2">वृद्धि - Growth Through Intelligence</p>
          <p className="text-lg text-green-600 font-medium">Smart farming for sustainable yields</p>
        </div>

        <Card className="backdrop-blur-xl bg-white/90 shadow-2xl border-0 ring-2 ring-green-200/60 hover:ring-green-300/70 transition-all duration-300">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-green-800 font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-green-600 font-medium">
              Sign in to access your farming dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
