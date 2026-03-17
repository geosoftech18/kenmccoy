"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

import {
  CheckCircle,
  Users,
  Target,
  BarChart3,
  Brain,
  Award,
  Briefcase,
  Play,
  Star,
  TrendingUp,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import Footer from "@/components/footer"

function CounterAnimation({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={countRef} className="text-3xl font-bold text-accent">
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timelineSlide, setTimelineSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const differentiators = [
    {
      icon: Brain,
      title: "Behavioral Assessment",
      description:
        "We assess behavioral competencies for each role to ensure cultural fit and team dynamics through advanced psychological profiling.",
      features: ["Cultural Fit Analysis", "Team Dynamics Assessment", "Leadership Style Evaluation"],
    },
    {
      icon: Target,
      title: "Technical Competencies",
      description:
        "We assess technical competencies for each role to match skill requirements precisely using industry-specific benchmarks.",
      features: ["Skill Gap Analysis", "Industry Benchmarking", "Performance Prediction"],
    },
    {
      icon: Users,
      title: "Assessment Centre Process",
      description:
        "We use comprehensive Assessment Centre Process to select the most suitable candidates through multi-dimensional evaluation.",
      features: ["Multi-Dimensional Testing", "Simulation Exercises", "Group Assessments"],
    },
    {
      icon: BarChart3,
      title: "Psychometric Testing",
      description:
        "We apply advanced psychometric testing on retained search assignments for deeper insights into personality and potential.",
      features: ["Personality Profiling", "Cognitive Assessment", "Emotional Intelligence"],
    },
    {
      icon: Award,
      title: "Comprehensive Reports",
      description:
        "We provide detailed, actionable reports for each candidate with performance and stability predictions.",
      features: ["Performance Prediction", "Stability Analysis", "Cultural Fit Score", "Leadership Potential"],
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % differentiators.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + differentiators.length) % differentiators.length)
  }

  const timeline = [
    { year: "Year 1", title: "Founded", desc: "Ken McCoy Leadership Advisory was established." },
    { year: "Year 2", title: "First 25 Placements", desc: "Crossed 25 executive placements milestone." },
    { year: "Year 3", title: "Sector Expansion", desc: "Expanded into Manufacturing and Healthcare." },
    { year: "Year 4", title: "Global Reach", desc: "Opened international collaborations and network." },
    { year: "Year 5", title: "Assessment Suite", desc: "Launched scientific assessment methodology." },
    { year: "Year 6", title: "500+ Leaders", desc: "Achieved 500+ leadership placements." },
    { year: "Year 7", title: "98% Success", desc: "Maintained exceptional success rate across mandates." },
    { year: "Year 8", title: "New Verticals", desc: "Added Energy, Retail and Tech leadership programs." },
  ]

  const nextTimeline = () => setTimelineSlide((p) => (p + 1) % 2)
  const prevTimeline = () => setTimelineSlide((p) => (p - 1 + 2) % 2)

  return (
    <div className="about-page-light min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative  bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 lg:py-36 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Leadership Excellence Since Inception
          </div>
          <h1 className="font-red-hat-display text-4xl md:text-6xl xl:text-7xl font-bold text-primary mb-6 tracking-tight">Ken McCoy</h1>
          <p className="text-xl md:text-3xl text-muted-foreground mb-6 max-w-4xl mx-auto font-light">
            Leadership Advisory Organization
          </p>
          <p className="md:text-lg text-md text-foreground mb-10 max-w-5xl mx-auto leading-relaxed">
            Established by experienced professionals from almost all fields of modern industry, we deliver a thoughtful
            approach for selecting the best fit through scientific, psychological, skill and competency-based methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg" onClick={() => window.location.href = '/Services'}>
              Discover Our Approach
            </Button>
           
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 border-[#1e293b] text-[#1e293b] bg-transparent hover:bg-[#1e293b]/10 hover:text-[#1e293b]" onClick={() => {
              setTimeout(() => {
                const element = document.getElementById('About-video-section');
                if (element) {
                  element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                } else {
                  // Fallback: scroll to the section using class name
                  const section = document.querySelector('.About-video-section');
                  if (section) {
                    section.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }
                }
              }, 100);
            }}>
              Watch Our Story
            </Button>
           
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="About-video-section" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 About-video-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="font-red-hat-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
              Experience Our Expertise
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto px-4">
              Discover how our scientific approach to leadership recruitment transforms organizations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
            {/* Main Featured Video */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="relative aspect-[10/10] sm:aspect-[16/9] lg:aspect-[18/9] min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] bg-muted/50">
                  {!isVideoPlaying ? (
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-center justify-center group cursor-pointer"
                      onClick={handleVideoPlay}
                    >
                      {/* Thumbnail Image */}
                      <img 
                        src="/placeholder.jpg" 
                        alt="Video thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-accent rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-accent-foreground ml-1" />
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-primary mb-2 sm:mb-3">
                          Our Leadership Philosophy
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xs sm:max-w-sm lg:max-w-md">
                          Learn about our comprehensive approach to identifying and placing exceptional leaders
                        </p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/sUgLThLtFjw?autoplay=1&mute=1&controls=1&showinfo=0&rel=0"
                      title="Ken McCoy Consulting Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </Card>
            </div>

            {/* Secondary Videos */}
            {/* <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative aspect-video bg-muted/30 flex items-center justify-center group cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent/30 transition-colors">
                    <Play className="w-6 h-6 text-accent ml-1" />
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-1">Assessment Process</h4>
                  <p className="text-sm text-muted-foreground px-4">Deep dive into our scientific evaluation methods</p>
                </div>
              </div>
            </Card> */}

            {/* <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative aspect-video bg-muted/30 flex items-center justify-center group cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent/30 transition-colors">
                    <Play className="w-6 h-6 text-accent ml-1" />
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-1">Success Stories</h4>
                  <p className="text-sm text-muted-foreground px-4">Client testimonials and placement outcomes</p>
                </div>
              </div>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Our Journey
              </div>
              <h2 className="font-red-hat-display text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
                Redefining Leadership Recruitment
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-foreground leading-relaxed">
                  Ken McCoy is privileged to have distinguished Human Resources and Industry leaders as partners who
                  have led and mentored many Indian and Multinational firms of great repute.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  Our approach addresses the need of the day due to the dynamism of talents and industry today, ensuring
                  we find the perfect leadership match within the quickest possible time.
                </p>
                <div className="flex items-center gap-6 pt-4">
                  <div className="text-center text-foreground">
                    <CounterAnimation  end={500} suffix="+" duration={2500} />
                    <div className="text-sm text-muted-foreground">Leaders Placed</div>
                  </div>
                  <div className="text-center">
                    <CounterAnimation end={98} suffix="%" duration={2200} />
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <CounterAnimation end={25} suffix="+" duration={2000} />
                    <div className="text-sm text-muted-foreground">Industries Served</div>
                  </div>
                  <div className="text-center">
                    <CounterAnimation end={25} suffix="+" duration={1800} />
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <img
                  src="/journey.jpg?height=500&width=500"
                  alt="Ken McCoy leadership team"
                  className="rounded-2xl shadow-2xl w-full bg-muted"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Company Timeline
            </div>
            <h2 className="font-red-hat-display text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Our 25-Year Journey</h2>
            <p className="md:text-xl text-lg text-muted-foreground max-w-3xl mx-auto">
              Key milestones that shaped our growth and leadership excellence
            </p>
          </div>

          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full overflow-hidden rounded-xl shadow-2xl bg-muted/20">
              <img 
                src="/timeline1.jpg" 
                alt="timeline" 
                className="w-full h-full object-contain object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Timeline Carousel */}
          {/* <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">8 Milestones</div>
              <div className="flex items-center gap-2">
                <Button onClick={prevTimeline} variant="outline" className="rounded-full w-10 h-10 bg-transparent">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button onClick={nextTimeline} variant="outline" className="rounded-full w-10 h-10 bg-transparent">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${timelineSlide * 100}%)` }}
              >
                {[0, 1].map((slideIdx) => (
                  <div key={slideIdx} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {timeline.slice(slideIdx * 4, slideIdx * 4 + 4).map((item, i) => (
                        <Card
                          key={`${item.year}-${i}`}
                          className="group relative overflow-hidden border-0 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">{item.year}</span>
                              <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                            </div>
                            <CardTitle className="text-xl font-red-hat-display text-primary group-hover:text-accent transition-colors">
                              {item.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.desc}
                            </p>
                            <div className="mt-6 h-1 w-full bg-muted/40 rounded-full overflow-hidden">
                              <div className="h-full w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-700" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Timeline Indicators */}
            {/* <div className="flex items-center justify-center gap-2 mt-8">
              {[0, 1].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setTimelineSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === timelineSlide ? "bg-primary scale-125 shadow-lg" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to timeline slide ${idx + 1}`}
                />
              ))}
            </div> */}

             {/* Progress */}
            {/* <div className="mt-6 bg-muted/30 rounded-full h-1 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
                style={{ width: `${((timelineSlide + 1) / 2) * 100}%` }}
              />
            </div>
          </div> */}
        </div>
      </section>

      {/* Our Differentiators Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center md:mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Our Methodology
            </div>
            <h2 className="font-red-hat-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">What Sets Us Apart</h2>
            <p className="md:text-xl  text-lg text-muted-foreground max-w-3xl mx-auto">
              Our scientific approach combines cutting-edge assessment techniques with deep industry expertise
            </p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {differentiators.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card to-muted/10 mx-auto max-w-4xl min-h-[500px] relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/5 to-transparent rounded-full -translate-y-32 translate-x-32" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-24 -translate-x-24" />

                        <CardHeader className="md:pb-8 md:pt-12 relative z-10">
                          <div className="flex flex-col items-center text-center">
                            <div className="md:w-24 md:h-24 h-16 w-16 bg-gradient-to-br from-accent to-accent/80 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                              <IconComponent className="md:w-12 md:h-12 w-8 h-8 text-accent" />
                            </div>
                            <CardTitle className="text-2xl md:text-4xl font-bold font-red-hat-display text-primary md:mb-6">
                              {item.title}
                            </CardTitle>
                          </div>
                        </CardHeader>

                        <CardContent className="px-12 md:pb-12 pb-4 relative z-10">
                          <p className="md:text-lg text-md text-muted-foreground leading-relaxed text-center md:mb-8 max-w-4xl mx-auto">
                            {item.description}
                          </p>

                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {item.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center gap-3 bg-muted/30 rounded-xl px-4 py-3 hover:bg-muted/50 transition-colors"
                              >
                                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                                <span className="text-sm font-medium text-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="lg"
                className="w-14 h-14 rounded-full border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 shadow-lg bg-transparent"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Slide Indicators */}
              <div className="flex gap-3">
                {differentiators.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-accent scale-125 shadow-lg"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="lg"
                className="w-14 h-14 rounded-full border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 shadow-lg bg-transparent"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${((currentSlide + 1) / differentiators.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Step {currentSlide + 1}</span>
                <span>{differentiators.length} Methods</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Achievements Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/5 to-accent/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative p-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Our Excellence
            </div>
            <h2 className="font-red-hat-display text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">Our Reach & Impact</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Serving diverse industries with specialized expertise across key markets worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                <CounterAnimation end={500} suffix="+" duration={2500} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">Leaders Placed</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                <CounterAnimation end={98} suffix="%" duration={2200} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                <CounterAnimation end={25} suffix="+" duration={2000} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">Industries Served</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                <CounterAnimation end={25} suffix="+" duration={1800} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card to-muted/5 relative overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-6 pt-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Briefcase className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">25+</div>
                    <div className="text-xs text-muted-foreground">Sectors</div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  Industries We Serve
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  Specialized expertise across diverse sectors of modern industry with deep domain knowledge.
                </p>
              </CardHeader>
              <CardContent className="pb-8 relative z-10">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Chemicals
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Engineering and Automobiles
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Infrastructure 
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Telecom and Electronic semiconductors
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Energy & Utilities
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Retail, FMCG & Pharma
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card to-muted/5 relative overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-6 pt-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">C-Level</div>
                    <div className="text-xs text-muted-foreground">Focus</div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors duration-300">
                  Leadership Positions
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  Successfully placed leaders across various levels and functions in top-tier organizations.
                </p>
              </CardHeader>
              <CardContent className="pb-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="font-medium text-foreground">C-Suite Executives</span>
                    </div>
                    <span className="text-sm text-muted-foreground">CEO, CTO, CFO</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="font-medium text-foreground">Vice Presidents</span>
                    </div>
                    <span className="text-sm text-muted-foreground">VP Level</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="font-medium text-foreground">Directors & GMs</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Senior Level</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="font-medium text-foreground">Department Heads</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Mid-Senior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card to-muted/5 relative overflow-hidden hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-6 pt-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Globe className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">Presence</div>
                    <div className="text-xs text-muted-foreground">Reach</div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  Our Presence
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  Strategically positioned to serve clients across key business hubs and emerging markets.
                </p>
              </CardHeader>
              <CardContent className="pb-8 relative z-10">
                <div className="space-y-3">
                  <div className="relative">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                      <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                      <span className="font-medium text-foreground">India</span>
                      <div className="ml-auto text-xs text-muted-foreground">Primary Hubs</div>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                    <span className="font-medium">Bangalore & Chennai</span>
                    <div className="ml-auto text-xs text-muted-foreground">Tech Centers</div>
                  </div> */}
                  {/* <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                    <span className="font-medium">Pune & Hyderabad</span>
                    <div className="ml-auto text-xs text-muted-foreground">Growth Markets</div>
                  </div> */}
                  {/* <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl hover:from-accent/10 hover:to-accent/5 transition-all duration-300 cursor-pointer">
                    <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                    <span className="font-medium">International Network</span>
                    <div className="ml-auto text-xs text-muted-foreground">Global Reach</div>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="font-red-hat-display text-2xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-white">
            Ready to Transform Your Leadership Team?
          </h2>
          <p className="md:text-xl text-lg mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Partner with Ken McCoy for scientific, competency-based leadership recruitment that delivers exceptional
            results in today's dynamic business environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white hover:bg-white/90 text-[#1e293b] px-8 py-3 text-lg font-semibold shadow-lg rounded-lg transition-colors duration-300"
              onClick={() => window.location.href = '/Contact'}
            >
                Schedule Consultation
            </button>
            {/* <button
              className="border-2 border-white text-white  hover:text-black px-8 py-3 text-lg bg-transparent font-semibold rounded-lg transition-colors duration-300"
              onClick={() => window.location.href = '/Contact'}
            >
              Schedule Consultation
            </button> */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
