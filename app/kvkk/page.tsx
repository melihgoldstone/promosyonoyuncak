import Link from "next/link";

export default function KVKKPage() {
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
        <h1 className="text-4xl font-bold mb-8">
          Kişisel Verilerin Korunması ve İşlenmesi Politikası (KVKK)
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Giriş</h2>
            <p className="text-gray-700 leading-relaxed">
              Promosyon Oyuncak olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")
              kapsamında kişisel verilerinizin güvenliğine önem veriyoruz. Bu politika, kişisel
              verilerinizin nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Veri Sorumlusu</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Ünvan:</strong> Promosyon Oyuncak<br />
                <strong>Adres:</strong> [Şirket Adresi]<br />
                <strong>E-posta:</strong> kvkk@promosyonoyuncak.com<br />
                <strong>Telefon:</strong> +90 (XXX) XXX XX XX
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. İşlenen Kişisel Veriler</h2>
            <p className="text-gray-700 mb-3">Aşağıdaki kişisel verileriniz işlenmektedir:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (fatura için)</li>
              <li><strong>İletişim Bilgileri:</strong> E-posta, telefon, adres</li>
              <li><strong>Müşteri İşlem Bilgileri:</strong> Sipariş geçmişi, ödeme bilgileri</li>
              <li><strong>Finansal Bilgiler:</strong> Banka/kredi kartı bilgileri (şifrelenmiş)</li>
              <li><strong>Pazarlama Bilgileri:</strong> İlgi alanları, tercihler</li>
              <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, çerez bilgileri, cihaz bilgileri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Kişisel Verilerin İşlenme Amaçları</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Sipariş işlemlerinin gerçekleştirilmesi ve takibi</li>
              <li>Ödeme işlemlerinin güvenli bir şekilde yürütülmesi</li>
              <li>Müşteri hizmetleri ve destek sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi (fatura, kayıt tutma)</li>
              <li>Pazarlama ve iletişim faaliyetleri (onay vermeniz halinde)</li>
              <li>Site güvenliği ve dolandırıcılık önleme</li>
              <li>Hizmet kalitesinin geliştirilmesi ve analiz</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Kişisel Verilerin Aktarımı</h2>
            <p className="text-gray-700 mb-3">
              Kişisel verileriniz aşağıdaki durumlarda üçüncü kişilerle paylaşılabilir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ödeme kuruluşları (iyzico, banka vb.) ile güvenli ödeme işlemleri için</li>
              <li>Kargo şirketleri ile teslimat için</li>
              <li>Hukuki zorunluluk halinde resmi kurumlarla</li>
              <li>Fatura ve muhasebe hizmetleri için mali müşavirlik firmaları ile</li>
              <li>Bulut hizmet sağlayıcıları ile veri saklama amaçlı</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Kişisel Veri Sahibinin Hakları</h2>
            <p className="text-gray-700 mb-3">KVKK Kanunu kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>KVKK'da öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme, silme veya yok edilme taleplerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Başvuru Yöntemi</h2>
            <p className="text-gray-700 mb-3">
              Yukarıdaki haklarınızı kullanmak için aşağıdaki kanallardan başvuruda bulunabilirsiniz:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>E-posta:</strong> kvkk@promosyonoyuncak.com<br />
                <strong>Posta:</strong> [Şirket Adresi]<br />
                <strong>Başvuru Formu:</strong> <Link href="/kvkk-basvuru" className="text-primary-600 hover:underline">KVKK Başvuru Formu</Link>
              </p>
            </div>
            <p className="text-gray-700 mt-3">
              Başvurularınız en geç 30 gün içerisinde ücretsiz olarak sonuçlandırılacaktır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Veri Güvenliği</h2>
            <p className="text-gray-700">
              Kişisel verilerinizin güvenliği için teknik ve idari tedbirler alınmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
              <li>SSL/TLS şifreleme ile güvenli veri iletimi</li>
              <li>Güvenlik duvarı ve saldırı tespit sistemleri</li>
              <li>Düzenli güvenlik denetimleri</li>
              <li>Erişim yetkilendirme ve log kayıtları</li>
              <li>Ödeme bilgilerinin PCI DSS standartlarına uygun işlenmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Çerezler (Cookies)</h2>
            <p className="text-gray-700">
              Sitemizde kullanıcı deneyimini iyileştirmek ve analiz yapmak için çerezler kullanılmaktadır.
              Detaylı bilgi için <Link href="/cerez-politikasi" className="text-primary-600 hover:underline">Çerez Politikası</Link> sayfasını inceleyebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Politika Değişiklikleri</h2>
            <p className="text-gray-700">
              Bu politika gerektiğinde güncellenebilir. Değişiklikler bu sayfa üzerinden yayınlanacak
              ve önemli değişiklikler için e-posta ile bilgilendirme yapılacaktır.
            </p>
            <p className="text-gray-600 mt-4">
              <strong>Son Güncelleme:</strong> 05.11.2024
            </p>
          </section>

          <div className="pt-6 border-t">
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
