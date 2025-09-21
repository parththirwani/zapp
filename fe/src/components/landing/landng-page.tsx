"use client"

import { useEffect, useRef } from "react"
import HeroSection from "./hero"
import HowItWorksSection from "./how-it-works"
import FeaturesSection from "./features"
import SecuritySection from "./security"
import CTASection from "./cta"
import Footer from "./footer"


export default function ZappLandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  )
}