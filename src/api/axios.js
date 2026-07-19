import axios from 'axios'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to dynamically inject authorization headers
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for centralized error message display
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong. Please try again.'
    
    // We avoid toasted spamming for 401s on initial auth state checks, but notify on other api failures
    if (error.response?.status !== 401 && error.config?.showToast !== false) {
      toast.error(message)
    }
    
    return Promise.reject(error)
  }
)

export default api
