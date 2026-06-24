'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  Bus,
  MapPin,
  ArrowRight,
  Armchair,
  Clock,
  Search,
} from 'lucide-react'

export default function SearchPage() {
  const router = useRouter()

  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [schedules, setSchedules] = useState<any[]>([])

  const busImages = [
   '/images/bu1.jpg',
  '/images/bus2.jpg',
  '/images/bus3.jpg',
  '/images/bus4.jpg',
  '/images/bus5.jpg',
]

  

const handleSearch = async () => {
  try {
    console.log('Origin:', origin)
    console.log('Destination:', destination)

    if (!origin || !destination) {
      toast.error('Please enter departure and destination')
      return
    }

    setLoading(true)

    const url = `http://localhost:3001/api/schedules/search?origin=${origin}&destination=${destination}`

    console.log('Request URL:', url)

    const response = await fetch(url)

    console.log('Status:', response.status)

    const data = await response.json()

    console.log('API Response:', data)

    if (data.success) {
      setSchedules(data.data)

      if (data.data.length === 0) {
        toast('No buses found')
      }
    } else {
      toast.error(data.message || 'Search failed')
    }
  } catch (error) {
    console.error('SEARCH ERROR:', error)
    toast.error('Search failed')
  } finally {
    setLoading(false)
  }
}

  return (
  <div className="min-h-screen bg-[#F8FAFC]">

    {/* Hero */}
    <div className="max-w-7xl mx-auto px-4 pt-10">

      <div className="relative overflow-hidden rounded-[32px] h-[280px] mb-10">

        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600"
          alt="Bus Travel"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute inset-0 flex items-center px-10">
          <div>
            <h1 className="text-5xl font-bold text-white">
              Search Buses
            </h1>

            <p className="text-white/80 mt-3 text-lg">
              Find routes, compare schedules and reserve your seat instantly.
            </p>
          </div>
        </div>

      </div>

      {/* Search Box */}
      <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-slate-100">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Departure City"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="h-14 px-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />

          <input
            type="text"
            placeholder="Destination City"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="h-14 px-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="h-14 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <Search size={18} />

            {loading
              ? 'Searching...'
              : 'Search Buses'}
          </button>

        </div>

      </div>
    </div>

    {/* Results */}
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="bg-white rounded-2xl p-4 shadow-md flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-[#0F172A]">
          Available Buses
        </h2>

        <span className="text-[#0F766E] font-semibold">
          {schedules.length} buses found
        </span>

      </div>

      {schedules.length === 0 ? (

        <div className="bg-white rounded-[32px] p-16 text-center shadow-lg">

          <Bus
            size={60}
            className="mx-auto text-[#0F766E] mb-6"
          />

          <h3 className="text-2xl font-bold text-[#0F172A]">
            Search For Available Buses
          </h3>

          <p className="text-gray-500 mt-3">
            Enter departure and destination cities to begin your journey.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {schedules.map((schedule, index) => (

            <div
              key={schedule._id}
              className="bg-white rounded-[32px] border border-slate-100 shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >

              <div className="flex flex-col lg:flex-row gap-6 justify-between">

                {/* Bus Image */}
                <div className="lg:w-56 flex-shrink-0">

                 <img
                    src={busImages[index % busImages.length]}
                    alt={schedule.busId?.busName}
                    className="w-full h-40 object-cover rounded-2xl shadow-lg"
                  />

                </div>

                {/* Details */}
                <div className="flex-1">

                  <div className="flex items-center gap-3">

                    <Bus className="text-[#0F766E]" />

                    <h3 className="text-2xl font-bold text-[#0F172A]">
                      {schedule.busId?.busName}
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-1">
                    {schedule.busId?.busNumber}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-gray-700">

                    <MapPin size={16} />

                    {schedule.routeId?.origin}

                    <ArrowRight size={16} />

                    {schedule.routeId?.destination}

                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-[#0F766E]">

                    <Armchair size={16} />

                    {schedule.availableSeats} Seats Available

                  </div>

                </div>

                {/* Price */}
                <div className="lg:text-right">

                  <div className="flex items-center justify-end gap-2 text-gray-600">

                    <Clock size={16} />

                    {schedule.departureTime}

                    →

                    {schedule.arrivalTime}

                  </div>

                  <div className="bg-[#F8FAFC] rounded-2xl p-4 mt-4">

                    <p className="text-sm text-gray-500">
                      Starting From
                    </p>

                    <h3 className="text-3xl font-bold text-[#0F172A]">
                      Rs. {schedule.fare}
                    </h3>

                  </div>

                  <button
                    onClick={() =>
                      router.push(`/booking/${schedule._id}`)
                    }
                    className="mt-5 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-semibold hover:scale-105 transition-all"
                  >
                    View Seats
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