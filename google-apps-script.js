const SHEET_ID = "14hjAcG_Bg3LycnNa-9-LeRklPfc9_-3noRk1CdkkzE4"; // Ganti dengan ID Spreadsheet kamu
const SHEET_NAME = "Form Responses";

// Fungsi untuk membuat atau ambil sheet
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
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
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet
      .getRange(1, 1, 1, headers.length)
      .setBackground("#1e3a8a")
      .setFontColor("white");
  }
  return sheet;
}

// Handle OPTIONS (CORS preflight)
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Handle POST request dari website
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    const timestamp = new Date();

    sheet.appendRow([
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
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data berhasil disimpan" })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.toString() })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// Handle GET request untuk testing
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "Google Apps Script is running" })
  )
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}
