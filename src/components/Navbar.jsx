import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LuShoppingCart, LuLogOut, LuMenu, LuX } from 'react-icons/lu'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

export const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  const { user, logout } = useAuthStore()
  const items = useCartStore((state) => state.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const linkClasses = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 cursor-pointer ${
      isActive ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/products" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ShopLite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/products" className={linkClasses}>
              Products
            </NavLink>
            <NavLink to="/cart" className={linkClasses}>
              Cart
            </NavLink>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200" aria-label="Cart">
              <LuShoppingCart className="w-6 h-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border-2 border-white animate-scaleIn">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Profile Info */}
            {user && (
              <div className="flex items-center gap-2.5">
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 object-cover"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Hi, {user.firstName}
                </span>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-50/50 text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              <LuLogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden">
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 mr-2" aria-label="Cart">
              <LuShoppingCart className="w-6 h-6" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] flex items-center justify-center bg-blue-600 text-white text-[9px] font-bold rounded-full border-2 border-white">
                  {totalQuantity}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 shadow-sm animate-slideDown">
          <div className="flex flex-col space-y-3">
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cart
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4 px-2">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-10 h-10 rounded-full border border-slate-200 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                setIsOpen(false)
                handleLogout()
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer"
            >
              <LuLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
