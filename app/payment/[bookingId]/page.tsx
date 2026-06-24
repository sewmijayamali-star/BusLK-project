'use client'

import toast from 'react-hot-toast'

import { use } from 'react'
import { useRouter } from 'next/navigation'

export default function PaymentPage({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  const { bookingId } = use(params)

  const router = useRouter()

 const handlePayment = () => {
  toast.success('🎉 Payment Successful! Your ticket is ready.', {
    duration: 3000,
  })

  setTimeout(() => {
    router.push(`/ticket/${bookingId}`)
  }, 1500)
}

 return (
  <div className="min-h-screen bg-[#F8FAFC]">

    {/* Hero */}
    <div className="max-w-7xl mx-auto px-4 pt-10">

      <div className="relative overflow-hidden rounded-[32px] h-[240px]">

        <img
          src="/images/bus5.jpg"
          alt="Payment"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute inset-0 flex items-center px-10">

          <div>

            <h1 className="text-5xl font-bold text-white">
              Secure Payment
            </h1>

            <p className="text-white/80 mt-3 text-lg">
              Complete your booking and receive your ticket instantly.
            </p>

          </div>

        </div>

      </div>

    </div>

    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Payment Form */}
        <div className="lg:col-span-2 bg-white rounded-[32px] shadow-xl border border-slate-100 p-8">

          <h2 className="text-3xl font-bold text-[#0F172A] mb-8">
            Card Details
          </h2>

          <div className="space-y-5">

            <div>
              <label className="block mb-2 font-semibold text-[#0F172A]">
                Card Number
              </label>

              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#0F172A]">
                Card Holder Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block mb-2 font-semibold text-[#0F172A]">
                  Expiry Date
                </label>

                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#0F172A]">
                  CVV
                </label>

                <input
                  type="password"
                  placeholder="***"
                  className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>

            </div>

          </div>

        </div>

        {/* Summary */}
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 h-fit">

          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
            Booking Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Booking ID
              </span>

              <span className="font-semibold text-[#0F172A]">
                #{bookingId.slice(-8)}
              </span>

            </div>

            <div className="border-t pt-4">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Payment Status
                </span>

                <span className="text-green-600 font-semibold">
                  Pending
                </span>

              </div>

            </div>

            <div className="border-t pt-4">

              <div className="flex justify-between items-center">

                <span className="font-semibold text-[#0F172A]">
                  Total Amount
                </span>

                <span className="text-3xl font-bold text-[#0F766E]">
                  Rs. ----
                </span>

              </div>

            </div>

          </div>

          <button
            onClick={handlePayment}
            className="w-full h-14 mt-8 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-all"
          >
            Pay Now
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            🔒 Protected by Secure Payment Encryption
          </div>

        </div>

      </div>

    </div>

  </div>
)
}