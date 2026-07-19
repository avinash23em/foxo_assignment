import React, { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchProducts, fetchCategories } from '../api/productApi'
import { useDebounce } from '../hooks/useDebounce'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import { ProductsGridSkeleton } from '../components/Skeletons'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import { LuSearchX } from 'react-icons/lu'

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  const debouncedSearch = useDebounce(searchTerm, 500)

  // Fetch Categories with TanStack Query
  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  })

  // Fetch Products based on debounced search and selected category
  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ['products', { search: debouncedSearch, category }],
    queryFn: () => fetchProducts({ search: debouncedSearch, category }),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    placeholderData: keepPreviousData,
    retry: 1,
  })

  const products = productsData?.products || []

  // Check error state
  if (productsError) {
    return (
      <div className="py-12">
        <ErrorState
          message={productsError.message || 'Failed to retrieve products.'}
          onRetry={refetchProducts}
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse through our premium, hand-picked catalog
          </p>
        </div>
        
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryFilter
            selectedCategory={category}
            onChange={(val) => setCategory(val)}
            categories={categories}
            isLoading={categoriesLoading}
          />
        </div>
      </div>

      {/* Loading Skeletons */}
      {productsLoading ? (
        <ProductsGridSkeleton count={8} />
      ) : products.length === 0 ? (
        /* Empty State */
        <EmptyState
          title={searchTerm ? 'No search results' : 'No products available'}
          description={
            searchTerm
              ? `We couldn't find any matches for "${searchTerm}". Try checking your spelling or looking for other items.`
              : 'There are no products listed in this category.'
          }
          icon={LuSearchX}
          actionText={searchTerm || category !== 'all' ? 'Reset Filters' : null}
          onAction={() => {
            setSearchTerm('')
            setCategory('all')
          }}
        />
      ) : (
        /* Products Grid */
        <div className="relative">
          {productsFetching && (
            <div className="absolute -top-6 right-2 bg-blue-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md z-20 animate-pulse backdrop-blur-xs shadow-sm">
              Updating list...
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
