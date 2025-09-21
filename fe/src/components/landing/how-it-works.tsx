"use client"

import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
import { useEffect, useState } from "react"

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number.parseInt(entry.target.getAttribute("data-step") || "0")
            setActiveStep(stepIndex)
          }
        })
      },
      { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" },
    )

    const stepElements = document.querySelectorAll(".step-item")
    stepElements.forEach((el) => stepObserver.observe(el))

    return () => stepObserver.disconnect()
  }, [])

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-20 scroll-animate">
          <Badge className="mb-6 bg-gray-100 text-gray-700 border-gray-200 font-semibold">How it works</Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance text-gray-900">
            Deploy in three simple steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            From GitHub URL to live deployment in under 30 seconds
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 font-mono">
                      {activeStep === 0 && "zapp.dev"}
                      {activeStep === 1 && "Building..."}
                      {activeStep === 2 && "https://awesome-react-app.zapp.dev"}
                    </div>
                  </div>

                  <div className="h-96 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 transition-all duration-700 ${activeStep === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                      <div className="p-8 h-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Deploy with Zapp</h3>
                        <div className="w-full max-w-sm">
                          <input
                            type="text"
                            placeholder="GitHub URL..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                            readOnly
                          />
                          <button className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg font-semibold">
                            Deploy Now
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 transition-all duration-700 ${activeStep === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                      <div className="p-8 h-full flex flex-col justify-center items-center bg-gray-900 text-white">
                        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-6">Building your app...</h3>
                        <div className="w-full max-w-sm space-y-3 text-sm font-mono">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Installing dependencies</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
                            <span>Building application</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-700"></div>
                            <span>Optimizing assets</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 transition-all duration-700 ${activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                      <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50">
                        <div className="p-6">
                          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                              <h2 className="text-lg font-bold text-gray-900">Awesome React App</h2>
                            </div>
                            <p className="text-gray-600 mb-4">Welcome to your deployed React application!</p>
                            <div className="flex gap-2">
                              <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                React
                              </div>
                              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                TypeScript
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-4 shadow">
                              <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                              <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow">
                              <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
                              <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            Live
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-24">
              <div className="step-item" data-step="0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg mr-6">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Paste GitHub URL</h3>
                    <p className="text-gray-600 mt-1">Simply paste your React project's repository URL</p>
                  </div>
                </div>
              </div>

              <div className="step-item" data-step="1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg mr-6">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Automatic Build</h3>
                    <p className="text-gray-600 mt-1">We clone, build, and optimize your application</p>
                  </div>
                </div>
              </div>

              <div className="step-item" data-step="2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg mr-6">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Live Deployment</h3>
                    <p className="text-gray-600 mt-1">Your app goes live with SSL and global CDN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}