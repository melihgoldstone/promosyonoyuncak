'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  discount?: number
  rating?: number
  reviews?: number
}

interface ProductCarouselProps {
  title: string
  products: Product[]
  viewAllLink?: string
}

export default function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-2">
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm mr-4"
              >
                Tümünü Gör
              </Link>
            )}
            <button
              onClick={scrollPrev}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-[0_0_180px] sm:flex-[0_0_200px] md:flex-[0_0_220px] min-w-0"
              >
                <Link
                  href={`/urun/${product.id}`}
                  className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-sm">Ürün {product.id}</span>
                    </div>

                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          %{product.discount}
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
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <svg
                              key={idx}
                              className="w-3 h-3 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        {product.reviews && (
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary-600">
                        {product.price.toFixed(2)} TL
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.oldPrice.toFixed(2)} TL
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
