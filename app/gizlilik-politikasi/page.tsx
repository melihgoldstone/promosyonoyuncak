import Link from "next/link";

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            🎮 Promosyon Oyuncak
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Giriş</h2>
            <p className="text-gray-700 leading-relaxed">
              Promosyon Oyuncak olarak, gizliliğinize önem veriyoruz. Bu Gizlilik Politikası,
              promosyonoyuncak.com web sitesini kullandığınızda kişisel bilgilerinizin nasıl
              toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Toplanan Bilgiler</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">2.1. Siz Verdiğinizde Topladığımız Bilgiler:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Ad, soyad</li>
                  <li>E-posta adresi</li>
                  <li>Telefon numarası</li>
                  <li>Teslimat ve fatura adresi</li>
                  <li>Ödeme bilgileri (güvenli ödeme sağlayıcısı aracılığıyla)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2.2. Otomatik Olarak Toplanan Bilgiler:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>IP adresi</li>
                  <li>Tarayıcı türü ve versiyonu</li>
                  <li>İşletim sistemi</li>
                  <li>Siteye giriş saati ve süresi</li>
                  <li>Görüntülenen sayfalar</li>
                  <li>Çerez bilgileri</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Bilgilerin Kullanım Amaçları</h2>
            <p className="text-gray-700 mb-3">Topladığımız bilgiler aşağıdaki amaçlarla kullanılmaktadır:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Sipariş işlemlerini gerçekleştirmek ve size ürünleri göndermek</li>
              <li>Müşteri hesabınızı yönetmek</li>
              <li>Müşteri hizmetleri sağlamak ve sorularınızı yanıtlamak</li>
              <li>Sipariş durumu ve teslimat hakkında bilgi vermek</li>
              <li>Ödeme işlemlerini güvenli bir şekilde gerçekleştirmek</li>
              <li>Site güvenliğini sağlamak ve dolandırıcılığı önlemek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              <li>İzniniz dahilinde pazarlama iletişimleri göndermek</li>
              <li>Hizmetlerimizi geliştirmek ve kullanıcı deneyimini iyileştirmek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Bilgilerin Paylaşımı</h2>
            <p className="text-gray-700 mb-3">Bilgileriniz aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:</p>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">4.1. Hizmet Sağlayıcılar:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li><strong>Ödeme İşlemcileri:</strong> Güvenli ödeme işlemleri için (iyzico)</li>
                  <li><strong>Kargo Şirketleri:</strong> Ürün teslimatı için</li>
                  <li><strong>E-posta Servisleri:</strong> Bildirim e-postaları göndermek için</li>
                  <li><strong>Bulut Hizmet Sağlayıcıları:</strong> Veri saklama için</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">4.2. Yasal Zorunluluklar:</h3>
                <p className="text-gray-700">
                  Yasal bir zorunluluk olduğunda veya devlet kurumlarının talebi üzerine
                  bilgilerinizi paylaşabiliriz.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Veri Güvenliği</h2>
            <p className="text-gray-700 mb-3">
              Kişisel bilgilerinizin güvenliğini sağlamak için aşağıdaki önlemleri alıyoruz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>SSL/TLS Şifreleme:</strong> Tüm veri transferleri şifrelenir</li>
              <li><strong>Güvenli Ödeme:</strong> PCI DSS standartlarına uygun ödeme altyapısı</li>
              <li><strong>Erişim Kontrolü:</strong> Sınırlı personel erişimi</li>
              <li><strong>Güvenlik Duvarı:</strong> Yetkisiz erişimlere karşı koruma</li>
              <li><strong>Düzenli Yedekleme:</strong> Veri kaybını önlemek için</li>
              <li><strong>Güvenlik Testleri:</strong> Düzenli güvenlik denetimleri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Çerezler (Cookies)</h2>
            <p className="text-gray-700 mb-3">
              Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır:
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold">Zorunlu Çerezler:</h3>
                <p className="text-gray-700">Sitenin çalışması için gerekli çerezler</p>
              </div>
              <div>
                <h3 className="font-semibold">Performans Çerezleri:</h3>
                <p className="text-gray-700">Site performansını ölçmek ve iyileştirmek için</p>
              </div>
              <div>
                <h3 className="font-semibold">İşlevsellik Çerezleri:</h3>
                <p className="text-gray-700">Tercihlerinizi hatırlamak için</p>
              </div>
              <div>
                <h3 className="font-semibold">Pazarlama Çerezleri:</h3>
                <p className="text-gray-700">Kişiselleştirilmiş reklamlar için (onayınız ile)</p>
              </div>
            </div>
            <p className="text-gray-700 mt-3">
              Detaylı bilgi için <Link href="/cerez-politikasi" className="text-primary-600 hover:underline">Çerez Politikası</Link> sayfasını ziyaret edebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Haklarınız</h2>
            <p className="text-gray-700 mb-3">KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Verilerinize erişim talep etme</li>
              <li>Verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini isteme</li>
              <li>Pazarlama iletişimlerinden çıkma</li>
              <li>Hesabınızı kapatma</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Bu hakları kullanmak için <strong>kvkk@promosyonoyuncak.com</strong> adresine e-posta gönderebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Veri Saklama Süresi</h2>
            <p className="text-gray-700">
              Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve yasal
              saklama yükümlülüklerimiz çerçevesinde saklanır. Yasal zorunluluklar:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>Faturalar: 10 yıl (Vergi Usul Kanunu)</li>
              <li>Ticari kayıtlar: 10 yıl (Türk Ticaret Kanunu)</li>
              <li>Diğer veriler: Amaç ortadan kalktığında silinir</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Üçüncü Taraf Bağlantıları</h2>
            <p className="text-gray-700">
              Sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu sitelerin gizlilik
              uygulamalarından sorumlu değiliz. Bu siteleri ziyaret ettiğinizde kendi gizlilik
              politikalarını incelemenizi öneririz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Çocukların Gizliliği</h2>
            <p className="text-gray-700">
              Sitemiz 18 yaş altındaki çocuklara yönelik değildir. Bilerek 18 yaş altındaki
              kişilerden kişisel bilgi toplamayız. Eğer bir ebeveyn veya vasi olarak, çocuğunuzun
              bize kişisel bilgi verdiğini düşünüyorsanız, lütfen bizimle iletişime geçin.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Politika Değişiklikleri</h2>
            <p className="text-gray-700">
              Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda
              sizi e-posta ile bilgilendireceğiz. Son güncelleme tarihini bu sayfanın altında
              bulabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. İletişim</h2>
            <p className="text-gray-700 mb-3">
              Gizlilik Politikamız hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>E-posta:</strong> kvkk@promosyonoyuncak.com<br />
                <strong>Telefon:</strong> +90 (XXX) XXX XX XX<br />
                <strong>Adres:</strong> [Şirket Adresi]
              </p>
            </div>
          </section>

          <div className="pt-6 border-t">
            <p className="text-gray-600 mb-4">
              <strong>Son Güncelleme:</strong> 05.11.2024
            </p>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
