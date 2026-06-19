'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  Ticket,
  Bus,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (!token) {
      router.push('/login')
      return
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    loadBookings()
  }, [router])

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

    
    <div className="max-w-7xl mx-auto px-4 pt-8">

      <div className="relative h-[300px] rounded-[32px] overflow-hidden shadow-2xl">

        <img
          src="/images/bus2.jpg"
          alt="Dashboard"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute inset-0 flex items-center px-10">

          <div className="text-white">

            <h1 className="text-5xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-4 text-xl text-white/80">
              Manage bookings, tickets and travel plans.
            </p>

          </div>

        </div>

      </div>

    </div>

    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-[28px] p-6 shadow-xl">

          <p className="text-gray-500">
            Total Bookings
          </p>

          <h2 className="text-4xl font-bold text-[#0F172A] mt-2">
            {bookings.length}
          </h2>

        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-xl">

          <p className="text-gray-500">
            Upcoming Trips
          </p>

          <h2 className="text-4xl font-bold text-[#0F766E] mt-2">
            {bookings.length}
          </h2>

        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-xl">

          <p className="text-gray-500">
            BusLK Member
          </p>

          <h2 className="text-4xl font-bold text-[#0F172A] mt-2">
            ⭐
          </h2>

        </div>

      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Profile */}
        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)}
            </div>

            <div>

              <h2 className="font-bold text-xl">
                {user?.name}
              </h2>

              <p className="text-gray-500">
                BusLK Traveler
              </p>

            </div>

          </div>

          <div className="space-y-3">

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>Phone:</strong>{' '}
              {user?.phone || 'Not Added'}
            </p>

          </div>

        </div>

        {/* Tickets */}
        <div
          onClick={() => router.push('/my-tickets')}
          className="bg-white rounded-[32px] shadow-xl p-8 cursor-pointer hover:scale-[1.02] transition-all"
        >

          <Ticket
            size={40}
            className="text-[#0F766E] mb-4"
          />

          <h2 className="text-2xl font-bold">
            My Tickets
          </h2>

          <p className="text-gray-500 mt-2">
            {bookings.length} Booking(s)
          </p>

        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <Bus
            size={40}
            className="text-[#0F766E] mb-4"
          />

          <h2 className="text-2xl font-bold">
            Upcoming Trips
          </h2>

          <p className="text-gray-500 mt-2">
            {bookings.length} Trip(s)
          </p>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          
          <Link
            href="/search"
            className="bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white rounded-[28px] p-8 shadow-xl hover:scale-[1.02] transition-all"
          >
            <h3 className="text-2xl font-bold">
              Search Buses
            </h3>

            <p className="mt-2 text-white/80">
              Find your next journey
            </p>

          </Link>

          <Link
            href="/my-tickets"
            className="bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white rounded-[28px] p-8 shadow-xl hover:scale-[1.02] transition-all"
          >
            <h3 className="text-2xl font-bold">
              My Tickets
            </h3>

            <p className="mt-2 text-white/80">
              See your bookings and tickets
            </p>

          </Link>

          <Link
            href="/profile/setup"
            className="bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white rounded-[28px] p-8 shadow-xl hover:scale-[1.02] transition-all"
          >

            <h3 className="text-2xl font-bold">
              Edit Profile
            </h3>

            <p className="text-gray-500 mt-2">
              Manage account settings
            </p>

          </Link>

        </div>

      </div>

      {/* Recent Bookings */}
      <div className="mt-12 bg-white rounded-[32px] p-8 shadow-xl">

        <h2 className="text-3xl font-bold mb-6">
          Recent Bookings
        </h2>

        {bookings.length === 0 ? (

          <p className="text-gray-500">
            No bookings found
          </p>

        ) : (

          <div className="space-y-4">

            {bookings.slice(0, 3).map((booking) => (

              <div
                key={booking._id}
                className="border rounded-2xl p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">
                    {booking.busId?.busName}
                  </h3>

                  <p className="text-gray-500">
                    {booking.busId?.busNumber}
                  </p>

                </div>

                <span className="text-[#0F766E] font-semibold">
                  Active
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>
)
  
}