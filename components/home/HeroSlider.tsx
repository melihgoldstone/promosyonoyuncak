'use client'

import { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Yeni Sezon Oyuncaklar',
    description: 'Toptan alımlarda %30\'a varan indirim',
    image: '/slides/slide-1.jpg',
    link: '/kategori/yeni-sezon',
    bg: 'bg-primary-600',
  },
  {
    id: 2,
    title: 'Parti Malzemeleri',
    description: '500+ adet ücretsiz kargo',
    image: '/slides/slide-2.jpg',
    link: '/kategori/parti',
    bg: 'bg-primary-500',
  },
  {
    id: 3,
    title: 'Toptan Fırsatlar',
    description: 'Kampanyalı ürünlerde ekstra indirim',
    image: '/slides/slide-3.jpg',
    link: '/firsatlar',
    bg: 'bg-primary-700',
  },
]

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="relative overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                <Link href={slide.link}>
                  <div className={`relative h-64 md:h-80 lg:h-96 ${slide.bg} rounded-xl overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="container mx-auto px-8 md:px-16">
                        <div className="max-w-xl">
                          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {slide.title}
                          </h2>
                          <p className="text-lg md:text-xl text-white/90 mb-6">
                            {slide.description}
                          </p>
                          <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            İncele
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
