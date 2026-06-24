'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BookingPage({
  params,
}: {
  params: Promise<{ scheduleId: string }>
}) {
  const router = useRouter()
  const [schedule, setSchedule] = useState<any>(null)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [bookedSeats, setBookedSeats] = useState<string[]>([])
  const [passengerName, setPassengerName] = useState('')
    const [passengerEmail, setPassengerEmail] = useState('')
    const [passengerPhone, setPassengerPhone] = useState('')
    const [bookingLoading, setBookingLoading] = useState(false)
  useEffect(() => {
    const loadSchedule = async () => {
      const { scheduleId } = await params

      // Load Schedule
      const response = await fetch(
        `http://localhost:3001/api/schedules/${scheduleId}`
      )

      const data = await response.json()

      if (data.success) {
        setSchedule(data.data)
      }

      // Load Booked Seats
      const seatsResponse = await fetch(
        `http://localhost:3001/api/bookings/seats/${scheduleId}`
      )

      const seatsData = await seatsResponse.json()

      if (seatsData.success) {
        setBookedSeats(seatsData.bookedSeats)
      }
    }

    loadSchedule()
  }, [params])

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat)) return

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat)
      )
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  if (!schedule) {
    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

 const seatLayout = [
  'A1', 'A2', 'B1', 'B2',
  'A3', 'A4', 'B3', 'B4',
  'A5', 'A6', 'B5', 'B6',
  'A7', 'A8', 'B7', 'B8',
  'A9', 'A10', 'B9', 'B10',
  'A11', 'A12', 'B11', 'B12',
  'A13', 'A14', 'B13', 'B14',
  'A15', 'A16', 'B15', 'B16',
  'A17', 'A18', 'B17', 'B18',
  'A19', 'A20', 'B19', 'B20',
]
const goToPayment = () => {
  if (selectedSeats.length === 0) {
    alert('Please select seats')
    return
  }

  if (!passengerName || !passengerEmail || !passengerPhone) {
    alert('Please fill passenger details')
    return
  }

  localStorage.setItem(
    'bookingData',
    JSON.stringify({
      scheduleId: schedule._id,
      seatNumbers: selectedSeats,
      passengerName,
      passengerEmail,
      passengerPhone,
      totalPrice: selectedSeats.length * schedule.fare,
    })
  )

  router.push(`/payment/${schedule._id}`)
}
  return (
  <div className="min-h-screen bg-[#F8FAFC] pb-10">

    {/* Hero Banner */}
    <div className="max-w-7xl mx-auto px-4 pt-8">

      <div className="relative h-[320px] overflow-hidden rounded-[32px] shadow-2xl">

        <img
          src="/images/bu1.jpg"
          alt="Bus"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute bottom-0 left-0 p-10 text-white">

          <p className="uppercase tracking-[4px] text-white/70 text-sm">
            Premium Bus Service
          </p>

          <h1 className="text-5xl font-bold mt-2">
            {schedule.routeId?.origin}
            {' → '}
            {schedule.routeId?.destination}
          </h1>

          <div className="flex flex-wrap gap-6 mt-5">

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
              🚌 {schedule.busId?.busName}
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
              #{schedule.busId?.busNumber}
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl">
              Rs. {schedule.fare}
            </div>

          </div>

        </div>

      </div>

    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 mt-10">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Seat Selection */}
        <div className="lg:col-span-2 bg-white rounded-[32px] shadow-xl p-8">

          <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
            Select Your Seats
          </h2>

          <div className="flex flex-wrap gap-6 mb-8">

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-100 rounded" />
              Available
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#0F766E] rounded" />
              Selected
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-500 rounded" />
              Booked
            </div>

          </div>

          <div className="text-center mb-10">

            <div className="inline-block px-8 py-3 bg-[#0F172A] text-white rounded-2xl font-bold">
              DRIVER
            </div>

          </div>

          <div className="space-y-4">

            {Array.from({ length: 10 }).map((_, row) => {

              const seats = [
                seatLayout[row * 4],
                seatLayout[row * 4 + 1],
                seatLayout[row * 4 + 2],
                seatLayout[row * 4 + 3],
              ]

              return (
                <div
                  key={row}
                  className="grid grid-cols-5 gap-4"
                >

                  {seats.map((seat, index) => {

                    const isBooked =
                      bookedSeats.includes(seat)

                    const isSelected =
                      selectedSeats.includes(seat)

                    return (
                      <>
                        {index === 2 && <div />}

                        <button
                          key={seat}
                          disabled={isBooked}
                          onClick={() =>
                            toggleSeat(seat)
                          }
                          className={`
                            h-14 rounded-2xl font-semibold transition-all

                            ${
                              isBooked
                                ? 'bg-red-500 text-white'
                                : isSelected
                                ? 'bg-[#0F766E] text-white scale-105'
                                : 'bg-green-50 text-[#0F766E] hover:bg-[#0F766E] hover:text-white'
                            }
                          `}
                        >
                          {seat}
                        </button>
                      </>
                    )
                  })}

                </div>
              )
            })}

          </div>

        </div>

        {/* Booking Summary */}
        <div>

          <div className="bg-white rounded-[32px] shadow-xl p-8 sticky top-6">

            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
              Booking Summary
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Selected Seats
                </p>

                <p className="font-semibold">
                  {selectedSeats.length > 0
                    ? selectedSeats.join(', ')
                    : 'No seats selected'}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Total Seats
                </p>

                <p className="font-semibold">
                  {selectedSeats.length}
                </p>
              </div>

              <div className="border-t pt-4">

                <p className="text-gray-500 text-sm">
                  Total Amount
                </p>

                <h3 className="text-4xl font-bold text-[#0F766E]">
                  Rs.{' '}
                  {selectedSeats.length *
                    schedule.fare}
                </h3>

              </div>

            </div>

            <div className="mt-8">

              <h3 className="font-bold text-lg mb-4">
                Passenger Details
              </h3>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={passengerName}
                  onChange={(e) =>
                    setPassengerName(
                      e.target.value
                    )
                  }
                  className="w-full h-14 px-4 rounded-2xl border border-slate-200"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={passengerEmail}
                  onChange={(e) =>
                    setPassengerEmail(
                      e.target.value
                    )
                  }
                  className="w-full h-14 px-4 rounded-2xl border border-slate-200"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={passengerPhone}
                  onChange={(e) =>
                    setPassengerPhone(
                      e.target.value
                    )
                  }
                  className="w-full h-14 px-4 rounded-2xl border border-slate-200"
                />

              </div>

            </div>

            <button
              onClick={goToPayment}
              disabled={
                selectedSeats.length === 0 ||
                bookingLoading
              }
              className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-bold text-lg hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {bookingLoading
                ? 'Processing...'
                : 'Continue To Payment'}
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
)
}