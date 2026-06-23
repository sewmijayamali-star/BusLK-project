'use client'
import { useRouter } from 'next/navigation'



import Image from 'next/image'
import {
  Search,
  MapPin,
  Zap,
  QrCode,
  BarChart3,
  Shield,
  Link,
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description:
      'Find buses instantly using routes, schedules, locations and travel preferences.',
    image:
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: MapPin,
    title: 'Live Tracking',
    description:
      'Track buses in real-time and know exactly when your bus arrives.',
    image:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description:
      'Reserve your seat within seconds and receive immediate confirmation.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: QrCode,
    title: 'Digital Tickets',
    description:
      'Use QR-based tickets and enjoy a completely paperless journey.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: BarChart3,
    title: 'Live Seat Availability',
    description:
      'Choose seats visually and view real-time seat availability.',
    image:
      'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description:
      'Protected payments and secure booking experience for every traveler.',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop',
  },
]

export function Features() {

  const router = useRouter()
  return (
    <section
      id="features"
      className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Background Blur */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0F172A]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-[#EAE2D6] text-[#0F172A] font-semibold text-sm mb-5">
            PREMIUM FEATURES
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            Everything You Need For
            <span className="block text-[#0F766E]">
              Smart Bus Travel
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            BusLK combines modern technology with reliable transportation
            to deliver a seamless travel experience across Sri Lanka.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="group bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#0F766E]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#0F172A] to-[#0F766E] group-hover:w-28 transition-all duration-500" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-24">
          <div className="rounded-[36px] bg-gradient-to-r from-[#0F172A] to-[#0F766E] p-10 lg:p-14 text-center text-white shadow-2xl">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Travel Across Sri Lanka With Confidence
            </h3>

            <p className="max-w-2xl mx-auto text-white/80 mb-8">
              Join thousands of passengers using BusLK every day for
              reliable, secure and comfortable travel.
            </p>

            <button
            onClick={() => router.push('/register')}
            className="bg-white text-[#0F172A] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Your Journey
          </button>
          </div>
        </div>
      </div>
    </section>
  )
}