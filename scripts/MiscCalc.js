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
