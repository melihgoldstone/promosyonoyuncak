'use client'

import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HeroSlider from "@/components/home/HeroSlider"
import ProductCarousel from "@/components/home/ProductCarousel"
import Sidebar from "@/components/home/Sidebar"
import { useBestSellers, useDiscountedProducts, useProducts } from "@/hooks/useProducts"
import { Product } from "@/lib/api/products"

export default function Home() {
  const { products: bestSellers, loading: loadingBest } = useBestSellers(15)
  const { products: discountedProducts, loading: loadingDiscounted } = useDiscountedProducts(15)
  const { products: allProducts, loading: loadingAll } = useProducts({ page: 1, limit: 50 })

  // Transform Product to carousel format
  const transformToCarousel = (products: Product[]) => {
    return products.map(p => ({
      id: parseInt(p.id) || 0,
      name: p.name,
      price: p.price,
      oldPrice: p.compareAtPrice,
      image: p.images[0] || '/placeholder.jpg',
      discount: p.compareAtPrice ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100) : undefined,
      rating: 4.5,
      reviews: 127,
    }))
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Best Sellers Carousel */}
      {!loadingBest && bestSellers.length > 0 && (
        <ProductCarousel
          title="Çok Satanlar"
          products={transformToCarousel(bestSellers)}
          viewAllLink="/cok-satanlar"
        />
      )}

      {/* Discounted Products Carousel */}
      {!loadingDiscounted && discountedProducts.length > 0 && (
        <ProductCarousel
          title="İndirimli Ürünler"
          products={transformToCarousel(discountedProducts)}
          viewAllLink="/indirimliler"
        />
      )}

      {/* Main Content with Sidebar */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Products Grid */}
          <main className="flex-1 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Tüm Ürünler</h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Önerilen Sıralama</option>
                <option>Fiyat: Düşükten Yükseğe</option>
                <option>Fiyat: Yüksekten Düşüğe</option>
                <option>En Yeniler</option>
                <option>En Çok Satanlar</option>
              </select>
            </div>

            {loadingAll ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-600"></div>
                <p className="mt-4 text-gray-600">Ürünler yükleniyor...</p>
              </div>
            ) : allProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">Henüz ürün bulunmuyor.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {allProducts.map((product) => {
                  const discount = product.compareAtPrice
                    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                    : 0

                  return (
                    <Link
                      key={product.id}
                      href={`/urun/${product.id}`}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gray-100">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <span className="text-sm">Resim Yok</span>
                          </div>
                        )}

                        {/* Discount Badge */}
                        {discount > 0 && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              %{discount}
                            </span>
                          </div>
                        )}

                        {/* Free Shipping Badge (example) */}
                        {product.stock > 100 && (
                          <div className="absolute bottom-2 left-2">
                            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                              Kargo Bedava
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        <h3 className="text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <svg key={idx} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">(127)</span>
                        </div>

                        {/* Price */}
                        <div className="mb-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-primary-600">
                              {product.price.toFixed(2)} TL
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {product.compareAtPrice.toFixed(2)} TL
                              </span>
                            )}
                          </div>

                          {/* Wholesale Price */}
                          <p className="text-xs text-gray-600 mt-1">
                            Toptan: <span className="font-semibold text-primary-600">{(product.price * 0.85).toFixed(2)} TL</span>
                          </p>
                        </div>

                        {/* Stock Info */}
                        {product.stock < 5 ? (
                          <p className="text-xs text-red-600 font-medium">Son {product.stock} ürün!</p>
                        ) : product.stock > 0 ? (
                          <p className="text-xs text-green-600 font-medium">Stokta</p>
                        ) : (
                          <p className="text-xs text-gray-400 font-medium">Stokta Yok</p>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Daha Fazla Ürün Göster
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
