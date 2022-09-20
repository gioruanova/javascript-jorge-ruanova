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

let productsOut = ""
let contactForStock = false
let contactForStockProd = ""
const outOfStockArray = []
let customerCarrito = []
let carritoFinal = []


// IMPORTS Product Images================================================================================
let imgKey1 = { src: "../imgs/pc.jpg" };
let imgKey2 = { src: "../imgs/laptop.jpg" };
let imgKey3 = { src: "../imgs/gabinete.jpg" };
let imgKey4 = { src: "../imgs/iphonex.JPG" };
let imgKey5 = { src: "../imgs/samsung.jpg" };
let imgKey6 = { src: "../imgs/iphone14.jpeg" };
let imgKey7 = { src: "../imgs/camara.jpg" };
let imgKey8 = { src: "../imgs/monitor.jpg" };
let imgKey9 = { src: "../imgs/teclado.jpg" };

// PRODUCT AVAILABILITY
let catalogoDisponible = [
    { key: 1, nombre: "PC Gamer", precio: 1000, cant: 10, stock: true, image: imgKey1 },
    { key: 2, nombre: "Laptop", precio: 5000, cant: 20, stock: true, image: imgKey2 },
    { key: 3, nombre: "Gabinete", precio: 5000, cant: 20, stock: true, image: imgKey3 },
    { key: 4, nombre: "Iphone X", precio: 5000, cant: 20, stock: true, image: imgKey4 },
    { key: 5, nombre: "Samsung X", precio: 5000, cant: 20, stock: true, image: imgKey5 },
    { key: 6, nombre: "Iphone 14", precio: 5000, cant: 0, stock: false, image: imgKey6 },
    { key: 7, nombre: "Camara seguridad", precio: 5000, cant: 0, stock: false, image: imgKey7 },
    { key: 8, nombre: "Monitor Curvo", precio: 5000, cant: 10, stock: true, image: imgKey8 },
    { key: 9, nombre: "Teclado Gamer", precio: 5000, cant: 5, stock: true, image: imgKey9 }
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
    let availableProducts = ""
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




// MESSAGE WELCOME=======================================================================================




// MESSAGE CONTINUE =======================================================================================
function readyToFinish() {
    let customerResponse = (prompt('Desea continuar comprando?\nSi\nNo')).toLowerCase()
    if ((customerResponse) === "si") {
        productToSelect()
    } else {
        deteleItemQuestion()
    }
}

// MESSAGE CONFIRM =======================================================================================
function finishPurchase() {
    if (customerCarrito[0] === undefined) {

        endingPurchase()
    } else {
        let customerResponse = (prompt('Desea confirmar la compra?\n(despues de este punto ya no habra vuelta atras)\nSi\nNo')).toLowerCase()
        if ((customerResponse) === "si") {
            alert('Su compra ha sido realizada. A continuacion encontrara en consola, un detalle de todos sus productos')
            totalPurchase()
            emptyCartButtonShow()

            cartDetail()
            console.log('Gracias por su compra!')

            endingPurchase()
        } else {

            alert('Su compra ha sido cancelada. Gracias vuelva pronto!')

            console.log('Compra cancelada. Vuelva pronto')
            endingPurchase()
            emptyCart()
            partialCantShow()
            emptyCartButtonHide()
        }
    }
}

//TO DELETE STAGE===================================================================================
function deteleItemQuestion() {
    customerResponseDelete = prompt('Antes de continuar, desea eliminar algun producto de su carrito?').toLowerCase()

    if (customerResponseDelete === "si") {
        deleteItem()
    } else {
        finishPurchase()
    }

}

function deleteItem() {
    let valueToDelete = prompt('Ingrese el nombre del producto a eliminar del carrito').toLowerCase()
    customerCarrito = customerCarrito.filter(function (obj) {
        return obj.nombre.toLowerCase() !== valueToDelete.toLowerCase();
    });
    alert(`Su producto ${valueToDelete} ha sido eliminado`)
    partialCantShow()
    readyToFinish()
}



// OUT OF STOCK QUESTION=======================================================================================
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
            let newsletterMessage = document.getElementById("message");
            newsletterMessage.innerText = "Dado de alta en base para recibir novedades y promociones en :";

            let newsletterEmail = document.getElementById("message-email");
            newsletterEmail.innerText = newsLetter;
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
    partialCantShow()
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
    let carritoFinal = []
    customerCarrito.forEach((a) => {
        carritoFinal += a.nombre + " - $" + ((a.total).toLocaleString('en-US')) + " - (x" + a.cantidad + ")\n"
    })
    console.log(carritoFinal)
}

//CART DETAIL CANT=========================================================
function partialCantShow() {
    let partialAmount = customerCarrito.reduce(
        (acumulador, producto) => acumulador + producto.total, 0
    )

    let partialCant = customerCarrito.reduce(
        (acumulador, producto) => acumulador + producto.cantidad, 0
    )


    let partialAmountTToShow = document.getElementsByClassName("detail-amount");
    let partialCantToShow = document.getElementsByClassName("detail-cant");


    for (const amount of partialAmountTToShow) {
        amount.innerText = `${partialAmount.toLocaleString('en-US')}`;
    }

    for (const cant of partialCantToShow) {
        cant.innerText = partialCant;
    }



}



// buttonPrint()=========================================================

function emptyCartButtonHide() {
    const btn = document.getElementById('btn-empty-car');
    btn.style.display = 'none';
}

function emptyCartButtonShow() {
    const btn = document.getElementById('btn-empty-car');
    btn.style.display = 'flex';
}



//EMPTY START=========================================================
function emptyCart() {
    let final = customerCarrito.length
    customerCarrito.splice(0, final)

    partialCantShow()
    emptyCartButtonHide()

}


//PRINT PRODUCTS=========================================================
const contenedorProductos = document.getElementById("contenedor-productos");
function stockConversion(value) {
    if (!value) {
        value = "Sin Stock!"
    } else {
        value = ""
    }
    return value
}

function stockConversion2(value) {
    if (value == 0) {
        value = " "
    } else {
        value = ` Stock disponible: <b>${value}</b>`
    }
    return value
}

for (const producto of catalogoDisponible) {
    let cardProd = document.createElement("div");

    function buttonClass(value) {
        if (!producto.stock) {
            value = `"btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalError"`

        } else {
            value = `"btn btn-success" onClick=main()`
        }
        return value
    }


    cardProd.className = "col-md-4 mt-3 ";
    cardProd.id = `columna-${producto.key}`;

    cardProd.innerHTML = `
      <div class="card">
          <div class="card-body">
          <div class="image-container">
          <img src="${producto.image.src}"class="product-image"/>
          </div>
          <div class="product-description">
          <i class="card-text-title"><i>${producto.nombre}</i></i>
          <p class="card-text"><b>${producto.precio.toLocaleString('en-US')}</b></p>
          <p class="card-text">${stockConversion2(producto.cant)}</p>
          <p class="card-text-stock-mising"><b>${stockConversion(producto.stock)}</b></p>
     <div class="wrapper-cant">
     <p>Cantidad:</p>
     <input type="number" id="tentacles" name="tentacles" min="0" max="${producto.cant}" value="0">
     </div>
          <button class=${buttonClass(producto.cant)} >Agregar al carrito</button>
          
          </div>
          </div>
      </div>`;

    contenedorProductos.append(cardProd);
}






// MAIN FUNCTIONS=======================================================================================
function main() {
    const delayInMilliseconds = 700; //1 second
    emptyCart()
    partialCantShow()
    emptyCartButtonHide()
    setTimeout(function () {


        productToSelect()
        prevCarrito ()
    }, delayInMilliseconds);

}






// --------------------------------------------------------
function prevCarrito (){
    const carritoProducts = document.getElementById("carritoProductsDetail");

for (const producto of customerCarrito) {
    let cardProd = document.createElement("div");
    cardProd.className = "cart-product-card";
    cardProd.id = `columna-${producto.key}`;

    cardProd.innerHTML = `
    <div class="cart-product-details-container">
    <div class="cart-product-details">
      <img src="" />
      <div class="cart-product-text">
        <div>
          <p>${producto.nombre}</p>
          <div class="wrapper-cant">
            <p>Cantidad:</p>
            <input type="number" id="tentacles" name="tentacles" min="0" value=${producto.cantidad}>
          </div>
        </div>
        <div>
          <p>${producto.total}</p>
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <button type="button" class="btn btn-primary">Actualizar</button>
      <button type="button" class="btn btn-danger">Quitar del carrito</button>
    </div>
  </div>`;

    contenedorProductos.append(cardProd);
}
}

prevCarrito ()