"use client"
import { Zap } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <Image
                src="/logo.png" // Replace with your logo path
                alt="Zapp Logo"
                width={120} // Adjust width to match original text size (text-2xl)
                height={80} // Adjust height to maintain aspect ratio
              />
            </div>
            <p className="text-gray-600 text-lg text-pretty leading-relaxed mb-8">
              Deploy React apps instantly with enterprise-grade security and global performance. Built for modern
              developers.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                <Image
                  src="/github-logo.png" // Path to GitHub logo in public directory
                  alt="GitHub Logo"
                  width={20}
                  height={20}
                  className="text-gray-600"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900">Product</h3>
            <ul className="space-y-4 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900">Company</h3>
            <ul className="space-y-4 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900">Support</h3>
            <ul className="space-y-4 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">© 2025 Zapp. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}