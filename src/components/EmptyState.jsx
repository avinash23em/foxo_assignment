import React from 'react'
import { LuInbox } from 'react-icons/lu'

export const EmptyState = ({
  title = 'No items found',
  description = 'Try adjusting your search filters.',
  icon: Icon = LuInbox,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-sm mx-auto my-12">
      <div className="p-5 bg-slate-50 rounded-full text-slate-400 mb-5 border border-slate-100/50 shadow-xs">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-xs cursor-pointer active:scale-97"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
