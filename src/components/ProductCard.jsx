import React from 'react'
import { Link } from 'react-router-dom'
import { LuStar, LuShoppingCart } from 'react-icons/lu'
import { useCartStore } from '../store/cartStore'
import { formatCurrency, getDiscountedPrice } from '../utils/formatters'
import toast from 'react-hot-toast'

export const ProductCard = ({ product }) => {
  const { addItem, items } = useCartStore()

  // Find if item is already in cart to check stock
  const cartItem = items.find((item) => item.id === product.id)
  const currentQuantity = cartItem?.quantity || 0
  const isOutOfStock = product.stock !== undefined && currentQuantity >= product.stock

  const handleAddToCart = (e) => {
    e.preventDefault() // prevent navigating to details page
    e.stopPropagation()
    
    if (isOutOfStock) {
      toast.error(`Cannot add more. Only ${product.stock} items in stock.`)
      return
    }
    
    addItem(product, 1)
    toast.success(`${product.title} added to cart!`, {
      icon: '🛒',
    })
  }

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage > 0

  return (
    <div className="group bg-white rounded-2xl border border-slate-100/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      {/* Discount Badge */}
      {hasDiscount && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg z-10 shadow-xs">
          -{Math.round(product.discountPercentage)}% OFF
        </span>
      )}
      
      {/* Category Tag */}
      <span className="absolute top-3 right-3 bg-slate-900/85 text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md z-10 backdrop-blur-xs">
        {product.category}
      </span>

      {/* Product Image Link */}
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Hover overlay detail link indicator */}
        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-xs">
            View Details
          </span>
        </div>
      </Link>

      {/* Card Info */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Brand */}
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1 block">
          {product.brand || 'Generic'}
        </span>

        {/* Title */}
        <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors duration-200">
          <h3 className="text-base font-semibold text-slate-800 leading-snug line-clamp-2 mb-2 min-h-[2.75rem]">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => {
              const ratingVal = i + 1
              return (
                <LuStar
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    ratingVal <= Math.round(product.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              )
            })}
          </div>
          <span className="text-slate-500 text-xs font-medium">
            ({product.rating?.toFixed(1) || '0.0'})
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-lg font-bold text-slate-900">
            {formatCurrency(discountedPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-slate-400 line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full mt-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-xs cursor-pointer ${
            isOutOfStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50'
              : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
          }`}
        >
          <LuShoppingCart className="w-4 h-4" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
