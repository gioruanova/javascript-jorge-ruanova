
// STANDARD MESSAGES=======================================================================================
// MESSAGES: PRODUCTS QUANTITY---
const productQuantityText = 'Cuantos productos desea comprar?:'
const errorInputMessage = 'Disculpe, esa opcion no puede ser procesada.\n(Debe ingresar un numero mayor a 0):'


// MESSAGES: PRODUCT TO SELECT---
const productSelection = 'Ingrese el codigo de producto que desea comprar.\nEjemplo: 1. Laptop => su seleccion debe ser "1":'
const errorproductSelection = 'Disculpe, el dato ingresado no corresponde a un producto en el listado. Intente nuevamente.'

const initialSalute = 'Bienvenido a la tienda virtual.\nA continuacion lo guiaremos para que pueda\nrealizar su compra y recibir su producto lo antes posible\n(sujeto a disponibilidad y tiempos de envio:'


const disclaimer = '===APP DISCLAIMER===\nDado que todavia no hemos visto DOM, usted debera comprar utilizando las pantallas emergentes y datos en consola.\nCon F12 podra activar la consola.\nAdicionalmente, al tratarse de una aplicacion rudimentaria, le facilitaremos el ingreso de datos para evitar errores en la compra.\nFELIZ COMPRA!'

// GLOBAL=======================================================================================
let productQuantity = 0
let productSelected = 0
let availableProducts = ""
let carritoUpdate = []



// FUNCTION MESSAGES AND LOOP=======================================================================================
function messageGenerator(message, messageselector) {
    switch (messageselector) {
        case "onlyMessage":
            return prompt(message);
            break;

        case "initial":
            return (message);
            break;

        default:
            return "";
            break;
    }
}
// FUNCTION AUTO WHILE
function whileAutomationProduct(var1, var2, var3, var4) {
    while ((var1 <= 0) || (!var1)) {
        var1 = parseInt(messageGenerator(var2, var3, var4))
    }
    return var1
}

function whileAutomationAvailability(var1, var2, var3, var4) {
    while ((var1 <= 0) || (!var1) || (var1 > catalogoDisponible.length)) {
        var1 = parseInt(prompt(`${errorproductSelection}\nIngrese el numero de producto a comprar:\n${showProducts()}`))
    }
    return var1
}




// WELCOME MESSAGE=======================================================================================
function startingSite() {
    alert(messageGenerator(initialSalute, "initial"))
    alert(messageGenerator(disclaimer, "initial"))

}

// PRODUCT QUANTITY=======================================================================================
function productToBuy() {
    productQuantity = parseInt(messageGenerator(productQuantityText, "onlyMessage"))
    productQuantity = whileAutomationProduct(productQuantity, errorInputMessage, "onlyMessage")
    return productQuantity
}




// PRODUCT AVAILABILITY=======================================================================================

let catalogoDisponible = [
    { nombre: "PC", precio: 1000, cant: 10, stock: true },
    { nombre: "laptop", precio: 5000, cant: 20, stock: true },
    { nombre: "Gabinete", precio: 5000, cant: 20, stock: true },
    { nombre: "Iphone", precio: 5000, cant: 20, stock: true },
    { nombre: "Samsung", precio: 5000, cant: 20, stock: true },
    { nombre: "Iphone 17", precio: 5000, cant: 0, stock: false }
]

function showProducts() {
    function stockConversion(value) {
        if (!value) {
            value = " - Sin Stock!"
        } else {
            value = ""
        }
        return value
    }

    catalogoDisponible.forEach((a, key) => {
        availableProducts += key + 1 + ". " + a.nombre + ": $" + a.precio.toLocaleString('en-US') + " " + stockConversion(a.stock) + "\n"

    })
    return availableProducts


}

console.log(carritoUpdate)

// let carritoNew = carritoUpdate.push({ nombre: catalogoDisponible.nombre })

console.log(carritoUpdate)



function productToSelect() {
    productSelected = parseInt(prompt(`Seleccion producto a comprar:\n${showProducts()}`))
    productSelected = whileAutomationAvailability(productSelected, errorInputMessage, "onlyMessage")
    return productSelected
}







// =======================================================================================







// MAIN FUNCTIONS=======================================================================================
function main() {
    productToBuy()
    // console.log(productQuantity)

    productToSelect()
    // console.log(productSelected)


    if (!(catalogoDisponible[productSelected - 1].stock)) {
        console.log("Producto sin stock")
    } else {
        console.log(catalogoDisponible[productSelected - 1].nombre)
        console.log(catalogoDisponible[productSelected - 1].precio)
        console.log(catalogoDisponible[productSelected - 1].cant)
        console.log(catalogoDisponible[productSelected - 1].stock)
    }


}
// CALLING FUNCTIONS=======================================================================================
main()

