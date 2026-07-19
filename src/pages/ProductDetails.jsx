import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../api/productApi'
import { useCartStore } from '../store/cartStore'
import { formatCurrency, getDiscountedPrice } from '../utils/formatters'
import QuantitySelector from '../components/QuantitySelector'
import { ProductDetailsSkeleton } from '../components/Skeletons'
import ErrorState from '../components/ErrorState'
import toast from 'react-hot-toast'
import { LuStar, LuShoppingCart, LuArrowLeft, LuCheck, LuCircleAlert } from 'react-icons/lu'

export const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, items } = useCartStore()
  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  // Fetch Product Details
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    retry: false, // Don't retry indefinitely for 404s
  })

  // Set default selected image when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.thumbnail)
      setQuantity(1) // reset quantity
    }
  }, [product])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductDetailsSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12">
        <ErrorState
          message="The requested product could not be found. It may have been deleted or the ID is invalid."
          onRetry={() => navigate('/products')}
        />
      </div>
    )
  }

  if (!product) return null

  // Stock tracking check
  const cartItem = items.find((item) => item.id === product.id)
  const currentCartQty = cartItem?.quantity || 0
  const availableStock = product.stock - currentCartQty
  const isOutOfStock = availableStock <= 0

  const handleIncrease = () => {
    if (quantity < availableStock) {
      setQuantity((prev) => prev + 1)
    } else {
      toast.error(`Cannot select more. You already have ${currentCartQty} in your cart and the stock limit is ${product.stock}.`)
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('This product is out of stock!')
      return
    }
    
    addItem(product, quantity)
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`, {
      icon: '🛒',
    })
    setQuantity(1) // reset
  }

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage > 0

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <LuArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs">
        {/* Gallery Column */}
        <div className="space-y-4">
          {/* Main Large Image */}
          <div className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain hover:scale-102 transition-transform duration-300"
            />
          </div>
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-3 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl bg-slate-50 border overflow-hidden p-1 transition-all duration-200 cursor-pointer ${
                    selectedImage === img
                      ? 'border-blue-600 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt={`${product.title} - ${idx}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {product.category}
            </span>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {product.brand || 'Generic'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-2">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <LuStar
                  key={i}
                  className={`w-4 h-4 ${
                    i + 1 <= Math.round(product.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-600 text-sm font-semibold">
              {product.rating?.toFixed(1)} / 5.0
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 text-xs font-medium">
              Stock Limit: {product.stock} units
            </span>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-6">
            <div className="flex items-baseline space-x-3 mb-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatCurrency(discountedPrice)}
              </span>
              {hasDiscount && (
                <span className="text-base text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 animate-pulse">
                Save {Math.round(product.discountPercentage)}% off retail pricing!
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6 space-y-2">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Product Overview
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock Notification Badge */}
          <div className="mb-6">
            {isOutOfStock ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-lg">
                <LuCircleAlert className="w-4 h-4" />
                Out of Stock (All units added to cart)
              </div>
            ) : product.stock < 10 ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold rounded-lg">
                <LuCircleAlert className="w-4 h-4 animate-bounce" />
                Low Stock: Only {availableStock} left!
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold rounded-lg">
                <LuCheck className="w-4 h-4" />
                In Stock ({availableStock} units available to add)
              </div>
            )}
          </div>

          {/* Cart Control Section */}
          <div className="mt-auto border-t border-slate-100 pt-6 space-y-4">
            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700">Quantity:</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  max={availableStock}
                />
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-xs cursor-pointer ${
                isOutOfStock
                  ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
              }`}
            >
              <LuShoppingCart className="w-5 h-5" />
              {isOutOfStock ? 'Product Unavailable' : `Add ${quantity} to Cart - ${formatCurrency(discountedPrice * quantity)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
