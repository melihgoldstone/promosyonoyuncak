import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Promosyon Oyuncak
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Toptan oyuncak ve parti malzemeleri
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-primary-400 transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-primary-400 transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/sikca-sorulan-sorular" className="hover:text-primary-400 transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/kariyer" className="hover:text-primary-400 transition-colors">
                  Kariyer
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/kvkk" className="hover:text-primary-400 transition-colors">
                  KVKK
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="hover:text-primary-400 transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-kosullari" className="hover:text-primary-400 transition-colors">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/mesafeli-satis-sozlesmesi" className="hover:text-primary-400 transition-colors">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="hover:text-primary-400 transition-colors">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@promosyonoyuncak.com" className="hover:text-primary-400 transition-colors">
                  info@promosyonoyuncak.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+905001234567" className="hover:text-primary-400 transition-colors">
                  +90 (500) 123 45 67
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Promosyon Oyuncak. Tüm hakları saklıdır.
            </p>
            <p className="text-xs">
              Developed by{' '}
              <a
                href="https://github.com/kubilaiswf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                @kubilaiswf
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
