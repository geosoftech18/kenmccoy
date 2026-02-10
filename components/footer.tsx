"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Send, Globe, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#35363A] text-white" >
      {/* Main Footer Content */}
      <div className="container mx-auto px-8 pt-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="group">
              <div className="w-44 h-20 mb-4">
                <img
                  src="/footer-logo.jpeg?height=64&width=160"
                  alt="Kenmccoy Logo"
                  className="w-full h-full object-contain filter  "
                />
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Ken McCoy Leadership Advisory delivers exceptional leadership solutions worldwide,
              connecting top-tier talent with forward-thinking organizations.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              
              <span></span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-200 group flex items-center gap-2"
              >
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                Home
              </Link>
              <Link
                href="/About"
                className="text-gray-300 hover:text-white transition-colors duration-200 group flex items-center gap-2"
              >
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                About Us
              </Link>
              <Link
                href="/Services"
                className="text-gray-300 hover:text-white transition-colors duration-200 group flex items-center gap-2"
              >
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                Services
              </Link>
              <Link
                href="https://www.linkedin.com/in/kenmccoyconsulting" target="_blank" 
                className="text-gray-300 hover:text-white transition-colors duration-200 group flex items-center gap-2"
              >
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                News & Media
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors duration-200 group flex items-center gap-2"
              >
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                Blog
              </Link>
           
              <Link
                href="/Contact"
                className="text-gray-300 hover:text-white transition-colors duration-200 group flex items-center gap-2"
              >
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                Contact
              </Link>
           
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors duration-200">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ken McCoy Consulting<br/>
                    B-201, Hind Saurashtra Estate<br/>
                    Opposite Wellington Park<br/>
                    Andheri-Kurla Road<br/>
                    Near Marol Metro Station<br/>
                    Marol, Andheri (East)<br/>
                    Mumbai 400059. India

                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600/30 transition-colors duration-200">
                  <Phone size={16} className="text-green-400" />
                </div>
                <a
                  href="tel:+91-22-42959123"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +91-22-42959123
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600/30 transition-colors duration-200">
                  <Mail size={16} className="text-purple-400" />
                </div>
                <a
                  href="mailto:info@kenmccoy.in"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  info@kenmccoy.in
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Stay Connected</h3>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Subscribe to our newsletter for leadership insights</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-green-400 text-sm">Thank you for subscribing!</p>
                )}
              </form>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">Follow us on social media</p>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/kenmccoyconsulting"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label="Twitter"
                >
                  <Twitter size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label="Facebook"
                >
                  <Facebook size={18} className="text-gray-300 group-hover:text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <Clock size={16} className="text-orange-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Business Hours</h4>
                <p className="text-gray-300 text-sm">
                  Mon-Fri: 9:00 AM - 6:00 PM IST | Sat: 10:00 AM - 2:00 PM IST | Sun: Closed
                </p>
              </div>
            </div>

        
          </div>
        </div>
        <div className="mt-10 mb-4">
          <p className="text-gray-300 text-sm">Legal and Ownership Note - The Group Structure: <br />
          The Ken McCoy Consulting umbrella includes - Jobtune, a brand used for online assessment and development; Manrich HR Services, a proprietary concern providing HR consulting services.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 ">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
            All rights reserved © {currentYear} Ken McCoy Consulting. 
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              {/* <Link href="/#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link> */}
              <Link href="/#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
