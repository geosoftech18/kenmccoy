"use client"

import { useState } from "react"
import { Lightbulb, Award, Users, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const values = [
  {
    icon: Lightbulb,
    title: "Vision-Driven Approach",
    description: "We align talent with purpose, creating meaningful career and business outcomes.",
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    icon: Award,
    title: "Industry Expertise",
    description: "Decades of experience help us understand your sector’s unique demands.",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    icon: Users,
    title: "Global Talent Reach",
    description: "Access a powerful network of professionals across industries and borders.",
    color: "text-teal-500",
    bgColor: "bg-teal-100",
  },
  {
    icon: Target,
    title: "Partnership Mindset",
    description: "We go beyond placements — we build long-term, trust-based collaborations",
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
]

export default function AboutSection() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  return (
    <section className="bg-gradient-to-br from-muted/40 to-background py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 font-red-hat-display">
            Inspiring Growth{" "}
              <span className="relative">
                <span className="  px-3 py-1 rounded-lg"> One Connection at a Time</span>
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every partnership we build fuels progress — for individuals, teams, and industries. This is more than staffing — it’s about creating lasting impact.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className=" items-center mb-16">
            {/* Left Side - Browser Mockups */}
            <div className="relative">
              {/* Background Mockups */}
              {/* <div className="relative h-96 lg:h-[500px]"> */}
                {/* Mockup 1 - Background */}
                {/* <div className="absolute top-0 left-0 w-80 h-48 bg-white rounded-lg shadow-lg transform rotate-3 opacity-80">
                  <div className="bg-gray-100 h-8 rounded-t-lg flex items-center px-3 space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
                  </div>
                </div> */}

                {/* Mockup 2 - Main Focus */}
                {/* <div className="absolute top-8 right-0 w-72 h-44 bg-white rounded-lg shadow-xl transform -rotate-2 z-10">
                  <div className="bg-gray-100 h-8 rounded-t-lg flex items-center px-3 space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded"></div>
                  </div>
                </div> */}

                {/* Mockup 3 - Bottom */}
                {/* <div className="absolute bottom-0 left-8 w-64 h-40 bg-white rounded-lg shadow-lg transform rotate-1">
                  <div className="bg-gray-100 h-8 rounded-t-lg flex items-center px-3 space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-medium mb-2">Digital Business</div>
                    <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                      Inspiration
                    </div>
                    <div className="h-12 bg-gray-100 rounded"></div>
                  </div>
                </div> */}
              {/* </div> */}
            </div>

            {/* Right Side - Collaboration Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/slides/4.png"
                  alt="Team collaboration"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Stats */}
              {/* <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <div className="text-2xl font-bold text-blue-600">1M+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div> */}
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group relative bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-border"
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${value.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${value.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{value.description}</p>

                  {/* Hover Arrow */}
                  <div
                    className={`flex items-center text-accent text-sm font-medium transition-all duration-300 ${hoveredValue === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                  >
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Hover Border */}
                  <div
                    className={`absolute inset-0 border-2 border-blue-600 rounded-xl transition-opacity duration-300 ${hoveredValue === index ? "opacity-100" : "opacity-0"}`}
                  ></div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <a href="/Services">
            <Button size="lg" className="bg-[#005ca1] hover:bg-[#08426d] text-white px-8 py-4 rounded-full text-lg">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button></a>
          </div>
        </div>
      </div>
    </section>
  )
}
