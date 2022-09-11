
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
let productSelected = 0
let availableProducts = ""
let productsOut = ""
let contactForStock = false
let contactForStockProd = ""
const outOfStockArray = []
const customerCarrito = []
let carritoFinal = []

// PRODUCT AVAILABILITY=======================================================================================
let catalogoDisponible = [
    { nombre: "PC", precio: 1000, cant: 10, stock: true },
    { nombre: "laptop", precio: 5000, cant: 20, stock: true },
    { nombre: "Gabinete", precio: 5000, cant: 20, stock: true },
    { nombre: "Iphone", precio: 5000, cant: 20, stock: true },
    { nombre: "Samsung", precio: 5000, cant: 20, stock: true },
    { nombre: "Iphone 17", precio: 5000, cant: 0, stock: false },
    { nombre: "Iphone 18", precio: 5000, cant: 0, stock: false }
]
// PRODUCT SHOW=======================================================================================
function showProducts() {
    function stockConversion(value) {
        if (!value) {
            value = " - Sin Stock!"
        } else {
            value = ""
        }
        return value
    }

    function stockConversion2(value) {
        if (value == 0) {
            value = " "
        } else {
            value = ` - ${value} unidades`
        }
        return value
    }

    stock = stockConversion2()
    catalogoDisponible.forEach((a, key) => {
        availableProducts += key + 1 + ". " + a.nombre + " - $" + a.precio.toLocaleString('en-US') + stockConversion2(a.cant) + stockConversion(a.stock) + "\n"
    })
    return availableProducts
}


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

function whileAutomationProduct2(var1, var2, var3) {
    while ((var1 > var2)) {
        var1 = (alert(`La cantidad seleccionada super al stock disponible (${var3} disponibles)`))
    }
    return var1
}

function whileAutomationAvailability(var1, var2, var3, var4) {
    while ((var1 <= 0) || (!var1) || (var1 > catalogoDisponible.length)) {
        var1 = parseInt(prompt(`${errorproductSelection}\nIngrese el numero de producto a comprar:\n${showProducts()}`))
    }
    return var1
}




// MESSAGE WELCOME=======================================================================================CHECK
function startingSite() {
    alert(messageGenerator(initialSalute, "initial"))
    alert(messageGenerator(disclaimer, "initial"))
}

// MESSAGE CONTINUE =======================================================================================CHECK
function readyToFinish() {
    let customerResponse = (prompt('Desea continuar comprando?\nSi\nNo')).toLocaleLowerCase()
    if ((customerResponse) === "si") {
        productToSelect()
    } else {
        finishPurchase()
    }
}

// MESSAGE CONFIRM =======================================================================================CHECK
function finishPurchase() {
    if (customerCarrito[0] === undefined) {
        endingPurchase()
    } else {
        let customerResponse = (prompt('Desea confirmar la compra?\n(despues de este punto ya no habra vuelta atras)\nSi\nNo')).toLocaleLowerCase()
        if ((customerResponse) === "si") {
            alert('Su compra ha sido realizada. A continuacion encontrara en consola, un detalle de todos sus productos')
            totalPurchase()
            cartDetail()
            console.log('Gracias por su compra!')
            endingPurchase()
        } else {

            alert('Su compra ha sido cancelada. Gracias vuelva pronto!')
            endingPurchase()
        }
    }
}

// OUT OF STOCK QUESTION=======================================================================================CHECKING
function endingPurchase() {
    const uniq = [...new Set(outOfStockArray)];
    uniq.forEach((a) => {
        productsOut += a + "\n"
    })
    if (contactForStock) {
        let newsLetter = prompt(`Detectamos que usted intento comprar el producto ${productsOut} el cual se encuentra fuera de stock\nPuede dejarnos su correo para mantenerlo actualizado sobre nuevos ingresos (no obligatorio)`)
        if (newsLetter === "") {
            alert(`Gracias! No olvide volver pronto para enterarse de mas novedades.`)
        } else {
            alert(`Su correo ${newsLetter} ha sido registrado y recibira novedaeds ante nuevos ingresos. Gracias!`)
            console.log(`Dado de alta en base para recibir novedades y promociones en ${newsLetter}`)
        }
    }
}

// OUT OF STOCK ARRAY =======================================================================================CHECK
function pushOutOfStockArray() {
    if ((!(catalogoDisponible[productSelected - 1].stock))) {
        outOfStockArray.push(((catalogoDisponible[productSelected - 1].nombre)))
    }
}

// SELECTING PRODUCTS =======================================================================================CHECK
function productToSelect() {
    productSelected = parseInt(prompt(`Seleccione del listado el producto a agregar al carrito:\n${showProducts()}`))
    productSelected = whileAutomationAvailability(productSelected, errorInputMessage, "onlyMessage")
    while ((!(catalogoDisponible[productSelected - 1].stock))) {
        pushOutOfStockArray()
        contactForStock = true
        productSelected = parseInt(prompt(`El producto no esta en Stock actualmente.\nSeleccion producto a comprar:\n\n${showProducts()}`))
        productSelected = whileAutomationAvailability(productSelected, errorInputMessage, "onlyMessage")
    }
    addToCart()
    readyToFinish()
    return (productSelected, contactForStock, contactForStockProd)
}
// CARRITO ARRAY =======================================================================================CHECK
function addToCart() {
    let quantity = 0
    let available = (catalogoDisponible[productSelected - 1].cant)
    function productQuantity() {
        quantity = parseInt(prompt(`Ingrese la cantidad que desea del producto ${name}`))
        quantity = whileAutomationProduct(quantity, errorInputMessage, "onlyMessage")
        quantity = whileAutomationProduct2(quantity, available, available)
        return quantity
    }
    let name = (catalogoDisponible[productSelected - 1].nombre)
    let price = catalogoDisponible[productSelected - 1].precio
    let total = (price * (productQuantity(quantity)))
    if (!quantity) {
    } else {
        customerCarrito.push({ nombre: name, precio: price, cantidad: quantity, total: total })
    }
}
// TOTAL CART =======================================================================================CHECK
function totalPurchase() {
    let totalAmount = customerCarrito.reduce(
        (acumulador, producto) => acumulador + producto.total, 0
    )
    let totalCant = customerCarrito.reduce(
        (acumulador, producto) => acumulador + producto.cantidad, 0
    )
    customerCarrito.push({ nombre: "Total a Abonar", total: totalAmount, cantidad: totalCant })
}
//CART DETAIL=========================================================
function cartDetail() {
    customerCarrito.forEach((a) => {
        carritoFinal += a.nombre + " - $" + ((a.total).toLocaleString('en-US')) + " - (x" + a.cantidad + ")\n"
    })
    console.log(carritoFinal)
}





// MAIN FUNCTIONS=======================================================================================
function main() {
    startingSite()
    productToSelect()
}
// CALLING FUNCTIONS=======================================================================================
main()

