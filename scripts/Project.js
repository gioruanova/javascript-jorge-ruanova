// GLOBAL=======================================================================================
let productSelected = 0


let customerCarrito = []
let finalAmount = 0
let finalQuantity = 0
let cantSelectedCart = 0


// IMPORTS Product Images================================================================================
let imgid1 = { src: "../imgs/pc.jpg" };
let imgid2 = { src: "../imgs/laptop.jpg" };
let imgid3 = { src: "../imgs/gabinete.jpg" };
let imgid4 = { src: "../imgs/iphonex.JPG" };
let imgid5 = { src: "../imgs/samsung.jpg" };
let imgid6 = { src: "../imgs/iphone14.jpeg" };
let imgid7 = { src: "../imgs/camara.jpg" };
let imgid8 = { src: "../imgs/monitor.jpg" };
let imgid9 = { src: "../imgs/teclado.jpg" };

// PRODUCT AVAILABILITY
let catalogoDisponible = [
    { id: 1, nombre: "PC Gamer", precio: 1000, cant: 10, stock: true, image: imgid1 },
    { id: 2, nombre: "Laptop", precio: 5000, cant: 20, stock: true, image: imgid2 },
    { id: 3, nombre: "Gabinete", precio: 5000, cant: 20, stock: true, image: imgid3 },
    { id: 4, nombre: "Iphone X", precio: 5000, cant: 20, stock: true, image: imgid4 },
    { id: 5, nombre: "Samsung X", precio: 5000, cant: 20, stock: true, image: imgid5 },
    { id: 6, nombre: "Iphone 14", precio: 5000, cant: 0, stock: false, image: imgid6 },
    { id: 7, nombre: "Camara seguridad", precio: 5000, cant: 0, stock: false, image: imgid7 },
    { id: 8, nombre: "Monitor Curvo", precio: 5000, cant: 10, stock: true, image: imgid8 },
    { id: 9, nombre: "Teclado Gamer", precio: 5000, cant: 5, stock: true, image: imgid9 }
]



//PRINT PRODUCTS AVAILABLE=========================================================
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
function stockConversion3(value1, value2, value3) {
    if (value1 == 0) {
        value1 = " "
    } else {
        value1 = ` 
        <p>Cantidad:</p>
        <input type="number" class="tentacles" id=${value2} name="tentacles" min="1" max="${value3}" value="0">`
    }
    return value1
}
for (const producto of catalogoDisponible) {
    let cardProd = document.createElement("div");
    function buttonClass(value) {
        if (!producto.stock) {
            value = `"btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalError"`
        } else {
            value = `"btn btn-success cartadd" onClick=addToCart()`
        }
        return value
    }
    function blurImage(value) {
        if (!value) {
            value = `style="filter:blur(5px)"`
        } else {
            value = ""
        }
        return value
    }
    cardProd.className = "col-md-4 mt-3 ";
    cardProd.id = `columna-${producto.id}`;
    cardProd.innerHTML = `
      <div class="card">
          <div class="card-body">
          <div class="image-container">
          <img src="${producto.image.src}"class="product-image"${blurImage(producto.stock)}/>
          </div>
          <div class="product-description">
          <i class="card-text-title"><i>${producto.nombre}</i></i>
          <p class="card-text"><b>${producto.precio.toLocaleString('en-US')}</b></p>
          <p class="card-text">${stockConversion2(producto.cant)}</p>
          <p class="card-text-stock-mising"><b>${stockConversion(producto.stock)}</b></p>
     <div class="wrapper-cant">
     ${stockConversion3(producto.stock, producto.id, producto.cant)}
     </div>
          <button class=${buttonClass(producto.cant)} id=${producto.id}>Agregar al carrito</button>
     </div>
          </div>
      </div>`;
    contenedorProductos.append(cardProd);
}


// ADD TO CART FUNCTION----------------------------------------------------------------------------
function addToCart() {
    let productSelected = parseInt(event.srcElement.id)
    let cantSelected = parseInt(document.getElementById(productSelected).value);

    if (cantSelected == 0) {
        alert('Debe seleccionar un nro para agregar al carrito')
    } else {
        let productToAdd = catalogoDisponible.filter(
            (elemento) => elemento.id === productSelected
        );
        customerCarrito.push({ id: productToAdd[0].id, nombre: productToAdd[0].nombre, image: productToAdd[0].image, precio: productToAdd[0].precio, cantidad: cantSelected, totalAmount: productToAdd[0].precio * cantSelected })
        cantSelected = document.getElementById(productSelected).value = 0
        alert('Producto agrgado al carrito')

        totalCartAmount()
        totalCartCant()

        printCartPreview()
        subTotalPrints()





    }
}

// PRINT CART FUNCTION----------------------------------------------------------------------------
function printCartPreview() {
    const cartContent = document.getElementById("carritoProducts");
    cartContent.innerHTML = ""
    for (const productToPrint of customerCarrito) {
        let cardProd = document.createElement("div");
        let totalAmountProd = productToPrint.precio * productToPrint.cantidad
        let productDetail = catalogoDisponible.filter(
            (elemento) => elemento.id === productToPrint.id
        );
        cardProd.className = "cart-product-card";
        cardProd.id = `columna-${productToPrint.id}`;
        cardProd.innerHTML = `
        <div class="cart-product-details-container">
        <div class="cart-product-details">
          <img src=${productToPrint.image.src} />
          <div class="cart-product-text">
            <div>
              <p>${productToPrint.nombre}</p>
              <div class="wrapper-cant">
                <p>Cantidad:</p>
                <input type="number" id="cart${productToPrint.id}" name="tentacles" min="0" max="${productDetail[0].cant}"value="${productToPrint.cantidad}">
              </div>
            </div>
            <div>
              <p>$${totalAmountProd.toLocaleString('en-US')}</p>
            </div>
          </div>
        </div>
        <div class="button-wrapper">
          <button type="button" class="btn btn-primary" id="${productToPrint.id}" onClick=productToUpdate()>Actualizar</button>
          <button type="button" class="btn btn-danger" id="${productToPrint.id}" onClick=productToDelete()>Quitar del carrito</button>
        </div>
      </div>`;
        cartContent.append(cardProd);
    }
}

// SUBTOTAL CALC----------------------------------------------------------------------------
function totalCartAmount() {
    finalAmount = customerCarrito.reduce(
        (acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0
    );
    return finalAmount
}

function totalCartCant() {
    finalQuantity = customerCarrito.reduce(
        (acumulador, producto2) => acumulador + producto2.cantidad, 0
    )
    return finalQuantity
}



// PRINT SUBTOTAL----------------------------------------------------------------------------
function subTotalPrints() {
    const subTotal = document.getElementById("subtotaltodelete");
    subTotal.innerHTML = ""
    subTotal.innerHTML = `      
   <div class="subtotal-line"> <p>Su total es de: </p>
   <p>$${finalAmount.toLocaleString('en-US')}</p></div>
    <div class="cart-options-wrapper">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick=emptyAll()>Vaciar Carrito</button>
    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Seguir comprando</button>
    <button type="button" class="btn btn-success" onclick="endingPurchase()">Finalizar compra</button>
</div>
    `

    const emptyButton = document.getElementById('empty-buttons')
    emptyButton.innerHTML = ""

    const amount = document.getElementById('cart-value detail-amount')
    amount.innerHTML = ""
    amount.innerHTML = `$${finalAmount.toLocaleString('en-US')}`



    const quantityTotal = document.getElementById('cart-value detail-cant')
    quantityTotal.innerHTML = ""
    quantityTotal.innerHTML = finalQuantity
}



// Change CANMT CART FUNCTION----------------------------------------------------------------------------
function productToUpdate() {
    let productSelectedCart = parseInt(event.srcElement.id)
    let cantSelected = document.getElementById(`cart${productSelectedCart}`).value;
    cantSelectedCart = parseInt(cantSelectedCart)
    objIndex = customerCarrito.findIndex((obj => obj.id == productSelectedCart));
    customerCarrito[objIndex].cantidad = parseInt(cantSelected)

    console.log(cantSelected)
    console.log(cantSelectedCart)



    totalCartAmount()
    totalCartCant()

    printCartPreview()
    subTotalPrints()

    const delayInMilliseconds = 400
    setTimeout(function () {
        alert(`Su cantidad ha sido actualizada a ${cantSelected}`)
    }, delayInMilliseconds);




}

// BORRAR DEL CARRITO----------------------------------------------------------------------------
function productToDelete() {
    let productSelectedCart = parseInt(event.srcElement.id)
    customerCarrito = customerCarrito.filter(data => data.id != productSelectedCart);

    totalCartAmount()
    totalCartCant()

    printCartPreview()
    subTotalPrints()
    const delayInMilliseconds = 400
    setTimeout(function () {
        alert(`Su producto  se ha eliminado`)
    }, delayInMilliseconds);
}


// COMPRA FINALIZADA----------------------------------------------------------------------------
function endingPurchase() {


    let availableProducts = ""

    customerCarrito.forEach((a) => {
        availableProducts += `<div>\n  ${a.nombre} $${a.precio.toLocaleString('en-US')} - (x ${a.cantidad})\n - Total: <b>$${(a.precio * a.cantidad).toLocaleString('en-US')}</b></div>`
    })


    const endingPurchaseSubtotal = document.getElementById("subtotaltodelete");
    endingPurchaseSubtotal.innerHTML = ""

    const endingPurchase = document.getElementById("carritoProducts");
    endingPurchase.innerHTML = ""

    endingPurchase.innerHTML = `      
    <p>Su compra ha sido realizada.\n A continuacion podra ver el detalle de la misma:</p>
    <div class="sub-total-final">${availableProducts}</div>

    <div class="saludo-final">Gracias por su compra!</div>

    <div class="subtotal-line"> <p>Su total es de: </p>
    <p>$${finalAmount.toLocaleString('en-US')}</p></div>
     <div class="cart-options-wrapper padding-wrapper">
     <button type="button" class="btn btn-success" data-bs-dismiss="modal" aria-label="Close" onClick=emptyAll()>Finalizar</button>
     </div>

    `

}



function emptyAll() {
    customerCarrito = []
    totalCartAmount()
    totalCartCant()
    printCartPreview()
    subTotalPrints()
    
}

