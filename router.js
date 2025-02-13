const { Router, Response } = require("pepesan");
const BotController = require("./controller/BotController");
const f = require("./utils/Formatter");

const router = new Router();

router.menu(f("menu.caraPemesanan"), [BotController, "caraPemesanan"]);
router.menu(f("menu.hargaAllMovie"), [BotController, "hargaAllMovie"]);
router.menu(f("menu.hargaPromoFnb"), [BotController, "hargaPromoFnb"]);
router.menu(f("menu.formatPemesanan"), [BotController, "formatPemesanan"]);
router.menu(f("menu.saluranTestiInfo"), [BotController, "saluranTestiInfo"]);
router.menu(f("menu.caraScanTiket"), [BotController, "caraScanTiket"]);
router.menu(f("menu.nomorAdmin"), [BotController, "nomorAdmin"]);
router.menu(f("menu.nomorRekening"), [BotController, "nomorRekening"]);
router.menu(f("menu.catatanPenting"), [BotController, "catatanPenting"]);
router.menu(f("menu.promoBerlaku"), [BotController, "promoBerlaku"]);

router.keyword("*", [BotController, "introduction"]);

module.exports = router;