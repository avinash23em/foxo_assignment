import React from 'react'

export const Loader = ({ fullScreen = false }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-slate-500 font-medium animate-pulse text-sm font-sans">Loading ShopLite...</p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-50/70 backdrop-blur-md flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-center py-16">
      {spinner}
    </div>
  )
}

export default Loader
