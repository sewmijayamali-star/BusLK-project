'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MyTicketsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        'http://localhost:3001/api/bookings/my-bookings',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (data.success) {
        setBookings(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

 return (
  <div className="min-h-screen bg-[#F8FAFC]">

    {/* Hero */}
    <div className="max-w-7xl mx-auto px-4 pt-10">

      <div className="relative overflow-hidden rounded-[32px] h-[250px]">

        <img
          src="/images/bus4.jpg"
          alt="My Tickets"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute inset-0 flex items-center px-10">

          <div>

            <h1 className="text-5xl font-bold text-white">
              My Tickets
            </h1>

            <p className="text-white/80 mt-3 text-lg">
              Manage and view all your bus reservations.
            </p>

          </div>

        </div>

      </div>

    </div>

    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Summary */}
      <div className="bg-white rounded-[32px] shadow-lg border border-slate-100 p-6 mb-8 flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Ticket History
          </h2>

          <p className="text-gray-500">
            View all your booked journeys
          </p>

        </div>

        <div className="text-right">

          <p className="text-gray-500 text-sm">
            Total Tickets
          </p>

          <h3 className="text-3xl font-bold text-[#0F766E]">
            {bookings.length}
          </h3>

        </div>

      </div>

      {bookings.length === 0 ? (

        <div className="bg-white rounded-[32px] shadow-lg p-16 text-center">

          <div className="text-7xl mb-6">
            🎟️
          </div>

          <h2 className="text-3xl font-bold text-[#0F172A]">
            No Tickets Found
          </h2>

          <p className="text-gray-500 mt-4">
            You haven't booked any trips yet.
          </p>

          <button
            onClick={() => router.push('/search')}
            className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Search Buses
          </button>

        </div>

      ) : (

        <div className="space-y-6">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all"
            >

              <div className="grid lg:grid-cols-4 gap-6 p-8">

                {/* Bus Image */}
                <div>

                  <img
                    src="/images/bus5.jpg"
                    alt="Bus"
                    className="w-full h-48 object-cover rounded-3xl"
                  />

                </div>

                {/* Details */}
                <div className="lg:col-span-2">

                  <div className="flex items-center gap-3 mb-3">

                    <span className="text-3xl">
                      🚌
                    </span>

                    <h2 className="text-3xl font-bold text-[#0F172A]">
                      {booking.busId?.busName}
                    </h2>

                  </div>

                  <p className="text-gray-500 mb-5">
                    {booking.busId?.busNumber}
                  </p>

                  <div className="space-y-3 text-gray-700">

                    <p>
                      <strong>Seats:</strong>{' '}
                      {booking.seatNumbers?.join(', ')}
                    </p>

                    <p>
                      <strong>Booking ID:</strong>{' '}
                      {booking._id.slice(-8)}
                    </p>

                    <p>
                      <strong>Total Price:</strong>{' '}
                      Rs. {booking.totalPrice}
                    </p>

                  </div>

                </div>

                {/* Right Section */}
                <div className="flex flex-col justify-between items-end">

                  <div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      router.push(`/ticket/${booking._id}`)
                    }
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-semibold shadow-lg hover:scale-105 transition-all"
                  >
                    View Receipt
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
)
}