import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import { useAuthStore } from '../store/authStore'

export const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/products" replace /> : <Login />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Products />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Cart />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Redirect Root to Products */}
      <Route path="/" element={<Navigate to="/products" replace />} />

      {/* Fallback 404 */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <ProtectedRoute>
              <MainLayout>
                <NotFound />
              </MainLayout>
            </ProtectedRoute>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default AppRoutes
