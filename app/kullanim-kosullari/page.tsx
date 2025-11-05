import Link from "next/link";

export default function KullanimKosullariPage() {
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
        <h1 className="text-4xl font-bold mb-8">Kullanım Koşulları</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Kabul Beyanı</h2>
            <p className="text-gray-700 leading-relaxed">
              promosyonoyuncak.com web sitesini kullanarak, işbu Kullanım Koşullarını okuduğunuzu,
              anladığınızı ve kabul ettiğinizi beyan edersiniz. Bu koşulları kabul etmiyorsanız,
              lütfen sitemizi kullanmayınız.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Tanımlar</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Site:</strong> promosyonoyuncak.com web sitesi</li>
              <li><strong>Kullanıcı:</strong> Siteyi ziyaret eden veya kullanan kişi</li>
              <li><strong>Üye:</strong> Siteye kayıt olmuş kullanıcı</li>
              <li><strong>Şirket:</strong> Promosyon Oyuncak</li>
              <li><strong>Ürün:</strong> Sitede satışa sunulan mal ve hizmetler</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Sözleşme Konusu</h2>
            <p className="text-gray-700 leading-relaxed">
              İşbu sözleşmenin konusu, Şirket'in sahibi olduğu internet sitesinin kullanımı ile
              ilgili tarafların hak ve yükümlülüklerinin belirlenmesidir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Üyelik ve Hesap Güvenliği</h2>
            <div className="space-y-3">
              <h3 className="font-semibold">4.1. Üyelik Koşulları:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Üye olmak için 18 yaşını doldurmuş olmalısınız</li>
                <li>Kayıt sırasında doğru ve güncel bilgiler vermelisiniz</li>
                <li>Bir kişi yalnızca bir hesap oluşturabilir</li>
                <li>Şirket, herhangi bir gerekçe göstermeksizin üyeliği askıya alma veya sonlandırma hakkını saklı tutar</li>
              </ul>
              <h3 className="font-semibold mt-4">4.2. Hesap Güvenliği:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Şifrenizi gizli tutmaktan siz sorumlusunuz</li>
                <li>Hesabınızda gerçekleşen tüm faaliyetlerden siz sorumlusunuz</li>
                <li>Yetkisiz bir kullanım fark ederseniz derhal bize bildirmelisiniz</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Kullanıcı Yükümlülükleri</h2>
            <p className="text-gray-700 mb-3">Siteyi kullanırken aşağıdaki kurallara uymalısınız:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Yasal olmayan hiçbir amaç için siteyi kullanmayacaksınız</li>
              <li>Sitenin güvenliğini tehlikeye atacak eylemlerden kaçınacaksınız</li>
              <li>Virüs, truva atı veya zararlı yazılım yüklemeyeceksiniz</li>
              <li>Başkalarının kişisel bilgilerini toplamaya çalışmayacaksınız</li>
              <li>Site içeriğini izinsiz kopyalamayacak veya dağıtmayacaksınız</li>
              <li>Spam veya istenmeyen ticari iletişim göndermeyeceksiniz</li>
              <li>Yanıltıcı veya sahte bilgi vermeyeceksiniz</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Fikri Mülkiyet Hakları</h2>
            <p className="text-gray-700 mb-3">
              Sitedeki tüm içerik (metin, grafik, logo, ikon, görüntü, ses, video, yazılım)
              Şirket'in veya lisans verenlerin mülkiyetindedir ve telif hakkı yasaları ile korunmaktadır.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ticari amaçla kullanım yasaktır</li>
              <li>İzinsiz kopyalama, dağıtma veya değiştirme yasaktır</li>
              <li>Marka ve logolarımızı izinsiz kullanamazsınız</li>
              <li>Kişisel, ticari olmayan kullanım için sınırlı izin verilmiştir</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Ürün Bilgileri ve Fiyatlar</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ürün açıklamaları ve görseller olabildiğince doğru sunulur, ancak hatalar olabilir</li>
              <li>Fiyatlar önceden haber verilmeksizin değiştirilebilir</li>
              <li>Stok durumu anlık olarak değişebilir</li>
              <li>Açık yazım veya fiyatlama hatası durumunda siparişi iptal etme hakkımız vardır</li>
              <li>Promosyonlar belirtilen süre ve koşullar dahilinde geçerlidir</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Sipariş ve Ödeme</h2>
            <div className="space-y-3">
              <h3 className="font-semibold">8.1. Sipariş İşlemi:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Sipariş vermek, satın alma teklifi oluşturur</li>
                <li>Şirket, siparişi kabul etme veya reddetme hakkını saklı tutar</li>
                <li>Sipariş onayı e-posta ile gönderilir</li>
                <li>Stok yetersizliği durumunda sipariş iptal edilebilir</li>
              </ul>
              <h3 className="font-semibold mt-4">8.2. Ödeme:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Tüm ödemeler Türk Lirası (TRY) üzerinden yapılır</li>
                <li>Kredi kartı bilgileri güvenli ödeme sağlayıcısı tarafından işlenir</li>
                <li>Ödeme onaylanmadan sipariş işleme alınmaz</li>
                <li>Hatalı veya dolandırıcılık şüphesi olan ödemeler reddedilir</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Teslimat</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Teslimat süreleri tahminidir ve garanti edilmez</li>
              <li>Kargo firması kaynaklı gecikmelerden sorumlu değiliz</li>
              <li>Yanlış adres verilmesi durumunda ek ücret talep edilebilir</li>
              <li>Ürün tesliminde hasar görülürse kargo firmasına tutanak tutturulmalıdır</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. İade ve İptal</h2>
            <p className="text-gray-700">
              İade ve cayma hakkı detayları için{" "}
              <Link href="/mesafeli-satis-sozlesmesi" className="text-primary-600 hover:underline">
                Mesafeli Satış Sözleşmesi
              </Link>{" "}
              sayfasını inceleyiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Sorumluluk Sınırlaması</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Site "olduğu gibi" sunulur, hiçbir garanti verilmez</li>
              <li>Site erişilebilirliği garanti edilmez, kesintiler olabilir</li>
              <li>Üçüncü taraf linklerin içeriğinden sorumlu değiliz</li>
              <li>Sitenin kullanımından kaynaklanan dolaylı zararlardan sorumlu değiliz</li>
              <li>Toplam sorumluluğumuz, ödediğiniz tutarla sınırlıdır</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Gizlilik</h2>
            <p className="text-gray-700">
              Kişisel verilerinizin işlenmesi hakkında detaylı bilgi için{" "}
              <Link href="/gizlilik-politikasi" className="text-primary-600 hover:underline">
                Gizlilik Politikası
              </Link>{" "}
              ve{" "}
              <Link href="/kvkk" className="text-primary-600 hover:underline">
                KVKK Aydınlatma Metni
              </Link>{" "}
              sayfalarını inceleyiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Değişiklikler</h2>
            <p className="text-gray-700">
              Şirket, bu Kullanım Koşullarını herhangi bir zamanda değiştirme hakkını saklı tutar.
              Değişiklikler bu sayfada yayınlanacaktır. Değişikliklerden sonra siteyi kullanmaya
              devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Uyuşmazlıkların Çözümü</h2>
            <p className="text-gray-700">
              İşbu sözleşmeden doğan uyuşmazlıklarda Türkiye Cumhuriyeti yasaları uygulanır.
              Uyuşmazlıkların çözümünde İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
            <p className="text-gray-700 mt-3">
              Tüketici işlemleri için: Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. İletişim</h2>
            <p className="text-gray-700 mb-3">
              Kullanım Koşulları hakkında sorularınız için:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>E-posta:</strong> info@promosyonoyuncak.com<br />
                <strong>Telefon:</strong> +90 (XXX) XXX XX XX<br />
                <strong>Adres:</strong> [Şirket Adresi]
              </p>
            </div>
          </section>

          <div className="pt-6 border-t">
            <p className="text-gray-600 mb-4">
              <strong>Yürürlük Tarihi:</strong> 05.11.2024<br />
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
