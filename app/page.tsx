import Link from "next/link";
import { ShoppingCart, Shield, Truck, HeadphonesIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              🎮 Promosyon Oyuncak
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/urunler" className="text-gray-700 hover:text-primary-600">
                Ürünler
              </Link>
              <Link href="/hakkimizda" className="text-gray-700 hover:text-primary-600">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-primary-600">
                İletişim
              </Link>
              <Link href="/sepet" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary-600" />
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </Link>
              <Link
                href="/giris"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Türkiye'nin En Güvenilir Toptan Oyuncak Tedarikçisi
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Geniş ürün yelpazesi, güvenli ödeme sistemi ve hızlı teslimat ile
            işletmeniz için en kaliteli promosyon oyuncakları sunuyoruz.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/urunler"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ürünleri İncele
            </Link>
            <Link
              href="/kayit"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              Hemen Kayıt Ol
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-600">
                SSL sertifikalı, güvenli ödeme altyapısı
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Hızlı Kargo</h3>
              <p className="text-gray-600">
                Türkiye geneli hızlı ve güvenli teslimat
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Toptan Fiyat</h3>
              <p className="text-gray-600">
                Miktara göre özel indirimler
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">7/24 Destek</h3>
              <p className="text-gray-600">
                Müşteri hizmetlerimiz her zaman yanınızda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popüler Ürünler
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-400">Ürün Görseli</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Örnek Ürün {item}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Kaliteli promosyon oyuncak
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-bold text-lg">
                      ₺99,90
                    </span>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition text-sm">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Promosyon Oyuncak</h3>
              <p className="text-gray-400">
                Türkiye'nin güvenilir toptan oyuncak tedarikçisi
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kurumsal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/hakkimizda" className="hover:text-white">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="hover:text-white">
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link href="/sikca-sorulan-sorular" className="hover:text-white">
                    SSS
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/kvkk" className="hover:text-white">
                    KVKK
                  </Link>
                </li>
                <li>
                  <Link href="/gizlilik-politikasi" className="hover:text-white">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/mesafeli-satis-sozlesmesi" className="hover:text-white">
                    Mesafeli Satış Sözleşmesi
                  </Link>
                </li>
                <li>
                  <Link href="/kullanim-kosullari" className="hover:text-white">
                    Kullanım Koşulları
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@promosyonoyuncak.com</li>
                <li>Tel: +90 (XXX) XXX XX XX</li>
                <li>Adres: İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 Promosyon Oyuncak. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
