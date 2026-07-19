import React from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu'

export const QuantitySelector = ({ quantity, onIncrease, onDecrease, max = Infinity }) => {
  return (
    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 w-fit shadow-2xs">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="px-3 py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100/70 disabled:opacity-30 disabled:hover:bg-transparent transition-colors duration-200 cursor-pointer"
        aria-label="Decrease quantity"
      >
        <LuMinus className="w-4 h-4" />
      </button>
      
      <span className="px-4 py-2 font-semibold text-slate-800 text-sm min-w-[44px] text-center select-none">
        {quantity}
      </span>
      
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="px-3 py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100/70 disabled:opacity-30 disabled:hover:bg-transparent transition-colors duration-200 cursor-pointer"
        aria-label="Increase quantity"
      >
        <LuPlus className="w-4 h-4" />
      </button>
    </div>
  )
}

export default QuantitySelector
