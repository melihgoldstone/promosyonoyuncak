import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 text-lg">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>

          <Link
            href="/urunler"
            className="flex items-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
          >
            <Search className="w-5 h-5" />
            Ürünleri İncele
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>
            Yardıma mı ihtiyacınız var?{" "}
            <Link href="/iletisim" className="text-primary-600 hover:underline">
              Bizimle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}