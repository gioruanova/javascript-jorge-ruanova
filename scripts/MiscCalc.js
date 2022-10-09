// =============COPYRIGHT=============
const copyFooter = document.getElementById("copyright");
// const dolarContainer = document.getElementById("dolar");
let dateToShow = ""
const devYear = 2022;
const currentYear = new Date().getFullYear();


if (currentYear === devYear) {
    dateToShow = (currentYear + ' ' + '| Al rights reserved.');
} else {
    dateToShow = (devYear + ' - ' + currentYear + ' ' + '| Al rights reserved.');
}

copyFooter.innerHTML = dateToShow
