'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

const categories = [
  {
    id: 'oyuncak',
    name: 'Oyuncaklar',
    count: 1247,
    subcategories: [
      { id: 'bebek', name: 'Bebekler', count: 245 },
      { id: 'arac', name: 'Araçlar', count: 312 },
      { id: 'puzzle', name: 'Puzzle', count: 156 },
      { id: 'lego', name: 'Lego & Yapı', count: 198 },
      { id: 'pelus', name: 'Peluş Oyuncaklar', count: 336 },
    ],
  },
  {
    id: 'parti',
    name: 'Parti Malzemeleri',
    count: 856,
    subcategories: [
      { id: 'balon', name: 'Balonlar', count: 234 },
      { id: 'dogumgunu', name: 'Doğum Günü Setleri', count: 178 },
      { id: 'susleme', name: 'Süsleme', count: 298 },
      { id: 'pinata', name: 'Piñata', count: 146 },
    ],
  },
  {
    id: 'okul',
    name: 'Okul Malzemeleri',
    count: 542,
    subcategories: [
      { id: 'kirtasiye', name: 'Kırtasiye', count: 267 },
      { id: 'canta', name: 'Çantalar', count: 123 },
      { id: 'boyama', name: 'Boyama Seti', count: 152 },
    ],
  },
  {
    id: 'hediye',
    name: 'Hediye Ürünleri',
    count: 423,
  },
  {
    id: 'mevsimsel',
    name: 'Mevsimsel Ürünler',
    count: 289,
  },
]

const priceRanges = [
  { id: '0-50', label: '0 - 50 TL', min: 0, max: 50 },
  { id: '50-100', label: '50 - 100 TL', min: 50, max: 100 },
  { id: '100-200', label: '100 - 200 TL', min: 100, max: 200 },
  { id: '200-500', label: '200 - 500 TL', min: 200, max: 500 },
  { id: '500+', label: '500 TL üzeri', min: 500, max: null },
]

const brands = [
  { id: 'barbie', name: 'Barbie', count: 156 },
  { id: 'lego', name: 'LEGO', count: 234 },
  { id: 'hotwheels', name: 'Hot Wheels', count: 178 },
  { id: 'nerf', name: 'Nerf', count: 89 },
  { id: 'playdoh', name: 'Play-Doh', count: 123 },
]

export default function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['oyuncak'])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const togglePrice = (priceId: string) => {
    setSelectedPrices((prev) =>
      prev.includes(priceId) ? prev.filter((id) => id !== priceId) : [...prev, priceId]
    )
  }

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    )
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 h-[calc(100vh-3.5rem)] overflow-y-auto sticky top-14">
      <div className="p-4">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Kategoriler</h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <div>
                  <button
                    onClick={() => category.subcategories && toggleCategory(category.id)}
                    className="w-full flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {category.subcategories && (
                        expandedCategories.includes(category.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )
                      )}
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{category.count}</span>
                  </button>

                  {/* Subcategories */}
                  {category.subcategories && expandedCategories.includes(category.id) && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {category.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <button className="w-full flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded text-left">
                            <span className="text-sm text-gray-600">{sub.name}</span>
                            <span className="text-xs text-gray-400">{sub.count}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Fiyat Aralığı</h3>
          <ul className="space-y-2">
            {priceRanges.map((range) => (
              <li key={range.id}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes(range.id)}
                    onChange={() => togglePrice(range.id)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{range.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Marka</h3>
          <ul className="space-y-2">
            {brands.map((brand) => (
              <li key={brand.id}>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => toggleBrand(brand.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-primary-600">
                      {brand.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{brand.count}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Clear Filters */}
        {(selectedPrices.length > 0 || selectedBrands.length > 0) && (
          <button
            onClick={() => {
              setSelectedPrices([])
              setSelectedBrands([])
            }}
            className="w-full py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Filtreleri Temizle
          </button>
        )}
      </div>
    </aside>
  )
}
