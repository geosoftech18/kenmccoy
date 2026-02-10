"use client"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-10 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <div className="w-32 h-12 sm:w-36 sm:h-14 md:w-40 md:h-16 ">
                <img
                  src="/logo.jpg?height=64&width=160"
                  alt="Kenmccoy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className="relative px-4 py-2 text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/About" 
              className="relative px-4 py-2 text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/Services" 
              className="relative px-4 py-2 text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="https://www.linkedin.com/in/kenmccoyconsulting" target="_blank" 
              className="relative px-4 py-2 text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              News & Media
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className="relative px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200  group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/Contact" 
              className="relative px-4 py-2 font-medium text-lg text-gray-700 hover:text-blue-600 transition-colors duration-200  group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="h-12 w-12 rounded-lg hover:bg-gray-100 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <div className={`transition-all duration-300 ${isMobileMenuOpen ? "rotate-180" : "rotate-0"}`}>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4 pb-4" : "max-h-0 opacity-0 mt-0 pb-0"
          }`}
        >
          <div
            className={`border-t border-gray-200 bg-white/95 backdrop-blur-sm rounded-b-lg shadow-lg transform transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
            }`}
          >
            <nav className="flex flex-col space-y-1 pt-4 px-4">
              <Link 
                href="/" 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/About" 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/Services" 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="https://www.linkedin.com/in/kenmccoyconsulting" target="_blank" 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News & Media
              </Link>
              <Link 
                href="/blog" 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/Contact" 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
