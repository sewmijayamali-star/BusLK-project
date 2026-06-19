'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  UserPlus,
  Search,
  CreditCard,
  Ticket
} from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description:
      'Register securely with your email and mobile number.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: Search,
    title: 'Search & Select',
    description:
      'Choose your route, schedule and preferred seat.',
    image:
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description:
      'Complete your booking using trusted payment methods.',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    icon: Ticket,
    title: 'Travel With QR Ticket',
    description:
      'Receive your ticket instantly and board without paper.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  },
]

export function HowItWorks() {
  const router = useRouter()

  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#0F766E]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#0F172A]/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-[#EAE2D6] text-[#0F172A] font-semibold text-sm mb-5">
            HOW IT WORKS
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            Book Your Journey
            <span className="block text-[#0F766E]">
              In Four Easy Steps
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From registration to boarding, BusLK makes every step simple,
            secure and convenient.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-10">

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`${
                    index % 2 !== 0
                      ? 'lg:order-2'
                      : ''
                  }`}
                >
                  <div className="relative h-[320px] rounded-[32px] overflow-hidden shadow-2xl">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`${
                    index % 2 !== 0
                      ? 'lg:order-1'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center">
                      <Icon className="text-white" />
                    </div>

                    <span className="text-5xl font-bold text-[#EAE2D6]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-[#0F172A] mb-4">
                    {step.title}
                  </h3>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-24">
          <div className="rounded-[40px] bg-gradient-to-r from-[#0F172A] to-[#0F766E] p-12 lg:p-16 text-center text-white shadow-2xl">

            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready To Start Your Next Journey?
            </h3>

            <p className="max-w-2xl mx-auto text-white/80 mb-8">
              Search routes, reserve seats and travel across Sri Lanka
              with BusLK.
            </p>

            <button
              onClick={() => router.push('/search')}
              className="bg-white text-[#0F172A] px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300"
            >
              Book Your Bus Now
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}