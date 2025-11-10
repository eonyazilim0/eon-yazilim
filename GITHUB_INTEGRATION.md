# GitHub'a Değişiklikleri Entegre Etme Rehberi

Bu proje deposundaki güncellenmiş web sitesi dosyalarını GitHub hesabınıza göndermek için aşağıdaki adımları izleyin.

## 1. Yerel depoyu yapılandırın
1. Terminal veya komut istemcisini açın ve bu proje klasörüne gidin:
   ```bash
   cd /path/to/eon-yazilim
   ```
2. Git deposunu başlatın (daha önce başlatılmadıysa):
   ```bash
   git init
   ```
3. GitHub üzerindeki uzak depoyu `origin` adıyla ekleyin (kendi GitHub URL'inizi kullanın):
   ```bash
   git remote add origin https://github.com/<kullanici-adi>/<depo-adi>.git
   ```

## 2. Dosyaları hazırlayın ve commit oluşturun
1. Tüm dosyaları aşamaya alın:
   ```bash
   git add .
   ```
2. Açıklayıcı bir commit mesajı ile commit oluşturun:
   ```bash
   git commit -m "Güncellenmiş web sitesi ve GitHub Pages iş akışı"
   ```

## 3. GitHub Pages yapılandırmasını doğrulayın
1. GitHub deposunda `Settings > Pages` bölümüne gidin.
2. `Build and deployment` kısmında `Source` olarak "GitHub Actions" seçildiğinden emin olun.
3. Workflow dosyası `.github/workflows/deploy.yml` içinde yer almalı ve ana (örn. `main`) branch'e gönderimlerde çalışmalıdır.

## 4. Değişiklikleri GitHub'a gönderin
1. Varsayılan branch adınız `main` ise, önce yerel branch'inizi oluşturun (gerekirse):
   ```bash
   git checkout -b main
   ```
2. Commit'lerinizi GitHub'a gönderin:
   ```bash
   git push -u origin main
   ```

## 5. Yayını kontrol edin
1. GitHub Actions sekmesine giderek workflow'un başarılı çalıştığını doğrulayın.
2. İşlem tamamlandığında GitHub Pages URL'nize giderek web sitesinin güncellendiğini kontrol edin.

## 6. Takip eden güncellemeler
- Yeni değişiklikler yaptığınızda yalnızca `git add`, `git commit` ve `git push` adımlarını tekrarlamanız yeterlidir.
- Deponuzda birden fazla branch kullanıyorsanız, workflow dosyasındaki `on.push.branches` alanını ihtiyacınıza göre güncelleyin.

Bu adımları uygulayarak projedeki yeni web sitesi ve GitHub Pages iş akışı değişikliklerini GitHub hesabınıza başarılı bir şekilde entegre edebilirsiniz.
