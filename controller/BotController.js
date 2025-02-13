const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");
const caraPemesanan = require("../locales/cara_pemesanan.json");
const hargaAllMovie = require("../locales/harga_all_movie.json");
const hargaPromoFnb = require("../locales/harga_promo_fnb.json");
const formatPemesanan = require("../locales/format_pemesanan.json");
const saluranTestiInfo = require("../locales/saluran_testi_info.json");
const caraScanTiket = require("../locales/cara_scan_tiket.json");

module.exports = class BotController extends Controller {

    async introduction(request) {
        return Response.menu.fromArrayOfString(
            [
                f("menu.caraPemesanan"),
                f("menu.hargaAllMovie"),
                f("menu.hargaPromoFnb"),
                f("menu.formatPemesanan"),
                f("menu.saluranTestiInfo"),
                f("menu.caraScanTiket")
            ],
            `Halo kak ${request.name}, kenalin aku bot admin Wulan. Berikut layanan kami:`,
            f("template.menu")
        );
    }

    async caraPemesanan(request) {
        let message = `🔮 ${caraPemesanan.title} 🔮\n\n`;
        caraPemesanan.steps.forEach((step, index) => {
            message += `${index + 1}. ${step}\n`;
        });
        return this.reply(message);
    }

    async hargaAllMovie(request) {
        let message = `🔮 ${hargaAllMovie.title} 🔮\n\n`;
        message += `${hargaAllMovie.description}\n\n`;
        message += `Periode Promo: ${hargaAllMovie.periodePromo}\n`;
        message += `Tanggal Nonton: ${hargaAllMovie.tanggalNonton}\n\n`;
        message += `DETAIL HARGA:\n`;
        hargaAllMovie.harga.forEach((item) => {
            message += `${item.normal} => ${item.promo}\n`;
        });
        message += `\n${hargaAllMovie.catatan}`;
        return this.reply(message);
    }

    async hargaPromoFnb(request) {
        let message = `🔥🔥 ${hargaPromoFnb.title} 🔥🔥\n\n`;
        hargaPromoFnb.items.forEach((item) => {
            message += `${item.nama}: ${item.harga}\n`;
            if (item.deskripsi) {
                message += `   ${item.deskripsi}\n`;
            }
        });
        message += `\n${hargaPromoFnb.catatan}`;
        return this.reply(message);
    }

    async formatPemesanan(request) {
        let message = `🔮 ${formatPemesanan.title} 🔮\n\n`;
        formatPemesanan.fields.forEach((field) => {
            message += `${field.label}: ${field.value}\n`;
        });
        message += `\n${formatPemesanan.catatan}`;
        return this.reply(message);
    }

    async saluranTestiInfo(request) {
        return this.reply(saluranTestiInfo.link);
    }

    async caraScanTiket(request) {
        let message = `🔮 ${caraScanTiket.title} 🔮\n\n`;
        caraScanTiket.steps.forEach((step, index) => {
            message += `${index + 1}. ${step}\n`;
        });
        message += `\n${caraScanTiket.catatan}`;
        return this.reply(message);
    }
}