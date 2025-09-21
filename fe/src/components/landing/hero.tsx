"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import { BackgroundBeams } from "@/components/ui/background-beams" // Adjust path as needed

export default function HeroSection() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Background Beams */}
      <BackgroundBeams className="absolute inset-0 z-0" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] z-5" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse z-5" />
      <div className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000 z-5" />
      
      <div className="container mx-auto text-center max-w-6xl relative z-20">
        <div className="animate-fade-in-up">
          <div className="mb-8">
            <Image
              src="/logo.png" // Replace with your logo path
              alt="Zapp Logo"
              width={768}
              height={192}
              className="mx-auto w-48 h-auto md:w-64 lg:w-96 drop-shadow-2xl"
              priority
            />
          </div>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 text-balance leading-tight">
            Deploy React Apps
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Instantly
            </span>
          </p>
          <p className="text-xl md:text-2xl text-gray-600 mb-16 text-pretty max-w-4xl mx-auto leading-relaxed font-light">
            Simply paste your GitHub URL and watch your React project go live in under 30 seconds. Professional
            deployments with enterprise-grade security.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex-1 relative group">
              <Image
                src="/github-logo.png" // Path to GitHub logo in public directory
                alt="GitHub Logo"
                width={24}
                height={24}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 group-focus-within:brightness-75 transition-filter"
              />
              <Input
                placeholder="https://github.com/username/awesome-react-app"
                className="pl-16 h-16 text-lg bg-white/10 border-2 border-white/20 focus:border-blue-400 shadow-2xl rounded-xl font-mono text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              size="lg"
              className="h-16 px-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-blue-500/25 transition-all rounded-xl border-0"
            >
              Deploy Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>3 deployments per month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}