'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, User } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'

export default function Header() {
  const { getTotalItems } = useCartStore()
  const cartItemsCount = getTotalItems()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-primary-600">
              Promosyon Oyuncak
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="search"
                placeholder="Ürün, kategori veya marka ara"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* User */}
            <Link
              href="/giris"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Giriş Yap</span>
            </Link>

            {/* Cart */}
            <Link
              href="/sepet"
              className="relative flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="hidden md:block text-sm font-medium">Sepetim</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Ürün ara..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
