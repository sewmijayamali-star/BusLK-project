
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProfileSetupPage() {
     const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    emergencyContact: '',
    address: '',
    city: '',
  })
  useEffect(() => {
  const token = localStorage.getItem('token')

  if (!token) {
    router.push('/login')
    return
  }

  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    const user = JSON.parse(storedUser)

    setFormData((prev) => ({
      ...prev,
      name: user.name || '',
      phone: user.phone || '',
    }))
  }
}, [router])

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault()

  try {
    setIsLoading(true)

    const token = localStorage.getItem('token')

    const response = await fetch(
      'http://localhost:3001/api/auth/profile',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    )

    const data = await response.json()

    if (data.success) {
      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      )

      toast.success('Profile Updated Successfully 🎉')

      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to update profile')
  } finally {
    setIsLoading(false)
  }
}

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
  <div className="min-h-screen bg-[#F8FAFC]">

    {/* Hero */}
    <div className="max-w-7xl mx-auto px-4 pt-10">

      <div className="relative overflow-hidden rounded-[32px] h-[260px]">

        <img
          src="/images/bus5.jpg"
          alt="Profile Setup"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute inset-0 flex items-center px-10">

          <div>

            <h1 className="text-5xl font-bold text-white">
              Complete Your Profile
            </h1>

            <p className="text-white/80 mt-4 text-lg max-w-2xl">
              Help us personalize your travel experience and
              make future bookings faster and more secure.
            </p>

          </div>

        </div>

      </div>

    </div>

    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Progress Card */}
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 mb-8">

        <div className="flex justify-between mb-3">

          <h3 className="font-bold text-[#0F172A]">
            Profile Completion
          </h3>

          <span className="font-bold text-[#0F766E]">
            40%
          </span>

        </div>

        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">

          <div className="h-full w-[40%] bg-gradient-to-r from-[#0F172A] to-[#0F766E]" />

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Personal Information */}
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8">

          <h2 className="text-2xl font-bold text-[#0F172A] mb-8">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold text-[#0F172A] mb-2 block">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#0F172A] mb-2 block">
                NIC Number
              </label>

              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#0F172A] mb-2 block">
                Date of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#0F172A] mb-2 block">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>
            </div>

          </div>

        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8">

          <h2 className="text-2xl font-bold text-[#0F172A] mb-8">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold text-[#0F172A] mb-2 block">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#0F172A] mb-2 block">
                Emergency Contact
              </label>

              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">

              <label className="font-semibold text-[#0F172A] mb-2 block">
                Address
              </label>

              <textarea
                rows={4}
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              />

            </div>

            <div className="md:col-span-2">

              <label className="font-semibold text-[#0F172A] mb-2 block">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
              />

            </div>

          </div>

        </div>

        {/* Save Button */}
        <div className="text-center">

          <button
            type="submit"
            disabled={isLoading}
            className="h-14 px-12 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-bold text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-60"
          >

            {isLoading
              ? 'Saving Profile...'
              : 'Save Profile'}

          </button>

        </div>

      </form>

    </div>

  </div>
)
}