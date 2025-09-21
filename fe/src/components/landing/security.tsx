"use client"

import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle } from "lucide-react"

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          <div className="scroll-animate">
            <Badge className="mb-8 bg-green-100 text-green-700 border-green-200 font-semibold">
              <Shield className="w-4 h-4 mr-2" />
              Security First
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance leading-tight text-gray-900">
              Deploy with complete confidence
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-pretty leading-relaxed">
              Your code is protected at every step with industry-leading security practices, compliance standards, and
              automated monitoring systems.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">End-to-end encryption</h3>
                  <p className="text-gray-600 text-lg">
                    All builds and deployments are encrypted in transit and at rest with AES-256 encryption
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">SOC 2 Type II compliant</h3>
                  <p className="text-gray-600 text-lg">Independently audited security controls and processes</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">Isolated environments</h3>
                  <p className="text-gray-600 text-lg">
                    Each build runs in a completely isolated container environment
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900">Automated security scanning</h3>
                  <p className="text-gray-600 text-lg">Real-time vulnerability detection and dependency monitoring</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative scroll-animate">
            <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-2xl">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">Security Score</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-lg px-4 py-2">A+</Badge>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="font-semibold text-lg text-gray-900">SSL/TLS Encryption</span>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="font-semibold text-lg text-gray-900">SOC 2 Type II Compliance</span>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="font-semibold text-lg text-gray-900">Isolated Environments</span>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="font-semibold text-lg text-gray-900">Audit Logging</span>
                    <CheckCircle className="w-6 h-6 text-green-600" />
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