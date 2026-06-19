'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Bus,
  Ticket,
  MapPinned
} from 'lucide-react'

export function CTASection() {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Main CTA */}
        <div className="relative overflow-hidden rounded-[40px] shadow-2xl">

          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/bus4.jpg"
              alt="Travel"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 to-[#0F766E]/90" />
          </div>

          <div className="relative z-10 p-10 lg:p-20 text-white">

            <div className="max-w-3xl mx-auto text-center">

              <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold mb-6">
                START YOUR JOURNEY TODAY
              </span>

              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Smart Travel Begins
                <span className="block text-[#EAE2D6]">
                  With BusLK
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                Book buses, reserve seats, track routes and travel
                across Sri Lanka with confidence.
              </p>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 mb-10">

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  ✓ First Booking Discount
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  ✓ No Hidden Charges
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  ✓ 24/7 Support
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="#features"
                  className="inline-flex items-center justify-center border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  Explore Features
                </Link>

              </div>

              <div className="mt-10 text-white/70 text-sm">
                Trusted by 50,000+ travelers across Sri Lanka
              </div>

            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-white rounded-[28px] p-8 shadow-lg hover:shadow-2xl transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center mb-5">
              <Bus className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-[#0F172A] mb-3">
              500+ Routes
            </h3>

            <p className="text-gray-600">
              Extensive route coverage connecting major cities and towns.
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-8 shadow-lg hover:shadow-2xl transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center mb-5">
              <MapPinned className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-[#0F172A] mb-3">
              Live Tracking
            </h3>

            <p className="text-gray-600">
              Follow your bus location and arrival times in real-time.
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-8 shadow-lg hover:shadow-2xl transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center mb-5">
              <Ticket className="text-white" />
            </div>

            <h3 className="text-xl font-bold text-[#0F172A] mb-3">
              Digital Tickets
            </h3>

            <p className="text-gray-600">
              QR-based tickets for fast, secure and paperless travel.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}