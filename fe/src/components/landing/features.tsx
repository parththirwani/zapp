"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-20 scroll-animate">
          <Badge className="mb-6 bg-gray-100 text-gray-700 border-gray-200 font-semibold">Why Zapp</Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance text-gray-900">
            Built for modern developers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            Everything you need to deploy React applications with confidence, speed, and security.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="border-2 border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 group scroll-animate bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
            <CardHeader className="pb-6 pt-8">
              <div className="mb-6 p-4 bg-gray-900 rounded-lg font-mono text-sm text-green-400 group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>$ zapp deploy</div>
                <div className="text-blue-400">✓ Build completed in 12s</div>
                <div className="text-green-400">✓ Deployed to production</div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Lightning Fast</CardTitle>
              <CardDescription className="text-lg leading-relaxed text-gray-600">
                Deploy in under 30 seconds with our optimized build pipeline, intelligent caching, and global CDN
                distribution
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-gray-100 hover:border-green-200 hover:shadow-2xl transition-all duration-500 group scroll-animate bg-gradient-to-br from-white to-green-50/30 overflow-hidden">
            <CardHeader className="pb-6 pt-8">
              <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Security Score</span>
                  <span className="bg-white text-green-600 px-2 py-1 rounded text-xs font-bold">A+</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>SSL/TLS</span>
                    <span>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SOC 2</span>
                    <span>✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Isolation</span>
                    <span>✓</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Enterprise Security</CardTitle>
              <CardDescription className="text-lg leading-relaxed text-gray-600">
                SOC 2 Type II compliant with end-to-end encryption, secure isolated builds, and automated
                vulnerability scanning
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 border-gray-100 hover:border-purple-200 hover:shadow-2xl transition-all duration-500 group scroll-animate bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
            <CardHeader className="pb-6 pt-8">
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">50+</div>
                  <div className="text-sm opacity-90">Edge Locations</div>
                  <div className="flex justify-center mt-2 space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Global Scale</CardTitle>
              <CardDescription className="text-lg leading-relaxed text-gray-600">
                Automatic deployments to 50+ edge locations worldwide with intelligent routing for optimal performance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}