'use client'

import { use } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'

export default function TicketPage({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  const router = useRouter()
  const { bookingId } = use(params)

const downloadTicket = () => {
  const pdf = new jsPDF()

  pdf.setFontSize(22)
  pdf.text('BusLK Payment Receipt', 20, 20)

  pdf.setFontSize(12)
  pdf.text(`Booking ID: ${bookingId}`, 20, 40)

  pdf.text('Payment Status: Successful', 20, 55)

  pdf.text(
    'Please show this receipt and QR code when boarding.',
    20,
    70
  )

  const qrCanvas = document.getElementById(
    'ticketQR'
  ) as HTMLCanvasElement

  if (qrCanvas) {
    const qrImage = qrCanvas.toDataURL('image/png')

    pdf.addImage(
      qrImage,
      'PNG',
      70,
      90,
      70,
      70
    )
  }

  pdf.text(
    'Thank you for choosing BusLK.',
    20,
    180
  )

  pdf.save(`BusLK-Ticket-${bookingId}.pdf`)
}
 return (
  <div className="min-h-screen bg-[#F8FAFC]">

    {/* Hero */}
    <div className="max-w-7xl mx-auto px-4 pt-10">

      <div className="relative overflow-hidden rounded-[32px] h-[220px]">

        <img
          src="/images/bus5.jpg"
          alt="Ticket"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute inset-0 flex items-center px-10">

          <div>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500 text-white font-semibold mb-4">
              ✓ Payment Successful
            </div>

            <h1 className="text-5xl font-bold text-white">
              Your Ticket is Ready
            </h1>

            <p className="text-white/80 mt-3 text-lg">
              Show this ticket when boarding the bus.
            </p>

          </div>

        </div>

      </div>

    </div>

    <div className="max-w-5xl mx-auto px-4 py-10">

      <div
        id="ticket"
        className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden"
      >

        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#0F766E] p-8 text-white">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <div>

              <h2 className="text-3xl font-bold">
                BusLK E-Ticket
              </h2>

              <p className="text-white/80 mt-2">
                Secure Digital Boarding Pass
              </p>

            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-3">

              <p className="text-sm text-white/70">
                Booking ID
              </p>

              <h3 className="font-bold text-lg">
                #{bookingId.slice(-8)}
              </h3>

            </div>

          </div>

        </div>

        {/* Main Content */}
        <div className="p-8">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Left Side */}
            <div>

              <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
                Ticket Information
              </h3>

              <div className="space-y-5">

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Booking Status
                  </span>

                  <span className="font-semibold text-green-600">
                    Confirmed
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Payment Status
                  </span>

                  <span className="font-semibold text-green-600">
                    Paid
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">
                    Ticket Number
                  </span>

                  <span className="font-semibold">
                    {bookingId}
                  </span>
                </div>

              </div>

              <div className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-200">

                <h4 className="font-bold text-green-700 mb-2">
                  Boarding Instructions
                </h4>

                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Arrive 15 minutes before departure</li>
                  <li>• Keep this QR code ready</li>
                  <li>• Carry your NIC or ID card</li>
                </ul>

              </div>

            </div>

            {/* QR Section */}
            <div className="flex flex-col items-center justify-center">

              <div className="bg-[#F8FAFC] rounded-3xl p-8 shadow-inner">

                <QRCodeCanvas
                  id="ticketQR"
                  value={bookingId}
                  size={220}
                />

              </div>

              <p className="mt-6 text-center text-gray-600 font-medium">
                Scan this QR code when boarding
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 p-8">

          <div className="flex flex-col md:flex-row gap-4 justify-center">

            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 rounded-2xl border border-slate-200 font-semibold text-[#0F172A] hover:bg-slate-100 transition-all"
            >
              Back to Home
            </button>

            <button
              onClick={downloadTicket}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
            >
              Download PDF Ticket
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
)
}