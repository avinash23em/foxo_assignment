import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { loginUser } from '../api/authApi'
import toast from 'react-hot-toast'
import { LuLock, LuUser, LuLoaderCircle } from 'react-icons/lu'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/products'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setApiError('')
    try {
      const response = await loginUser(data.username, data.password)
      const token = response.accessToken || response.token
      
      if (!token) {
        throw new Error('Authentication succeeded but no token was returned.')
      }

      login(response, token)
      
      toast.success(`Welcome back, ${response.firstName || response.username}!`, {
        icon: '👋',
      })
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Login error:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Login failed. Please check your credentials.'
      setApiError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50 to-slate-100/50 pointer-events-none z-0"></div>
      
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            ShopLite
          </h1>
          <p className="text-slate-500 text-sm">
            Sign in to access your dashboard & e-commerce shop
          </p>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-medium leading-relaxed">
            {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LuUser className="w-4 h-4" />
              </div>
              <input
                type="text"
                {...register('username')}
                placeholder="Enter your username (e.g. emilys)"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:bg-white transition-all duration-200 ${
                  errors.username ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LuLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                {...register('password')}
                placeholder="Enter your password (min 6 characters)"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:bg-white transition-all duration-200 ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login credentials tip */}
          <div className="bg-blue-50/50 border border-blue-100/50 rounded-xl p-3.5 text-xs text-blue-700 leading-normal">
            <span className="font-bold">Test Credentials:</span><br />
            Username: <code className="bg-white/80 px-1 py-0.5 rounded border border-blue-200/40">emilys</code><br />
            Password: <code className="bg-white/80 px-1 py-0.5 rounded border border-blue-200/40">emilyspass</code>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md cursor-pointer active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <LuLoaderCircle className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
