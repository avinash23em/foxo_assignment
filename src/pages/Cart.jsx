import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { formatCurrency, getDiscountedPrice } from '../utils/formatters'
import QuantitySelector from '../components/QuantitySelector'
import EmptyState from '../components/EmptyState'
import toast from 'react-hot-toast'
import { LuTrash2, LuShoppingBag, LuArrowRight, LuInfo } from 'react-icons/lu'

export const Cart = () => {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, clearCart, getTotals } = useCartStore()

  const {
    totalItems,
    totalQuantity,
    originalSubtotal,
    totalDiscount,
    finalTotal,
  } = getTotals()

  const handleCheckout = () => {
    toast.success('Order placed successfully! Thank you for shopping with ShopLite.', {
      icon: '🎉',
      duration: 4000,
    })
    clearCart()
    navigate('/products')
  }

  if (items.length === 0) {
    return (
      <div className="py-12 animate-fadeIn">
        <EmptyState
          title="Your Cart is Empty"
          description="Looks like you haven't added any products to your cart yet. Head back to the shop to find the best deals!"
          icon={LuShoppingBag}
          actionText="Go Shopping"
          onAction={() => navigate('/products')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your selected items and proceed to secure checkout
          </p>
        </div>
        <button
          onClick={() => {
            clearCart()
            toast.success('Cart cleared successfully')
          }}
          className="text-sm font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/70 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer border border-rose-100/50"
        >
          Clear Cart
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemDiscPrice = getDiscountedPrice(item.price, item.discountPercentage)
            const itemSubtotal = itemDiscPrice * item.quantity

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-all duration-200"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
                      {item.brand || 'Generic'}
                    </span>
                    <Link
                      to={`/products/${item.id}`}
                      className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-slate-900">
                        {formatCurrency(itemDiscPrice)}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatCurrency(item.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                  {/* Quantity Control */}
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                    onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    max={item.stock}
                  />

                  {/* Line Subtotal */}
                  <div className="text-right min-w-[80px]">
                    <span className="text-slate-400 text-[10px] block">Subtotal</span>
                    <span className="text-sm font-extrabold text-slate-950">
                      {formatCurrency(itemSubtotal)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeItem(item.id)
                      toast.success(`${item.title} removed from cart.`)
                    }}
                    className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all duration-200 cursor-pointer shrink-0 border border-slate-100 hover:border-rose-100"
                    aria-label="Remove item"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xs sticky top-24 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
              Order Summary
            </h2>
            
            {/* Breakdowns */}
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between text-slate-500">
                <span>Unique Items</span>
                <span className="text-slate-800 font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Total Quantity</span>
                <span className="text-slate-800 font-bold">{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Original Subtotal</span>
                <span className="text-slate-800 font-semibold">{formatCurrency(originalSubtotal)}</span>
              </div>
              
              {totalDiscount > 0 && (
                <div className="flex justify-between text-green-600 bg-green-50/50 px-3 py-2 rounded-xl border border-green-100/50">
                  <span>Savings</span>
                  <span className="font-bold">-{formatCurrency(totalDiscount)}</span>
                </div>
              )}
              
              <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline text-slate-900">
                <span className="text-base font-extrabold">Estimated Total</span>
                <span className="text-2xl font-extrabold text-blue-600">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            {/* Sim checkout info */}
            <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed">
              <LuInfo className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
              <p>
                Shipping costs, taxes, and transaction fees are calculated during final processing. This is a simulated checkout.
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md cursor-pointer active:scale-[0.98]"
            >
              Secure Checkout
              <LuArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
