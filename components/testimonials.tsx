'use client'

import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Aisha Perera',
    role: 'Daily Commuter',
    location: 'Colombo',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
    text:
      'BusLK completely changed the way I travel. Real-time bus tracking saves me so much time every day.',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Frequent Traveler',
    location: 'Kandy',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
    text:
      'The booking experience is incredibly smooth. Finding buses and reserving seats takes less than a minute.',
  },
  {
    name: 'Melissa Chen',
    role: 'Business Professional',
    location: 'Galle',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop',
    text:
      'Digital QR tickets are fantastic. I never worry about losing tickets anymore.',
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F172A]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-[#EAE2D6] text-[#0F172A] font-semibold text-sm mb-5">
            TRUSTED BY TRAVELERS
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            What Our Customers Say
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Thousands of travelers across Sri Lanka trust BusLK for
            comfortable, reliable and smart transportation.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <Quote
                className="text-[#0F766E] mb-6"
                size={40}
              />

              <div className="flex mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                "{item.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-[#0F172A]">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>

                  <p className="text-sm text-[#0F766E] font-medium">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="rounded-[40px] bg-gradient-to-r from-[#0F172A] to-[#0F766E] p-12 lg:p-16 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-10 text-center text-white">

            <div>
              <h3 className="text-5xl font-bold mb-2">
                50K+
              </h3>
              <p className="text-white/80">
                Happy Travelers
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold mb-2">
                4.9★
              </h3>
              <p className="text-white/80">
                Customer Rating
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold mb-2">
                10M+
              </h3>
              <p className="text-white/80">
                Trips Completed
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}