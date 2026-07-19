import React from 'react'
import Navbar from '../components/Navbar'

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-slate-400 text-xs">
        &copy; {new Date().getFullYear()} ShopLite. Built with React 19, Zustand, and Tailwind CSS. All rights reserved.
      </footer>
    </div>
  )
}

export default MainLayout
