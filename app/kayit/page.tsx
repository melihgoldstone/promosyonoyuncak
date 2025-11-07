"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptKvkk: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor");
      return;
    }

    if (!formData.acceptTerms || !formData.acceptKvkk) {
      toast.error("Kullanım koşullarını ve KVKK'yı kabul etmelisiniz");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success(response.data.message);
      setTimeout(() => {
        router.push("/giris");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Bir hata oluştu. Lütfen tekrar deneyiniz.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary-600">
            Promosyon Oyuncak
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Hesap Oluşturun
          </h2>
          <p className="mt-2 text-gray-600">
            Zaten hesabınız var mı?{' '}
            <Link
              href="/giris"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Giriş Yapın
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ad Soyad *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Adınız Soyadınız"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Adresi *
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
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Telefon (Opsiyonel)
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="05XX XXX XX XX"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Şifre *
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">
                En az 6 karakter olmalıdır
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Şifre Tekrar *
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptTerms: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                  <Link
                    href="/kullanim-kosullari"
                    target="_blank"
                    className="text-primary-600 hover:underline"
                  >
                    Kullanım Koşullarını
                  </Link>{" "}
                  ve{" "}
                  <Link
                    href="/mesafeli-satis-sozlesmesi"
                    target="_blank"
                    className="text-primary-600 hover:underline"
                  >
                    Mesafeli Satış Sözleşmesini
                  </Link>{" "}
                  okudum ve kabul ediyorum. *
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="acceptKvkk"
                  type="checkbox"
                  required
                  checked={formData.acceptKvkk}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptKvkk: e.target.checked })
                  }
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="acceptKvkk" className="ml-2 block text-sm text-gray-700">
                  <Link
                    href="/kvkk"
                    target="_blank"
                    className="text-primary-600 hover:underline"
                  >
                    KVKK Aydınlatma Metni
                  </Link>{" "}
                  ve{" "}
                  <Link
                    href="/gizlilik-politikasi"
                    target="_blank"
                    className="text-primary-600 hover:underline"
                  >
                    Gizlilik Politikasını
                  </Link>{" "}
                  okudum, kişisel verilerimin işlenmesini kabul ediyorum. *
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          * İşaretli alanlar zorunludur
        </p>
      </div>
    </div>
  );
}
