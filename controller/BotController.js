const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");
const caraPemesanan = require("../locales/cara_pemesanan.json");
const hargaAllMovie = require("../locales/harga_all_movie.json");
const hargaPromoFnb = require("../locales/harga_promo_fnb.json");
const formatPemesanan = require("../locales/format_pemesanan.json");
const saluranTestiInfo = require("../locales/saluran_testi_info.json");
const caraScanTiket = require("../locales/cara_scan_tiket.json");
const nomorAdmin = require("../locales/nomor_admin.json");
const nomorRekening = require("../locales/nomor_rekening.json");
const catatanPenting = require("../locales/catatan_penting.json");
const promoBerlaku = require("../locales/promo_berlaku.json");

module.exports = class BotController extends Controller {

    // Method untuk menampilkan menu utama
    async introduction(request) {
        return Response.menu.fromArrayOfString(
            [
                f("menu.caraPemesanan"),       // Menu 1: Cara Pemesanan
                f("menu.hargaAllMovie"),       // Menu 2: Harga All Movie CGV
                f("menu.hargaPromoFnb"),       // Menu 3: Harga Promo F&B CGV
                f("menu.formatPemesanan"),     // Menu 4: Format Pemesanan
                f("menu.saluranTestiInfo"),    // Menu 5: Saluran Testi & Info CGV
                f("menu.caraScanTiket"),       // Menu 6: Cara Scan Tiket di CGV
                f("menu.nomorAdmin"),          // Menu 7: Nomor Admin Tiket Wulan
                f("menu.nomorRekening"),       // Menu 8: Nomor Rekening
                f("menu.catatanPenting"),       // Menu 9: Catatan Penting Sebelum Order
                f("menu.promoBerlaku"),       // Menu 10: promo Berlaku dimana saja?
            ],
            `Halo kak ${request.name}, kenalin aku bot admin Wulan. Berikut layanan kami:`, // Pesan pembuka
            f("template.menu") // Template untuk menampilkan menu
        );
    }

    // Method untuk menangani menu "Cara Pemesanan"
    async caraPemesanan(request) {
        let message = `${caraPemesanan.title}\n\n`; // Judul menu
        caraPemesanan.steps.forEach((step) => {    // Loop melalui setiap langkah
            message += `${step}\n`;
        });
        message += `\nLihat gambar panduan di sini: ${caraPemesanan.image}`; // Tambahkan link gambar
        return this.reply(message); // Kirim pesan ke pengguna
    }

    // Method untuk menangani menu "Harga All Movie CGV"
    async hargaAllMovie(request) {
        let message = `🔮 ${hargaAllMovie.title} 🔮\n\n`; // Judul promo
    
        message += `*Film :  ${hargaAllMovie.description.split("\n")[0].replace("*Film: ", "").trim()}*\n`;
        message += `*Periode Promo* ⬇\n${hargaAllMovie.periodePromo.trim()}\n`;
        message += `*Tanggal Nonton* ⬇\n${hargaAllMovie.tanggalNonton.trim()}\n\n`;
    
        // Menampilkan manfaat promo
        message += hargaAllMovie.benefits.join("\n") + "\n\n";
    
        // Bagian detail harga dengan format tabel
        message += `                *DETAIL HARGA* \n`;
        message += ` Harga Normal              Harga Promo\n`;
        message += `        *1 Tiket*                            *2 Tiket*\n`;
    
        hargaAllMovie.harga.forEach((item) => {
            message += `${item.normal.padEnd(20)} =>  ${item.promo}\n`;
        });
    
        // Menambahkan catatan
        message += `\n🔐 KUOTA TERBATAS 🔐\n\n`;
        message += `Catatan :\n`;
        message += hargaAllMovie.catatan.join("\n") + "\n\n";
    
    
        return this.reply(message);
    }
    

    // Method untuk menangani menu "Harga Promo F&B CGV"
    async hargaPromoFnb(request) {
        let message = `${hargaPromoFnb.title}\n`; // Judul menu
        hargaPromoFnb.items.forEach((item) => { // Loop melalui setiap item promo
            message += `*${item.nama}*\n`;
            message += `- Harga ${item.harga}\n`;

            if (item.deskripsi.length > 0) {
                item.deskripsi.forEach((desc) => {
                    message += `${desc}\n`;
                });
            }

            message += `\n`; // Spasi antar item
        });

        // Tambahkan catatan
        message += `\n${hargaPromoFnb.catatan.join("\n")}\n\n`;

        // Tambahkan link gambar
        message += `Lihat gambar menu di sini: ${hargaPromoFnb.image}`;

        return this.reply(message); // Kirim pesan ke pengguna
    }

    // Method untuk menangani menu "Format Pemesanan"
    async formatPemesanan(request) {
        let message = `${formatPemesanan.title}\n\n`; // Judul menu
        
        message += `_${formatPemesanan["sub-title"]}_\n`;
        // Loop melalui setiap field
        formatPemesanan.fields.forEach((field) => {
            message += `${field.label}: ${field.value}\n`;
        });
    
        // Tambahan Paket Nyemil
        message += `\n*Tambahan Paket Nyemil ( Pilih ✅ ) :*\n`;
        formatPemesanan.tambahanPaket.forEach((paket) => {
            message += `- ${paket}\n`;
        });
    
        // Jadwal & Kursi CGV
        message += `\n*Jadwal & Kursi CGV cek link ini*⬇\n`;
        message += `CGV : ${formatPemesanan.jadwalLink}\n`;
        formatPemesanan.kursiInfo.forEach((info) => {
            message += `${info}\n`;
        });
    
        // Pembayaran
        message += `\n----------------------------------\n`;
        message += `*PEMBAYARAN*\n`;
        message += `\n💰 ${formatPemesanan.pembayaran.bank} : ${formatPemesanan.pembayaran.nomor}\n`;
        message += `a/n ${formatPemesanan.pembayaran.atas_nama}\n`;
    
        // Catatan
        message += `\n*NOTE* :\n${formatPemesanan.catatan}`;
    
        return this.reply(message); // Kirim pesan ke pengguna
    }

    // Method untuk menangani menu "Saluran Testi & Info CGV"
    async saluranTestiInfo(request) {
        return this.reply(saluranTestiInfo.link); // Kirim link saluran
    }

    // Method untuk menangani menu "Cara Scan Tiket di CGV"
    async caraScanTiket(request) {
        let message = ` ${caraScanTiket.title} \n\n`; // Judul menu
        caraScanTiket.steps.forEach((step, index) => { // Loop melalui setiap langkah
            message += `${index + 1}. ${step}\n`;
        });
        message += `\n${caraScanTiket.catatan}`; // Tambahkan catatan
        return this.reply(message); // Kirim pesan ke pengguna
    }

    // Method untuk menangani menu "Nomor Admin Tiket Wulan"
    async nomorAdmin(request) {
        let message = `${nomorAdmin.title}\n\n`; // Judul menu
        nomorAdmin.items.forEach((item) => { // Loop melalui setiap nomor admin
            message += `${item.nama}: ${item.nomor}\n`;
        });
        return this.reply(message); // Kirim pesan ke pengguna
    }

    // Method untuk menangani menu "Nomor Rekening"
    async nomorRekening(request) {
        let message = `${nomorRekening.title}\n\n`; // Judul menu
        message += `Bank: ${nomorRekening.bank}\n`; // Nama bank
        message += `Nomor: ${nomorRekening.nomor}\n`; // Nomor rekening
        message += `Atas Nama: ${nomorRekening.atas_nama}`; // Atas nama
        return this.reply(message); // Kirim pesan ke pengguna
    }

    // Method untuk menangani menu "Catatan Penting Sebelum Order"
    async catatanPenting(request) {
        let message = `${catatanPenting.title}\n\n`; // Judul menu
        catatanPenting.catatan.forEach((catatan) => { // Loop melalui setiap catatan
            message += `-${catatan}\n`;
        });
        message += `\nLihat gambar panduan di sini: ${catatanPenting.image}`; // Tambahkan link gambar
        return this.reply(message); // Kirim pesan ke pengguna
    }

    async promoBerlaku(request) {
        let message = `${promoBerlaku.title}\n\n`;
        promoBerlaku.deskripsi.forEach((deskripsi) => {
            message += `${deskripsi}\n`;
        });
        return this.reply(message);
    }
};