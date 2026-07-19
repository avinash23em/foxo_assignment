import React from 'react'
import { LuSearch, LuX } from 'react-icons/lu'

export const SearchBar = ({ value, onChange, placeholder = 'Search products...' }) => {
  return (
    <div className="relative w-full max-w-md shadow-2xs">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <LuSearch className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
          aria-label="Clear search"
        >
          <LuX className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
