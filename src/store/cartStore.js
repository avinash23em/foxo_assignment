import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)
        
        let newItems
        if (existingItem) {
          const newQty = existingItem.quantity + quantity
          const maxQty = product.stock !== undefined ? Math.min(newQty, product.stock) : newQty
          newItems = items.map((item) =>
            item.id === product.id ? { ...item, quantity: maxQty } : item
          )
        } else {
          const maxQty = product.stock !== undefined ? Math.min(quantity, product.stock) : quantity
          newItems = [
            ...items,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              discountPercentage: product.discountPercentage || 0,
              thumbnail: product.thumbnail,
              stock: product.stock,
              brand: product.brand,
              category: product.category,
              quantity: maxQty,
            },
          ]
        }
        set({ items: newItems })
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        const items = get().items
        const item = items.find((item) => item.id === id)
        if (!item) return
        
        const maxQty = item.stock !== undefined ? Math.min(quantity, item.stock) : quantity
        set({
          items: items.map((item) =>
            item.id === id ? { ...item, quantity: maxQty } : item
          ),
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotals: () => {
        const items = get().items
        const totalItems = items.length
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
        
        let originalSubtotal = 0
        let finalTotal = 0
        
        items.forEach((item) => {
          const itemOriginal = item.price * item.quantity
          const discountAmt = itemOriginal * ((item.discountPercentage || 0) / 100)
          const itemFinal = itemOriginal - discountAmt
          
          originalSubtotal += itemOriginal
          finalTotal += itemFinal
        })
        
        const totalDiscount = originalSubtotal - finalTotal
        
        return {
          totalItems,
          totalQuantity,
          originalSubtotal,
          totalDiscount,
          finalTotal,
        }
      },
    }),
    {
      name: 'shoplite-cart',
    }
  )
)
