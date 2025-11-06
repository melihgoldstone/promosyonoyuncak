"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/giris?redirect=/odeme");
      return;
    }

    if (items.length === 0) {
      router.push("/sepet");
      return;
    }

    // Adresleri yükle (şimdilik boş)
    setAddresses([]);
  }, [status, items, router]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress && addresses.length > 0) {
      toast.error("Lütfen teslimat adresi seçiniz");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        addressId: selectedAddress || "temp-address", // Demo için
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMethod: "iyzico",
        customerNote,
      };

      const response = await axios.post("/api/orders", orderData);
      toast.success("Sipariş başarıyla oluşturuldu!");
      clearCart();
      router.push(`/siparisler/${response.data.id}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Sipariş oluşturulurken hata oluştu"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= 500 ? 0 : 30;
  const tax = subtotal * 0.18;
  const total = subtotal + shippingCost + tax;

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🎮 Promosyon Oyuncak
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Ödeme</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Teslimat Adresi</h2>

              {addresses.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-4">
                    Henüz kayıtlı adresiniz yok
                  </p>
                  <Link
                    href="/hesabim/adresler/yeni"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    + Yeni Adres Ekle
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block border-2 rounded-lg p-4 cursor-pointer transition ${
                        selectedAddress === address.id
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="mr-3"
                      />
                      <span className="font-semibold">{address.title}</span>
                      <p className="text-gray-600 text-sm mt-1">
                        {address.address}
                      </p>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Ödeme Yöntemi</h2>
              <div className="border-2 border-primary-600 bg-primary-50 rounded-lg p-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="iyzico"
                    checked
                    readOnly
                    className="mr-3"
                  />
                  <div>
                    <p className="font-semibold">Kredi Kartı ile Ödeme</p>
                    <p className="text-sm text-gray-600">
                      iyzico güvencesiyle güvenli ödeme
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Note */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Sipariş Notu</h2>
              <textarea
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="Siparişiniz hakkında not ekleyebilirsiniz (opsiyonel)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                rows={4}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Ücretsiz</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>KDV (%18)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span className="text-primary-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || (addresses.length > 0 && !selectedAddress)}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "İşleniyor..." : "Siparişi Tamamla"}
              </button>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <p>
                    Ödemeniz SSL sertifikası ile şifrelenmiş ve güvenli bir
                    şekilde işlenir. Kart bilgileriniz saklanmaz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
