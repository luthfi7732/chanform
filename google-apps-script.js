/**
 * Google Apps Script untuk integrasi Google Spreadsheet
 *
 * INSTRUKSI PENGGUNAAN:
 * 1. Buka https://script.google.com
 * 2. Buat project baru
 * 3. Hapus semua kode yang ada
 * 4. Copy paste kode ini
 * 5. Ganti SHEET_ID dengan ID spreadsheet Anda
 * 6. Deploy sebagai web app
 */

// ID Google Spreadsheet (dapat dari URL)
const SHEET_ID =
  "14hjAcG_Bg3LycnNa-9-LeRklPfc9_-3noRk1CdkkzE4"; // Ganti dengan ID spreadsheet Anda

// Nama sheet (default: Form Responses)
const SHEET_NAME = "Form Responses";

// Fungsi utama untuk menangani POST request
function doPost(e) {
  try {
    // Parse data dari request
    const data = JSON.parse(e.postData.contents);

    // Ambil atau buat sheet
    const sheet = getOrCreateSheet();

    // Tambahkan timestamp
    const timestamp = new Date();

    // Siapkan data untuk ditulis
    const rowData = [
      timestamp,
      data.nama || "",
      data.tanggalLahir || "",
      data.lokasiStandby || "",
      data.nomorTelepon || "",
      data.ijazah || "",
      data.jabatan || "",
      data.kapal || "",
      data.sertifikat || "",
      data.daerahKapal || "",
    ];

    // Tambahkan baris baru
    sheet.appendRow(rowData);

    // Kirim response sukses
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data berhasil disimpan" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error:", error);

    // Kirim response error
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk mendapatkan atau membuat sheet
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    // Buat sheet baru jika belum ada
    sheet = spreadsheet.insertSheet(SHEET_NAME);

    // Tambahkan header
    const headers = [
      "Timestamp",
      "Nama Lengkap",
      "Tanggal Lahir",
      "Lokasi Standby",
      "Nomor Telepon",
      "Ijazah",
      "Jabatan",
      "Kapal",
      "Sertifikat",
      "Daerah Kapal",
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1e3a8a");
    headerRange.setFontColor("white");

    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}

// Fungsi untuk testing (GET request)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ message: "Google Apps Script is running!" })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Fungsi untuk setup awal (jalankan sekali saja)
function setupSpreadsheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = getOrCreateSheet();

  // Setup conditional formatting
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const range = sheet.getRange(2, 1, lastRow - 1, 8);

    // Format tanggal
    const dateRange = sheet.getRange(2, 2, lastRow - 1, 1);
    dateRange.setNumberFormat("dd/mm/yyyy");

    // Format telepon sebagai teks
    const phoneRange = sheet.getRange(2, 5, lastRow - 1, 1);
    phoneRange.setNumberFormat("@");
  }

  Logger.log("Spreadsheet setup completed");
}

// Fungsi untuk mendapatkan semua data (untuk debugging)
function getAllData() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  return data;
}

// Fungsi untuk menghapus semua data (hati-hati!)
function clearAllData() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
}

// Konfigurasi CORS
function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
