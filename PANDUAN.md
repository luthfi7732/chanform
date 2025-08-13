# Panduan Lengkap: Formulir Pendaftaran PT RYANINDO GLOBAL SAMUDERA

## Daftar Isi
1. [Pengenalan](#pengenalan)
2. [Setup Google Spreadsheet](#setup-google-spreadsheet)
3. [Setup Google Apps Script](#setup-google-apps-script)
4. [Konfigurasi Website](#konfigurasi-website)
5. [Deploy ke Netlify](#deploy-ke-netlify)
6. [Troubleshooting](#troubleshooting)

---

## Pengenalan

Website ini adalah formulir pendaftaran profesional untuk PT RYANINDO GLOBAL SAMUDERA dengan fitur:
- ✅ Desain responsif dan profesional
- ✅ Integrasi langsung dengan Google Spreadsheet
- ✅ Tidak memerlukan hosting berbayar
- ✅ Validasi data real-time
- ✅ Notifikasi sukses/error

---

## Setup Google Spreadsheet

### Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **"+ Blank"** untuk membuat spreadsheet baru
3. Rename sheet menjadi **"Form Responses"**

### Langkah 2: Setup Header Kolom
Copy paste header berikut ke baris pertama (A1-I1):
```
Timestamp | Nama Lengkap | Tanggal Lahir | Lokasi Standby | Nomor Telepon | Ijazah | Sertifikat | Daerah Kapal
```

### Langkah 3: Dapatkan Spreadsheet ID
- URL akan terlihat seperti: `https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit`
- ID adalah bagian antara `/d/` dan `/edit`
- Contoh: `1ABC123xyz...`

---

## Setup Google Apps Script

### Langkah 1: Buat Project Baru
1. Buka [Google Apps Script](https://script.google.com)
2. Klik **"New Project"**
3. Hapus semua kode yang ada
4. Copy paste seluruh kode dari `google-apps-script.js`

### Langkah 2: Konfigurasi Script
1. Ganti `YOUR_SPREADSHEET_ID_HERE` dengan ID spreadsheet Anda
2. Pastikan SHEET_NAME sesuai dengan nama sheet Anda

### Langkah 3: Deploy Web App
1. Klik **"Deploy"** → **"New deployment"**
2. Pilih **"Web app"**
3. Konfigurasi:
   - **Description**: Formulir Pendaftaran Ryanindo
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Klik **"Deploy"**
5. Copy **Web app URL** (akan digunakan di website)

---

## Konfigurasi Website

### Langkah 1: Update Script.js
1. Buka `script.js`
2. Ganti `YOUR_SCRIPT_ID_HERE` dengan ID dari Google Apps Script
3. Contoh:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec';
   ```

### Langkah 2: Test Website
1. Buka `index.html` di browser
2. Isi formulir dengan data dummy
3. Klik "Kirim Formulir"
4. Cek Google Spreadsheet untuk melihat data masuk

---

## Deploy ke Netlify

### Metode 1: Upload Manual
1. Kompres folder `ryanindo-form` menjadi ZIP
2. Buka [Netlify](https://netlify.com)
3. Drag & drop file ZIP ke area deploy
4. Site akan otomatis live dengan URL unik

### Metode 2: GitHub Integration
1. Buat repository baru di GitHub
2. Upload semua file ke repository
3. Login ke Netlify
4. Connect dengan GitHub
5. Pilih repository dan deploy

### Metode 3: CLI (Advanced)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir ryanindo-form
```

---

## Konfigurasi Lanjutan

### Custom Domain (Opsional)
1. Di Netlify dashboard → Domain Management
2. Add custom domain
3. Setup DNS sesuai instruksi

### Email Notifikasi
1. Tambahkan fungsi `sendNotificationEmail()` di Google Apps Script
2. Ganti email address dengan email admin

### Backup Otomatis
1. Setup Google Drive API
2. Tambahkan fungsi backup ke Google Apps Script

---

## Troubleshooting

### Error: "Script function not found"
- Pastikan fungsi `doPost()` ada di Google Apps Script
- Deploy ulang web app

### Error: "Permission denied"
- Pastikan spreadsheet sharing setting: "Anyone with the link can edit"
- Atau gunakan service account

### Data tidak masuk ke spreadsheet
- Cek console log di browser
- Pastikan Google Apps Script URL benar
- Cek permission di Google Apps Script

### Form tidak responsive di mobile
- Pastikan viewport meta tag ada di HTML
- Test dengan Chrome DevTools

---

## Maintenance

### Update Data
- Edit langsung di Google Spreadsheet
- Atau edit kode dan redeploy

### Backup
- Export Google Spreadsheet secara berkala
- Backup kode di GitHub

### Monitoring
- Gunakan Google Analytics untuk tracking
- Setup Google Search Console

---

## Kontak Support

Untuk bantuan teknis:
- Email: support@ryanindo.com
- WhatsApp: +62 8xx-xxxx-xxxx

---

## Lisensi
Proyek ini open-source untuk keperluan internal PT RYANINDO GLOBAL SAMUDERA
