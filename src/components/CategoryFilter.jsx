import React from 'react'

export const CategoryFilter = ({ selectedCategory, onChange, categories = [], isLoading = false }) => {
  return (
    <div className="relative w-full sm:w-52 shadow-2xs">
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed appearance-none pr-10"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1.25em 1.25em',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => {
          const slug = typeof cat === 'string' ? cat : cat.slug
          const name = typeof cat === 'string' ? cat : cat.name
          return (
            <option key={slug} value={slug}>
              {name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default CategoryFilter
