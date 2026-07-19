import React from 'react'
import { Link } from 'react-router-dom'
import { LuCircleHelp, LuArrowRight } from 'react-icons/lu'

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto animate-fadeIn">
      <div className="p-5 bg-blue-50 text-blue-600 rounded-full mb-6 border border-blue-100/50 shadow-xs animate-bounce">
        <LuCircleHelp className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
        Page Not Found
      </h1>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        The link you followed may be broken or the page might have been removed. Let's get you back to browsing products.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-200 shadow-md cursor-pointer active:scale-97"
      >
        Go to Products
        <LuArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

export default NotFound
