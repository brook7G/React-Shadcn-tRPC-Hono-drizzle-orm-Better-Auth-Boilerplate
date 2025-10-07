import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/auth/auth-client"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const { data: session } = useSession()
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Our Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Build amazing applications with our modern boilerplate. Get started quickly with authentication, 
              database integration, and a beautiful UI.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {session ? (
                <Button size="lg" className="px-8" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button size="lg" className="px-8">
                    <a href="/register">Get Started</a>
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    <a href="/login">Sign In</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Features</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to build modern applications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Authentication</h3>
              <p className="text-gray-600">Phone number based authentication with OTP verification</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern UI</h3>
              <p className="text-gray-600">Beautiful components built with Tailwind CSS and shadcn/ui</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Development</h3>
              <p className="text-gray-600">Pre-configured setup with TypeScript, React, and modern tooling</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}