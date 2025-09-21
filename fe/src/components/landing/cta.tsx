"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto text-center max-w-5xl scroll-animate">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance leading-tight">
          Ready to deploy your next React app?
        </h2>
        <p className="text-xl mb-16 text-blue-100 text-pretty leading-relaxed max-w-3xl mx-auto">
          Join thousands of developers who trust Zapp for fast, secure, and reliable deployments. Get started in
          seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            size="lg"
            className="h-16 px-12 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all rounded-xl"
          >
            Start Deploying Free
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 px-12 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-xl bg-transparent"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  )
}