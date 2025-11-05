import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Türk Lirası formatı
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(price)
}

// Slug oluşturma (Türkçe karakter desteği)
export function slugify(text: string): string {
  const trMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U',
  }

  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Sipariş numarası oluşturma
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `PO${timestamp}${random}`
}

// Tarih formatı
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// Email doğrulama
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Telefon numarası formatı (Türkiye)
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`
  }
  return phone
}

// Stok durumu kontrolü
export function getStockStatus(stock: number, lowStockAlert: number): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  message: string
} {
  if (stock === 0) {
    return { status: 'out-of-stock', message: 'Stokta Yok' }
  } else if (stock <= lowStockAlert) {
    return { status: 'low-stock', message: `Son ${stock} Adet!` }
  }
  return { status: 'in-stock', message: 'Stokta' }
}

// Toptan fiyat hesaplama
export function calculateWholesalePrice(
  basePrice: number,
  quantity: number,
  priceRules: Array<{ minQuantity: number; maxQuantity: number | null; price: number }>
): number {
  // Fiyat kurallarını miktara göre sırala
  const sortedRules = priceRules.sort((a, b) => b.minQuantity - a.minQuantity)

  // Uygun kuralı bul
  for (const rule of sortedRules) {
    if (quantity >= rule.minQuantity) {
      if (rule.maxQuantity === null || quantity <= rule.maxQuantity) {
        return rule.price
      }
    }
  }

  return basePrice
}
