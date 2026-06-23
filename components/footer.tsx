'use client'

import Link from 'next/link'
import {
  Bus,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Globe,
  MessageCircle,
  Send
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="py-20 grid md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center shadow-xl border border-white/10">
                <Bus className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  BusLK
                </h2>
                <p className="text-gray-400">
                  Smart Transport Platform
                </p>
              </div>
            </div>

            <p className="text-gray-400 max-w-md leading-relaxed">
              Making bus travel smarter, faster and more reliable across
              Sri Lanka through modern booking technology and real-time
              transportation services.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-8">

              <button className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#0F766E] transition-all flex items-center justify-center">
                <Globe size={18} />
              </button>

              <button className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#0F766E] transition-all flex items-center justify-center">
                <MessageCircle size={18} />
              </button>

              <button className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#0F766E] transition-all flex items-center justify-center">
                <Send size={18} />
              </button>

            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              Product
            </h3>

            <div className="space-y-4 text-gray-400">
              <Link href="#features" className="block hover:text-white">
                Features
              </Link>

              <Link href="#how-it-works" className="block hover:text-white">
                How It Works
              </Link>

              <Link href="#testimonials" className="block hover:text-white">
                Reviews
              </Link>

              <Link href="/search" className="block hover:text-white">
                Search Buses
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              Support
            </h3>

            <div className="space-y-4 text-gray-400">
              <Link href="#" className="block hover:text-white">
                Help Center
              </Link>

              <Link href="#" className="block hover:text-white">
                Contact Us
              </Link>

              <Link href="#" className="block hover:text-white">
                Privacy Policy
              </Link>

              <Link href="#" className="block hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>

            <h3 className="font-bold text-lg mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="text-[#0F766E] mt-1"
                />
                <span>support@buslk.com</span>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="text-[#0F766E] mt-1"
                />
                <span>+94 11 234 5678</span>
              </div>

              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="text-[#0F766E] mt-1"
                />
                <span>Colombo, Sri Lanka</span>
              </div>

            </div>
          </div>

        </div>

        {/* Trust Bar */}
        <div className="border-t border-white/10 border-b border-white/10 py-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>
              <h4 className="text-3xl font-bold text-[#0F766E]">
                50K+
              </h4>
              <p className="text-gray-400">
                Registered Travelers
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-[#0F766E]">
                500+
              </h4>
              <p className="text-gray-400">
                Active Routes
              </p>
            </div>

            <div>
              <h4 className="text-3xl font-bold text-[#0F766E]">
                4.9★
              </h4>
              <p className="text-gray-400">
                Customer Rating
              </p>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-500 text-sm">
            © {currentYear} BusLK. All Rights Reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="flex items-center gap-2 text-[#0F766E] hover:text-white transition-colors"
          >
            Back To Top
            <ArrowUp size={18} />
          </button>

        </div>

      </div>
    </footer>
  )
}