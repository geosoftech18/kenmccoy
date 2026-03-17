"use client"

import type React from "react"
import Header from "@/components/header"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Globe, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from "lucide-react"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you! Your inquiry has been sent successfully. We\'ll get back to you within 24 hours.')
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Failed to send your inquiry. Please try again.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  } 

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header/>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe size={16} />
            Global Leadership Solutions
          </div>
          <h1 className="font-red-hat-display text-4xl md:text-6xl font-bold text-primary mb-6">Let's Connect</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your leadership team? Get in touch with our experts and discover how we can help you find
            exceptional leaders worldwide.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address Card */}
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-red-hat-display text-2xl font-bold text-primary mb-2">Our Headquarters</h3>
                    <p className="text-muted-foreground">Visit us at our Mumbai office</p>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-xl p-6">
                  <address className="not-italic text-foreground leading-relaxed">
                    <strong className="text-primary">	Ken McCoy Consulting   </strong>
                    <br />
                    B-201, Hind Saurashtra Estate
                    <br />
                    Opposite Wellington Park
                    <br />
                    Andheri - Kurla Road
                    <br />
                    Near Marol Metro Station
                    <br />
                    Marol, Andheri (East)
                    <br />
                    Maharashtra 400099, India
                  </address>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Phone</h4>
                  <p className="text-muted-foreground">+91-22-42959123</p>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Email</h4>
                  <p className="text-muted-foreground">info@kenmccoy.in</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <h4 className="font-semibold text-primary">Business Hours</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground font-medium">9:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground font-medium">10:00 AM - 2:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <div className="mb-8">
                <h3 className="font-red-hat-display text-2xl font-bold text-primary mb-2">Send us a Message</h3>
                <p className="text-muted-foreground">
                  Tell us about your leadership needs and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${
                  submitStatus === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200' 
                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" size={20} />
                  ) : (
                    <AlertCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={20} />
                  )}
                  <p className="text-sm">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your leadership requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

     
      <Footer />
    </div>
  )
}
