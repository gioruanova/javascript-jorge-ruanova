// =============COPYRIGHT=============
const copyFooter = document.getElementById("copyright");
const dolarContainer = document.getElementById("dolar");
let dateToShow = ""
const devYear = 2022;
const currentYear = new Date().getFullYear();


if (currentYear === devYear) {
    dateToShow = (currentYear + ' ' + '| Al rights reserved.');
} else {
    dateToShow = (devYear + ' - ' + currentYear + ' ' + '| Al rights reserved.');
}

copyFooter.innerHTML = dateToShow

// =============DOLAR=============
async function dolarCot() {

    function blurImage(value) {
        if (!value) {
            value = `style="filter:blur(5px)"`
        } else {
            value = ""
        }
        return value
    }


    let datosDolar = ""
    try {
        const response = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
        datosDolar = await response.json()
        tipodedolar = [...datosDolar]
    } catch (error) {
        console.log(error);
    }

    let detalle = ""
    tipodedolar.slice(0, 7).map(e => {

        detalle += `<b>${e.casa.nombre} -</b> <u>Compra:</u> $${e.casa.compra} - <u>Venta:</u> $${e.casa.venta} | `
    })

    dolarContainer.innerHTML = `<marquee behavior="" direction="">${detalle}</marquee>`
}

dolarCot()