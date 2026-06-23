'use client'
import toast from 'react-hot-toast';
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    setIsLoading(true)

    const response = await fetch(
      'http://localhost:3001/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (data.success) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

     toast.success('Login Successful 🎉') 

     if (!data.user.profileCompleted) {
  window.location.href = '/profile/setup'
} else {
  window.location.href = '/dashboard'
}
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.error(error)
    toast.error('Server Error')
  } finally {
    setIsLoading(false)
  }
}

 return (
  <div className="min-h-screen bg-[#F8FAFC]">

    <div className="flex min-h-screen">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative">

        <img
          src="/images/bus2.jpg"
          alt="Bus Travel"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F766E]/70" />

        <div className="absolute bottom-20 left-16 text-white max-w-xl">

          <p className="uppercase tracking-[4px] text-white/70 mb-4">
            BusLK Smart Transport
          </p>

          <h1 className="text-6xl font-bold leading-tight">
            Smart Travel
            <br />
            Starts Here
          </h1>

          <p className="mt-6 text-xl text-white/80 leading-relaxed">
            Book buses, reserve seats, track journeys,
            and travel smarter across Sri Lanka with
            BusLK.
          </p>

          <div className="flex gap-8 mt-10">

            <div>
              <h3 className="text-4xl font-bold">
                500+
              </h3>
              <p className="text-white/70">
                Routes
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                50K+
              </h3>
              <p className="text-white/70">
                Travelers
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">
                99%
              </h3>
              <p className="text-white/70">
                Reliability
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-10">

            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-6"
            >

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] flex items-center justify-center shadow-xl">

                <span className="text-white text-2xl font-bold">
                  B
                </span>

              </div>

              <div className="text-left">

                <h2 className="font-bold text-2xl text-[#0F172A]">
                  BusLK
                </h2>

                <p className="text-sm text-gray-500">
                  Smart Transport
                </p>

              </div>

            </Link>

            <h1 className="text-4xl font-bold text-[#0F172A]">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-3">
              Sign in to continue your journey
            </p>

          </div>

          {/* Login Card */}
          <div className="bg-white rounded-[32px] shadow-2xl p-8">

            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >

              {/* Email */}
              <div>

                <label className="block text-sm font-semibold mb-2 text-[#0F172A]">
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    required
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-semibold mb-2 text-[#0F172A]">
                  Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    required
                    className="w-full h-14 pl-12 pr-12 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#0F766E] focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Remember */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-gray-600">

                  <input
                    type="checkbox"
                    defaultChecked
                  />

                  Remember Me

                </label>

                <button
                  type="button"
                  className="text-[#0F766E] font-semibold text-sm"
                >
                  Forgot Password?
                </button>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#0F766E] text-white font-bold text-lg hover:scale-[1.02] transition-all shadow-xl"
              >

                {isLoading ? (
                  'Signing In...'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight size={18} />
                  </span>
                )}

              </button>

            </form>

            <div className="text-center mt-8 text-gray-500 text-sm">
              Secure Login • Encrypted Connection
            </div>

          </div>

          {/* Register */}
          <div className="text-center mt-8">

            <p className="text-gray-600">

              Don't have an account?{' '}

              <Link
                href="/register"
                className="text-[#0F766E] font-bold"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
)
}