'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Bus } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl px-6">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center shadow-lg">
                <Bus className="text-white w-6 h-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#0F172A]">
                  BusLK
                </h1>
                <p className="text-xs text-gray-500">
                  Smart Transport
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="#features"
                className="font-medium text-gray-700 hover:text-[#0F766E] transition-colors"
              >
                Features
              </Link>

              <Link
                href="#how-it-works"
                className="font-medium text-gray-700 hover:text-[#0F766E] transition-colors"
              >
                How It Works
              </Link>

              <Link
                href="#testimonials"
                className="font-medium text-gray-700 hover:text-[#0F766E] transition-colors"
              >
                Reviews
              </Link>

              <Link
                href="#contact"
                className="font-medium text-gray-700 hover:text-[#0F766E] transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <>
                  <div className="px-4 py-2 rounded-full bg-[#F5F0E8] border border-[#EAE2D6]">
                    <span className="font-medium text-[#0F172A]">
                      Hi, {user.name}
                    </span>
                  </div>

                  <Link
                    href="/profile/setup"
                    className="px-5 py-2.5 rounded-full border border-[#0F766E] text-[#0F766E] font-medium hover:bg-[#0F766E] hover:text-white transition-all"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-semibold text-gray-700 hover:text-[#0F766E]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-semibold shadow-lg hover:scale-105 transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0F172A]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-100 py-6 space-y-4">

              <Link
                href="#features"
                className="block font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>

              <Link
                href="#how-it-works"
                className="block font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>

              <Link
                href="#testimonials"
                className="block font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>

              <Link
                href="#contact"
                className="block font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      href="/profile/setup"
                      className="text-center py-3 rounded-full border border-[#0F766E]"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="py-3 rounded-full bg-red-500 text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-center py-3 rounded-full border border-[#0F172A]"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="text-center py-3 rounded-full bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </nav>
  )
}