import api from './axios'

export const fetchProducts = async ({ search = '', category = '' } = {}) => {
  let url = '/products?limit=100'
  
  if (search && (!category || category === 'all')) {
    url = `/products/search?q=${encodeURIComponent(search)}&limit=100`
  } else if (category && category !== 'all') {
    url = `/products/category/${encodeURIComponent(category)}?limit=100`
  }
  
  const response = await api.get(url)
  let products = response.data.products || []
  
  // Client-side search filtering fallback when BOTH category and search are active
  if (search && category && category !== 'all') {
    const query = search.toLowerCase()
    products = products.filter(
      (p) =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
    )
  }
  
  return {
    ...response.data,
    products,
  }
}

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const fetchCategories = async () => {
  const response = await api.get('/products/categories')
  return response.data
}
