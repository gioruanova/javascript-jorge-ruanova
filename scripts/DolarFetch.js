const dolarContainer = document.getElementById("dolar");


// =============DOLAR=============
async function dolarCot() {



    let datosDolar = ""
    try {
        const response = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
        datosDolar = await response.json()
        tipodedolar = [...datosDolar]
        console.log("Connected to DolarSi success")
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