import React from 'react'
import { LuTriangleAlert, LuRefreshCw } from 'react-icons/lu'

export const ErrorState = ({ message = 'An error occurred while loading data.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50/50 border border-red-100/80 rounded-2xl max-w-md mx-auto my-16 text-center shadow-xs">
      <div className="p-3.5 bg-red-100/70 text-red-600 rounded-full mb-4">
        <LuTriangleAlert className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">Failed to load content</h3>
      <p className="text-slate-600 text-sm mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-xs cursor-pointer active:scale-97"
        >
          <LuRefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorState
