# Gün Projesi: Login Formu E2E Testi
Yeni başlayan bir projenin setup'ını yapmak ve login sayfasını hazırlamak sana düştü. 3 ana görevin var: Proje oluşturmak, test yazmak ve projeyi githuba yüklemek.

Bu görevleri bitirdiğinde, github adresini örnek formattaki gibi index.js dosyasına yazmayı unutma.

1. Proje oluşturulacak

Projeyi kendi bilgisayarınızda sıfırdan oluşturarak yapacaksın. (Tercihen vite ile)
Uygulamanızda bir Login formu (Login.jsx) ve geçici bir success sayfası (Success.jsx) olacak.
Componentleri "components" klasöründe oluşturmaya dikkat.
Login formu: email, şifre ve şartları kabul ediyorum alanından oluşacak.
Form alanları için validasyonlar eklenecek:
geçerli email (regex kullanılabilir),
strong password (regex kullanılabilir)
ve şartları kabul etmesi gerekecek.
tüm validasyonları geçer ise login butonu aktif olacak.
2. Cypress ile de 2 farklı senaryoda test yazılacak:

a) Başarılı form doldurulduğunda submit edebiliyorum:

success sayfasını açabiliyorum.
b) Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor.

1. email yanlış girdim:

- ekranda 1 tane hata mesajı var
- ekranda doğru hata mesajı var
- buton disabled durumda
- email ve password yanlış

- ekranda 2 tane hata mesajı var
- ekranda password hata mesajı var
- email ve password doğru ama kuralları kabul etmedim.

2. buton disabled mı
3. projeyi github’a yükleyeceksin

- public olsun
- en az 4 commit olsun
- proje setup’ı bitince
- login sayfası ve success sayfası bitince
- form validasyonları eklenince
- testler eklenince in your project.
