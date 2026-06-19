'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Bus, MapPin, Clock, Users } from 'lucide-react'

export function Hero() {
  const router = useRouter()

  const handleBookNow = () => {
    const token = localStorage.getItem('token')

    if (token) {
      router.push('/search')
    } else {
      router.push('/register')
    }
  }

  const goToDashboard = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    router.push('/dashboard')
  }

  return (
    <section className="relative min-h-screen bg-[#F8FAFC] overflow-hidden pt-24">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0F172A]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          
          {/* LEFT SIDE */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAE2D6] text-[#0F172A] font-semibold text-sm mb-6">
              ✨ Sri Lanka's Smart Bus Platform
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-[#0F172A]">
              Travel Smarter
              <span className="block bg-gradient-to-r from-[#0F172A] to-[#0F766E] bg-clip-text text-transparent">
                Across Sri Lanka
              </span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              Search schedules, reserve seats instantly, track buses in
              real-time and enjoy a seamless travel experience with BusLK.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-[#0F172A]">500+</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Routes
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-[#0F172A]">50K+</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Travelers
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
                <h3 className="text-3xl font-bold text-[#0F172A]">99%</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Uptime
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={handleBookNow}
                className="group bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
              >
                Book Your Bus
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={goToDashboard}
                className="px-8 py-4 rounded-full border-2 border-[#0F172A] text-[#0F172A] font-semibold hover:bg-[#0F172A] hover:text-white transition-all duration-300"
              >
                Dashboard
              </button>

              <Link
                href="#how-it-works"
                className="px-8 py-4 rounded-full border-2 border-[#0F766E] text-[#0F766E] font-semibold hover:bg-[#0F766E] hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0F766E]/20 to-[#0F172A]/20 rounded-[40px] blur-3xl" />

            <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
              <Image
                src="/images/bus5.jpg"
                alt="Bus Travel"
                width={800}
                height={800}
                className="w-full h-[600px] object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent" />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">
                        Next Departure
                      </p>

                      <h3 className="text-2xl font-bold text-[#0F172A]">
                        Colombo → Kandy
                      </h3>

                      <p className="text-[#0F766E] font-medium">
                        Premium Express • 14:30
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center">
                      <Bus size={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Features */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
                <Clock className="text-[#0F766E] mb-2" />
                <h4 className="font-semibold text-[#0F172A]">
                  Real-Time Tracking
                </h4>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
                <Users className="text-[#0F766E] mb-2" />
                <h4 className="font-semibold text-[#0F172A]">
                  Live Seat Status
                </h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}