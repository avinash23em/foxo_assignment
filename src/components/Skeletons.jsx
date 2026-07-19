import React from 'react'

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs flex flex-col h-full animate-shimmer">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full bg-slate-100"></div>
      
      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col space-y-3">
        <div className="h-3.5 bg-slate-100 rounded-md w-1/4"></div>
        <div className="h-5 bg-slate-100 rounded-md w-3/4"></div>
        <div className="h-3.5 bg-slate-100 rounded-md w-1/2"></div>
        <div className="flex items-center space-x-2 pt-2">
          <div className="h-5 bg-slate-100 rounded-md w-12"></div>
          <div className="h-4 bg-slate-100 rounded-md w-10"></div>
        </div>
        <div className="h-10 bg-slate-100 rounded-xl w-full pt-4 mt-auto"></div>
      </div>
    </div>
  )
}

export const ProductsGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export const ProductDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
      {/* Gallery Skeleton */}
      <div className="space-y-4">
        <div className="aspect-square bg-slate-100 rounded-2xl w-full"></div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-slate-100 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Product Details Skeleton */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-4 bg-slate-100 rounded-md w-1/4"></div>
          <div className="h-10 bg-slate-100 rounded-md w-3/4"></div>
          <div className="h-5 bg-slate-100 rounded-md w-1/3"></div>
        </div>
        
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="h-6 bg-slate-100 rounded-md w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded-md w-full"></div>
            <div className="h-4 bg-slate-100 rounded-md w-full"></div>
            <div className="h-4 bg-slate-100 rounded-md w-2/3"></div>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="h-8 bg-slate-100 rounded-md w-1/3"></div>
          <div className="h-12 bg-slate-100 rounded-xl w-1/2"></div>
        </div>
        
        <div className="border-t border-slate-100 pt-6 grid grid-cols-2 gap-4">
          <div className="h-8 bg-slate-100 rounded-md w-full"></div>
          <div className="h-8 bg-slate-100 rounded-md w-full"></div>
        </div>
      </div>
    </div>
  )
}
