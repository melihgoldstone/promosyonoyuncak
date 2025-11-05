import Link from "next/link";

export default function CerezPolitikasiPage() {
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
        <h1 className="text-4xl font-bold mb-8">Çerez Politikası</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Çerez Nedir?</h2>
            <p className="text-gray-700 leading-relaxed">
              Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla
              cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitelerinin daha
              verimli çalışmasını sağlar ve site sahiplerine önemli bilgiler sunar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Çerez Kullanımı</h2>
            <p className="text-gray-700 mb-3">
              promosyonoyuncak.com olarak, web sitemizde çeşitli amaçlarla çerez kullanmaktayız.
              Bu politika, hangi çerezleri kullandığımızı ve bunları neden kullandığımızı açıklar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Kullandığımız Çerez Türleri</h2>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-semibold mb-2">3.1. Zorunlu Çerezler</h3>
                <p className="text-gray-700 mb-2">
                  Web sitesinin temel işlevlerini yerine getirmesi için gerekli olan çerezlerdir.
                  Bu çerezler olmadan site düzgün çalışamaz.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                  <li><strong>Oturum çerezleri:</strong> Sitede gezinirken oturumunuzu korur</li>
                  <li><strong>Güvenlik çerezleri:</strong> Güvenlik özelliklerini etkinleştirir</li>
                  <li><strong>Yük dengeleme çerezleri:</strong> Trafiği sunucular arasında dağıtır</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h3 className="font-semibold mb-2">3.2. Fonksiyonel Çerezler</h3>
                <p className="text-gray-700 mb-2">
                  Tercihlerinizi hatırlayarak daha kişiselleştirilmiş bir deneyim sunar.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                  <li><strong>Dil tercihi:</strong> Seçtiğiniz dili hatırlar</li>
                  <li><strong>Sepet çerezleri:</strong> Sepetinizdeki ürünleri saklar</li>
                  <li><strong>Kullanıcı tercihleri:</strong> Görünüm ayarlarınızı korur</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h3 className="font-semibold mb-2">3.3. Performans ve Analitik Çerezler</h3>
                <p className="text-gray-700 mb-2">
                  Sitemizin nasıl kullanıldığını anlamamıza ve iyileştirmemize yardımcı olur.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                  <li><strong>Google Analytics:</strong> Ziyaretçi istatistikleri</li>
                  <li><strong>Sayfa görüntüleme:</strong> Hangi sayfaların popüler olduğunu gösterir</li>
                  <li><strong>Hata takibi:</strong> Teknik sorunları tespit eder</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <h3 className="font-semibold mb-2">3.4. Hedefleme ve Reklam Çerezleri</h3>
                <p className="text-gray-700 mb-2">
                  İlgi alanlarınıza göre kişiselleştirilmiş reklamlar göstermek için kullanılır.
                  (Onayınız ile)
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                  <li><strong>Reklam tercihleri:</strong> İlginizi çekebilecek ürünleri gösterir</li>
                  <li><strong>Yeniden pazarlama:</strong> Ziyaret ettiğiniz ürünleri hatırlatır</li>
                  <li><strong>Sosyal medya çerezleri:</strong> İçerik paylaşımı için</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Kullandığımız Belirli Çerezler</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Çerez Adı</th>
                    <th className="border px-4 py-2 text-left">Tür</th>
                    <th className="border px-4 py-2 text-left">Süre</th>
                    <th className="border px-4 py-2 text-left">Amaç</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border px-4 py-2">session_id</td>
                    <td className="border px-4 py-2">Zorunlu</td>
                    <td className="border px-4 py-2">Oturum</td>
                    <td className="border px-4 py-2">Kullanıcı oturumu yönetimi</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">cart_token</td>
                    <td className="border px-4 py-2">Fonksiyonel</td>
                    <td className="border px-4 py-2">7 gün</td>
                    <td className="border px-4 py-2">Sepet içeriğini saklama</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">_ga</td>
                    <td className="border px-4 py-2">Analitik</td>
                    <td className="border px-4 py-2">2 yıl</td>
                    <td className="border px-4 py-2">Google Analytics ziyaretçi takibi</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">_gid</td>
                    <td className="border px-4 py-2">Analitik</td>
                    <td className="border px-4 py-2">24 saat</td>
                    <td className="border px-4 py-2">Google Analytics oturum takibi</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">preferences</td>
                    <td className="border px-4 py-2">Fonksiyonel</td>
                    <td className="border px-4 py-2">1 yıl</td>
                    <td className="border px-4 py-2">Kullanıcı tercihlerini saklama</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Üçüncü Taraf Çerezleri</h2>
            <p className="text-gray-700 mb-3">
              Bazı çerezler, sitemizde kullandığımız üçüncü taraf hizmetler tarafından yerleştirilir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Google Analytics:</strong> Site kullanım istatistikleri için
                <br />
                <span className="text-sm text-gray-600">
                  Daha fazla bilgi:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Google Gizlilik Politikası
                  </a>
                </span>
              </li>
              <li>
                <strong>Facebook Pixel:</strong> Sosyal medya reklamları için
                <br />
                <span className="text-sm text-gray-600">
                  Daha fazla bilgi:{" "}
                  <a
                    href="https://www.facebook.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Facebook Gizlilik Politikası
                  </a>
                </span>
              </li>
              <li>
                <strong>iyzico:</strong> Ödeme işlemleri için
                <br />
                <span className="text-sm text-gray-600">
                  Güvenli ödeme altyapısı sağlayıcımız
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Çerez Tercihlerinizi Yönetme</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">6.1. Tarayıcı Ayarları:</h3>
                <p className="text-gray-700 mb-2">
                  Çoğu tarayıcı varsayılan olarak çerezleri kabul eder, ancak çerezleri reddetmek
                  veya belirli çerezleri silmek için tarayıcı ayarlarınızı değiştirebilirsiniz.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/tr/kb/cerezleri-etkinlestirme-ve-devre-disi-birakma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/tr-tr/microsoft-edge/cerezleri-microsoft-edge-tarayicisinda-silme-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Önemli Not:</strong> Çerezleri devre dışı bırakırsanız, sitemizin bazı
                  özellikleri düzgün çalışmayabilir. Özellikle zorunlu çerezleri engellemek,
                  alışveriş yapmanızı engelleyebilir.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6.2. Çerez Yönetim Paneli:</h3>
                <p className="text-gray-700 mb-3">
                  Sitemiz üzerinden çerez tercihlerinizi yönetebilirsiniz:
                </p>
                <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
                  Çerez Tercihlerini Yönet
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Çerez Süresi</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold">Oturum Çerezleri:</h3>
                <p className="text-gray-700">
                  Tarayıcıyı kapattığınızda otomatik olarak silinir.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Kalıcı Çerezler:</h3>
                <p className="text-gray-700">
                  Belirli bir süre boyunca veya siz manuel olarak silene kadar cihazınızda kalır.
                  Süreler çerez türüne göre değişir (1 gün ile 2 yıl arası).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Çerezlerin Yasal Dayanağı</h2>
            <p className="text-gray-700">
              Çerezlerin kullanımı 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve
              Elektronik Ticaretin Düzenlenmesi Hakkında Kanun kapsamında düzenlenmektedir.
              Zorunlu çerezler dışındaki çerezler için açık rızanız alınmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Politika Güncellemeleri</h2>
            <p className="text-gray-700">
              Bu Çerez Politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada
              yayınlanacak ve önemli değişiklikler için size bildirim yapılacaktır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. İletişim</h2>
            <p className="text-gray-700 mb-3">
              Çerez Politikamız hakkında sorularınız için:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>E-posta:</strong> kvkk@promosyonoyuncak.com<br />
                <strong>Telefon:</strong> +90 (XXX) XXX XX XX
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
