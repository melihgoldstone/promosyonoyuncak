"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Giriş başarılı!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Bir hata oluştu");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary-600">
            🎮 Promosyon Oyuncak
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Hesabınıza Giriş Yapın
          </h2>
          <p className="mt-2 text-gray-600">
            Henüz hesabınız yok mu?{" "}
            <Link
              href="/kayit"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Kayıt Olun
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Adresi
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Beni Hatırla
                </label>
              </div>

              <Link
                href="/sifremi-unuttum"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Şifremi Unuttum?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  veya
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                İşletme hesabı mı arıyorsunuz?{" "}
                <Link
                  href="/toptan-basvuru"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Toptan Satış Başvurusu
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Giriş yaparak{" "}
          <Link href="/kullanim-kosullari" className="text-primary-600 hover:underline">
            Kullanım Koşullarını
          </Link>{" "}
          ve{" "}
          <Link href="/gizlilik-politikasi" className="text-primary-600 hover:underline">
            Gizlilik Politikasını
          </Link>{" "}
          kabul etmiş olursunuz.
        </p>
      </div>
    </div>
  );
}
