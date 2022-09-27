// =============COPYRIGHT=============
const copyFooter = document.getElementById("copyright");
let dateToShow = ""
const devYear = 2021;
const currentYear = new Date().getFullYear();


if (currentYear === devYear) {
    dateToShow = (currentYear + ' ' + '| Todos los derechos reservados.');
} else {
    dateToShow = (devYear + ' - ' + currentYear + ' ' + '| Todos los derechos reservados.');
}

copyFooter.innerHTML = dateToShow

// =============RANDOM MESAGES=============
const promoType = document.getElementById("promo-name");
const promoDetail = document.getElementById("promo-detail");

const promoTypeText = "Tiempo limitado"
const promoDetailText = "Envios gratis en compras superiores a $5.000"

promoType.innerHTML = promoTypeText
promoDetail.innerHTML = promoDetailText
