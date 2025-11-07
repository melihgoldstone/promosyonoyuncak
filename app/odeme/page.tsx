"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { useAuth } from "@/hooks/useAuth";
import { orderApi, ShippingAddress } from "@/lib/api/orders";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { ShoppingBag, ChevronLeft, CreditCard, Building2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    zipCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"CREDIT_CARD" | "BANK_TRANSFER">("CREDIT_CARD");

  if (!authLoading && !isAuthenticated) {
    router.push("/giris?redirect=/odeme");
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Promosyon Oyuncak
            </Link>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-8">
              Ödeme yapabilmek için sepetinizde ürün olması gerekiyor.
            </p>
            <Link
              href="/urunler"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition inline-block"
            >
              Ürünleri İncele
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        paymentMethod,
      };

      const order = await orderApi.createOrder(orderData);

      toast.success("Siparişiniz başarıyla oluşturuldu!");
      clearCart();

      setTimeout(() => {
        router.push(`/siparis/${order.id}`);
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Sipariş oluşturulurken bir hata oluştu.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Promosyon Oyuncak
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 1 ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                  1
                </div>
                <div className="text-sm ml-2 font-medium">Teslimat Bilgileri</div>
              </div>

              <div className={`w-24 h-1 mx-4 ${currentStep >= 2 ? "bg-primary-600" : "bg-gray-200"}`} />

              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 2 ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                  2
                </div>
                <div className="text-sm ml-2 font-medium">Ödeme</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Teslimat Bilgileri</h2>

                  <form onSubmit={handleShippingSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.firstName}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                          placeholder="Adınız"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.lastName}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                          placeholder="Soyadınız"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="05XX XXX XX XX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adres *</label>
                      <textarea
                        required
                        rows={3}
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="Açık adresinizi giriniz"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">İl *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                          placeholder="İl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">İlçe *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.district}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                          placeholder="İlçe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                          placeholder="Posta Kodu"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Link href="/sepet" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                        <ChevronLeft className="w-5 h-5" />
                        Sepete Dön
                      </Link>

                      <button
                        type="submit"
                        className="ml-auto bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                      >
                        Devam Et
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Ödeme Yöntemi</h2>

                  <form onSubmit={handleOrderSubmit} className="space-y-5">
                    <div className="space-y-4">
                      <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "CREDIT_CARD" ? "border-primary-600 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="CREDIT_CARD"
                          checked={paymentMethod === "CREDIT_CARD"}
                          onChange={(e) => setPaymentMethod(e.target.value as "CREDIT_CARD")}
                          className="w-5 h-5 text-primary-600"
                        />
                        <CreditCard className="w-6 h-6 text-gray-600" />
                        <div>
                          <div className="font-semibold">Kredi Kartı</div>
                          <div className="text-sm text-gray-600">Güvenli ödeme ile kredi kartı</div>
                        </div>
                      </label>

                      <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "BANK_TRANSFER" ? "border-primary-600 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="BANK_TRANSFER"
                          checked={paymentMethod === "BANK_TRANSFER"}
                          onChange={(e) => setPaymentMethod(e.target.value as "BANK_TRANSFER")}
                          className="w-5 h-5 text-primary-600"
                        />
                        <Building2 className="w-6 h-6 text-gray-600" />
                        <div>
                          <div className="font-semibold">Havale / EFT</div>
                          <div className="text-sm text-gray-600">Banka hesabına havale veya EFT</div>
                        </div>
                      </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Geri
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-auto bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sipariş Oluşturuluyor..." : "Siparişi Tamamla"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                        ) : (
                          <span className="text-xs text-gray-400">Görsel</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">{item.name}</h3>
                        <p className="text-xs text-gray-600">Adet: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary-600">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Ara Toplam ({getTotalItems()} Ürün)</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Kargo</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam</span>
                      <span className="text-primary-600">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}