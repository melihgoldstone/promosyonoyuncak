'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Sidebar from '@/components/home/Sidebar'
import { useProducts } from '@/hooks/useProducts'
import { categoryApi, Category } from '@/lib/api/categories'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [category, setCategory] = useState<Category | null>(null)
  const [loadingCategory, setLoadingCategory] = useState(true)

  const { products, loading, error } = useProducts({
    categoryId: category?.id,
    page: 1,
    limit: 50,
  })

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await categoryApi.getCategoryBySlug(slug)
        setCategory(data)
      } catch (err) {
        console.error('Failed to fetch category:', err)
      } finally {
        setLoadingCategory(false)
      }
    }

    if (slug) {
      fetchCategory()
    }
  }, [slug])

  if (loadingCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategori Bulunamadı</h1>
          <Link href="/" className="text-primary-600 hover:text-primary-700">Ana Sayfaya Dön</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="bg-white">
        <div className="container mx-auto flex">
          <Sidebar />

          <main className="flex-1 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">{products.length} ürün bulundu</p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Önerilen</option>
                <option>Fiyat: Düşükten Yükseğe</option>
                <option>Fiyat: Yüksekten Düşüğe</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Bu kategoride ürün bulunmuyor.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/urun/${product.id}`}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative aspect-square bg-gray-100">
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <span className="text-sm">Resim Yok</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-600">
                        {product.name}
                      </h3>
                      <div className="mb-2">
                        <span className="text-lg font-bold text-primary-600">
                          {product.price.toFixed(2)} TL
                        </span>
                      </div>
                      <p className="text-xs text-green-600 font-medium">Stokta</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
