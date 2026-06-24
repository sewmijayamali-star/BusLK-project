'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, User, Mail, Phone, Lock, Check, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      setStep(step + 1)
    } else {
      handleRegister(e)
    }
  }

  const handleRegister = async (
  e: React.FormEvent
) => {
  e.preventDefault()

  console.log({
    name,
    email,
    phone,
    password,
    confirmPassword,
  })

  if (password !== confirmPassword) {
    alert('Passwords do not match')
    return
  }

  try {
    setIsLoading(true)

    const response = await fetch(
      'http://localhost:3001/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      }
    )

    const data = await response.json()

    console.log('REGISTER RESPONSE:', data)

    if (data.success) {
      localStorage.setItem('token', data.token)

      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      alert('Registration Successful 🎉')

      window.location.href =
        '/profile/setup'
    } else {
      alert(data.message)
    }
  } catch (error) {
    console.error('REGISTER ERROR:', error)
    alert('Server Error')
  } finally {
    setIsLoading(false)
  }
}
return (
  <div className="min-h-screen bg-[#F8FAFC]">

    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 pt-10">

      <div className="relative overflow-hidden rounded-[32px] h-[280px]">

        <img
          src="/images/bus5.jpg"
          alt="Bus Travel"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute inset-0 flex items-center px-10">

          <div>

            <h1 className="text-5xl font-bold text-white">
              Create Your Account
            </h1>

            <p className="text-white/80 mt-4 text-lg max-w-xl">
              Join Sri Lanka's modern bus booking platform and
              enjoy seamless travel experiences.
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* Features */}
    <div className="max-w-7xl mx-auto px-4 mt-8">

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-[28px] p-6 shadow-lg">
          <div className="text-4xl mb-3">🚌</div>
          <h3 className="font-bold text-[#0F172A] text-xl">
            Smart Booking
          </h3>
          <p className="text-gray-500 mt-2">
            Book seats in seconds with real-time availability.
          </p>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-lg">
          <div className="text-4xl mb-3">🎟️</div>
          <h3 className="font-bold text-[#0F172A] text-xl">
            Digital Tickets
          </h3>
          <p className="text-gray-500 mt-2">
            Receive QR tickets instantly after booking.
          </p>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-lg">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold text-[#0F172A] text-xl">
            Secure Platform
          </h3>
          <p className="text-gray-500 mt-2">
            Your information and payments stay protected.
          </p>
        </div>

      </div>

    </div>

    {/* Register Form */}
    <div className="max-w-3xl mx-auto px-4 py-10">

      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-10">

        <div className="text-center mb-10">

          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center shadow-xl">

            <span className="text-white text-3xl font-bold">
              B
            </span>

          </div>

          <h2 className="text-4xl font-bold text-[#0F172A] mt-5">
            Register
          </h2>

          <p className="text-gray-500 mt-2">
            Create your BusLK account
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div>

            <label className="block font-semibold mb-2 text-[#0F172A]">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
            />

          </div>

          <div>

            <label className="block font-semibold mb-2 text-[#0F172A]">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
            />

          </div>

         

            <label className="block font-semibold mb-2 text-[#0F172A]">
              Phone Number
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XXXXXXXX"
              className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
            />

          <div>
  <label className="block font-semibold mb-2 text-[#0F172A]">
    Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter password"
      className="w-full h-14 px-5 pr-14 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0F766E]"
    >
      {showPassword ? (
        <EyeOff size={22} />
      ) : (
        <Eye size={22} />
      )}
    </button>

  </div>

  <div>
  <label className="block font-semibold mb-2 text-[#0F172A]">
    Confirm Password
  </label>

  <div className="relative">

    <input
      type={showPassword ? 'text' : 'password'}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm password"
      className="w-full h-14 px-5 pr-14 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0F766E]"
    >
      {showPassword ? (
        <EyeOff size={22} />
      ) : (
        <Eye size={22} />
      )}
    </button>

  </div>
</div>
</div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition-all"
          >

            {isLoading
              ? 'Creating Account...'
              : 'Create Account'}

          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-gray-600">

            Already have an account?

            <Link
              href="/login"
              className="ml-2 text-[#0F766E] font-bold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  </div>
)
}