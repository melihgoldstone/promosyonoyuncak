"use client";

import Link from "next/link";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-6 rounded-full">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bir Hata Oluştu
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Üzgünüz, bir şeyler yanlış gitti.
          </p>
          {error.message && (
            <p className="text-sm text-red-600 bg-red-50 p-4 rounded-lg mt-4 font-mono">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            <RefreshCcw className="w-5 h-5" />
            Tekrar Dene
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition font-semibold"
          >
            <Home className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>
            Sorun devam ediyorsa{" "}
            <Link href="/iletisim" className="text-primary-600 hover:underline">
              destek ekibimizle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}