'use client'

import { use, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Minus, Plus, ShoppingCart, Heart } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useProduct } from '@/hooks/useProducts'
import { useCartStore } from '@/lib/store/cart-store'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const { product, loading, error } = useProduct(productId)
  const { addItem } = useCartStore()

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      stock: product.stock,
    })

    alert('Ürün sepete eklendi!')
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-600"></div>
          <p className="mt-4 text-gray-600">Ürün yükleniyor...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">{error || 'Bu ürün mevcut değil.'}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Ana Sayfa</Link>
            <ChevronRight className="w-4 h-4" />
            {product.category && (
              <>
                <Link href={`/kategori/${product.category.slug}`} className="hover:text-primary-600">
                  {product.category.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="relative aspect-square">
                {product.images[selectedImage] ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <span className="text-gray-400">Resim Yok</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded">
                      %{discount} İndirim
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">(127 değerlendirme)</span>
              </div>

              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-4xl font-bold text-primary-600">
                    {product.price.toFixed(2)} TL
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.compareAtPrice.toFixed(2)} TL
                    </span>
                  )}
                </div>

                {/* Wholesale Pricing */}
                <div className="bg-primary-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Toptan Fiyatlar:</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">50-99 adet:</span> {(product.price * 0.90).toFixed(2)} TL</p>
                    <p><span className="font-medium">100-249 adet:</span> {(product.price * 0.85).toFixed(2)} TL</p>
                    <p><span className="font-medium">250+ adet:</span> {(product.price * 0.80).toFixed(2)} TL</p>
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      Stokta {product.stock < 10 && `(${product.stock} adet)`}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Stokta Yok</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adet</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decreaseQuantity}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 font-semibold">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">
                      Toplam: <span className="font-bold text-gray-900">{(product.price * quantity).toFixed(2)} TL</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Sepete Ekle
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium text-gray-900">{product.sku}</span>
                </div>
                {product.category && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <Link href={`/kategori/${product.category.slug}`} className="font-medium text-primary-600 hover:text-primary-700">
                      {product.category.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-8 bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün Açıklaması</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
