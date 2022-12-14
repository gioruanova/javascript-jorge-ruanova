// GLOBAL=======================================================================================
let productSelected = 0
let customerPurchaseCart = []
let finalAmount = 0
let finalQuantity = 0
let cantSelectedCart = 0
// let purchaseNumber = 0

// LOGIN VALIDATION=============================================================================

nameUserSession = sessionStorage.getItem("user");
mailUserSession = sessionStorage.getItem("email");
(nameUserSession != null) ? logueado = true : logueado = false


let catalogoDisponible = []
async function getApi() {
    let data = ""
    try {
        const response = await fetch("https://633e2670c235b0e5751fa049.mockapi.io/catalogoDisponible");
        data = await response.json()
        catalogoDisponible = [...data]
        console.log("Connected to Mockapi success")
    } catch (error) {
        console.log(error);
    }
}


//PRINT PRODUCTS AVAILABLE=========================================================
async function printProducts() {
    const contenedorProductos = document.getElementById("contenedor-productos");
    function stockWording(value) {
        if (!value) {
            value = "Proximamente!"
        } else {
            value = ""
        }
        return value
    }
    function stockWordingShow(value) {
        if (value == 0) {
            value = " "
        } else if (value == 1) {
            value = `<p class="card-text-red">Ultima disponible!!!</p>`
        } else {
            value = ` <p class="card-text">Stock disponible: <b>${value}</b></p>`
        }
        return value
    }
    function quantitySelector(value1, value2, value3) {
        if (value1 == 0) {
            value1 = " "
        } else {
            value1 = ` 
        <p>Cantidad:</p>
        <input type="number" class="tentacles" id=input${value2} name="tentacles" min="1" max="${value3}" value="0">`
        }
        return value1
    }
    contenedorProductos.innerHTML = `
<div>    
<img src="./imgs/spinner.gif"/>
</div>    
`

    setTimeout(function () {
        contenedorProductos.innerHTML = ""
        for (const producto of catalogoDisponible) {

            let cardProd = document.createElement("div");
            function buttonClass(value) {
                if (!producto.stock) {
                    value = `"btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalError"`
                } else {
                    value = `"btn btn-success cartadd" onClick=addToCart(this.id)`
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
            cardProd.id = `columna-${producto.id_product}`;
            cardProd.innerHTML = `
          <div class="card">
              <div class="card-body">
              <div class="image-container">
              <img src="${producto.image}"class="product-image"${blurImage(producto.stock)}/>
              </div>
              <div class="product-description">
              <i class="card-text-title"><i>${producto.nombre}</i></i>
              <p class="card-text"><b>${producto.precio.toLocaleString('en-US')}</b></p>
              ${stockWordingShow(producto.cant)}
              <p class="card-text-stock-mising"><b>${stockWording(producto.stock)}</b></p>
         <div class="wrapper-cant">
         ${quantitySelector(producto.stock, producto.id_product, producto.cant)}
         </div>
              <button class=${buttonClass(producto.cant)} id=${producto.id_product} title="Agregar item"><i class="bi bi-cart-plus"></i></button>
         </div>
              </div>
          </div>`;
            contenedorProductos.append(cardProd);
        }
    }, 1500);

}



// ADD TO CART FUNCTION----------------------------------------------------------------------------
function addToCart(clicked_id) {
    if (logueado) {
        addToCartProceed(clicked_id)
    } else {
        alertLogin()
    }
}



function addToCartProceed(clicked_id) {

    let productSelected = parseInt(clicked_id)
    let cantSelected = parseInt(document.getElementById(`input${productSelected}`).value);

    let productToAdd = catalogoDisponible.filter(
        (elemento) => elemento.id_product === productSelected
    );

    let idSelected = ""
    customerPurchaseCart.map((e) => {
        idSelected = e.id_product
    })

    if (productSelected == idSelected) {
        alreadyInCart()
    }
    else if (cantSelected == 0 || cantSelected > catalogoDisponible[productSelected - 1].cant) {
        errorQuantity()
    } else {
        customerPurchaseCart.push({ id_product: productToAdd[0].id_product, nombre: productToAdd[0].nombre, image: productToAdd[0].image, precio: productToAdd[0].precio, cantidad: cantSelected, totalAmount: productToAdd[0].precio * cantSelected })
        cantSelected = document.getElementById(`input${productSelected}`).value = 0






        totalCartAmount()
        totalCartCant()
        printCartPreview()
        subTotalPrints()
        productAddedConfirm()

    }

}

// PRINT CART FUNCTION----------------------------------------------------------------------------
function printCartPreview() {
    const cartContent = document.getElementById("carritoProducts");
    cartContent.innerHTML = ""
    for (const productToPrint of customerPurchaseCart) {
        let cardProd = document.createElement("div");
        let totalAmountProd = productToPrint.precio * productToPrint.cantidad
        let productDetail = catalogoDisponible.filter(
            (elemento) => elemento.id_product === productToPrint.id_product
        );
        cardProd.className = "cart-product-card";
        cardProd.id = `card-${productToPrint.id_product}`;
        cardProd.innerHTML = `
        <div class="cart-product-details-container">
        <div class="cart-product-details">
          <img src=${productToPrint.image} />
          <div class="cart-product-text">
            <div>
              <p>${productToPrint.nombre}</p>
              <div class="wrapper-cant">
                <p>Cantidad:</p>
                <input type="number" id="cart${productToPrint.id_product}" name="tentacles" min="0" max="${productDetail[0].cant}"value="${productToPrint.cantidad}">
              </div>
            </div>
            <div>
              <p>$${totalAmountProd.toLocaleString('en-US')}</p>
            </div>
          </div>
        </div>
        <div class="button-wrapper">
          <button type="button" class="btn btn-primary" id="update-${productToPrint.id_product}" onClick=productToUpdate(this.id) title="Actualizar cantidad items"><i class="bi bi-123"></i></button>
          <button type="button" class="btn btn-danger" id="delete-${productToPrint.id_product}" onClick=productToDelete(this.id) title="Remover item"><i class="bi bi-cart-dash"></i></button>
        </div>
      </div>`;
        cartContent.append(cardProd);
    }
}

// SUBTOTAL CALC----------------------------------------------------------------------------
function totalCartAmount() {
    finalAmount = customerPurchaseCart.reduce(
        (acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0
    );
    return finalAmount
}
function totalCartCant() {
    finalQuantity = customerPurchaseCart.reduce(
        (acumulador, producto2) => acumulador + producto2.cantidad, 0
    )
    return finalQuantity
}


// PRINT SUBTOTAL----------------------------------------------------------------------------
function subTotalPrints() {
    let customerPurchaseCartFinal = customerPurchaseCart.length
    let msj = ``
    if (customerPurchaseCartFinal === 0) {
        msj = `<button type="button" class="btn btn-warning" data-bs-dismiss="modal" title="Comenzar compra"><i class="bi bi-cart-plus"></i></button>`
    } else {
        msj = `    
         <div class="subtotal-line"> <p>Su total es de: </p>
         <p>$${finalAmount.toLocaleString('en-US')}</p></div>
          <div class="cart-options-wrapper">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick=emptyAllDelete() title="Vaciar carrito"><i class="bi bi-cart-x"></i></i></button>
          <button type="button" class="btn btn-info" data-bs-dismiss="modal" title="Seguir comprando"><i class="bi bi-cart-plus"></i></button>
          <button type="button" class="btn btn-success" onclick="endingPurchase()" title="Finalizar compra"><i class="bi bi-bag-check"></i></button>
      </div>
          `
    }
    const subTotal = document.getElementById("subtotaltodelete");
    subTotal.innerHTML = ""
    subTotal.innerHTML = msj
    const emptyButton = document.getElementById('empty-buttons')
    emptyButton.innerHTML = ""
    const amount = document.getElementById('cart-value detail-amount')
    amount.innerHTML = ""
    amount.innerHTML = `$${finalAmount.toLocaleString('en-US')}`
    const quantityTotal = document.getElementById('cart-value detail-cant')
    quantityTotal.innerHTML = ""
    quantityTotal.innerHTML = finalQuantity

    const iconQuantity = document.getElementById('number-cart')
    iconQuantity.innerHTML = ""
    iconQuantity.innerHTML = finalQuantity
}


// CART UPDATE QUANTITY---------------------------------------------------------------------------
function productToUpdate(clicked_id) {

    let productSelectedCart = `update${clicked_id}`
    productSelectedCart = parseInt(productSelectedCart.split("-")[1])


    let cantSelected = document.getElementById(`cart${productSelectedCart}`).value;
    cantSelectedCart = parseInt(cantSelectedCart)
    objIndex = customerPurchaseCart.findIndex((obj => obj.id_product == productSelectedCart));
    objDetalle = objIndex = customerPurchaseCart.findIndex((obj => obj.id_product == productSelectedCart));
    // let productToShow = customerPurchaseCart[objIndex].nombre



    if (parseInt(cantSelected) === customerPurchaseCart[objIndex].cantidad) {
        errorQuantitySame()
    } else if (parseInt(cantSelected) < 1) {
        errorQuantity()
    }
    else if (parseInt(cantSelected) > catalogoDisponible[productSelectedCart - 1].cant) {
        quantityOverAmount()
    } else {
        customerPurchaseCart[objIndex].cantidad = parseInt(cantSelected)


        totalCartAmount()
        totalCartCant()
        printCartPreview()
        subTotalPrints()
        const delayInMilliseconds = 400
        setTimeout(function () {

            successQuantityUpdate()
        }, delayInMilliseconds);
    }
}

// BORRAR DEL CARRITO----------------------------------------------------------------------------
function productToDelete(clicked_id) {
    let productSelectedCart = `update${clicked_id}`
    productSelectedCart = parseInt(productSelectedCart.split("-")[1])
    let productName = ""
    let elementosEncontrados = customerPurchaseCart.filter(
        (elemento) => elemento.id_product === productSelectedCart
    );
    elementosEncontrados.map((e) => {
        productName = e.nombre

    })
    customerPurchaseCart = customerPurchaseCart.filter(data => data.id_product != productSelectedCart);
    totalCartAmount()
    totalCartCant()
    printCartPreview()
    subTotalPrints()
    const delayInMilliseconds = 400
    setTimeout(function () {
        productDeleteConfirm()
        totalCartAmount()
        totalCartCant()
        printCartPreview()
        subTotalPrints()
    }, delayInMilliseconds);
}


// COMPRA FINALIZADA----------------------------------------------------------------------------
async function endingPurchase() {
    let availableProducts = ""
    customerPurchaseCart.forEach((a) => {
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
     <button type="button" class="btn btn-success" data-bs-dismiss="modal" aria-label="Close" onClick=emptyAll() title="Finalizar"><i class="bi bi-check2-circle"></i></button>
     </div>
    `
    purchaseConfirmed()
    localStorageCartSave()


    // PUSH TO API======================
    for (const order of catalogoDisponible) {
        let catalogoDisponible = customerPurchaseCart.find(x => x.id_product === order.id_product);
        if (catalogoDisponible) order.cant = (order.cant - catalogoDisponible.cantidad);
        if (order.cant === 0) order.stock = false;
    }
    // try {
    //     const response = await fetch("https://633e2670c235b0e5751fa049.mockapi.io/catalogoDisponible", {
    //         method: "POST",
    //         body: JSON.stringify(catalogoDisponible)
    //     });
    //     console.log(response)
    //     console.log(catalogoDisponible)
    // } catch (error) {
    //     console.log(error);
    // }
    console.log("Aca se actualizaria la api con el stock")
    printProducts()
}


// STARTING STORE----------------------------------------------------------------------------
getApi()

printProducts()

// RESETEAR TODO----------------------------------------------------------------------------
function emptyAll() {
    customerPurchaseCart = []
    totalCartAmount()
    totalCartCant()
    printCartPreview()
    subTotalPrints()
}

// VACIAR CARRITO----------------------------------------------------------------------------
function emptyAllDelete() {
    emptyAll()
    emptyCart()
}


// LOCAL STORAGE SAVE----------------------------------------------------------------------------

function localStorageCartSave() {
    let currentValue = localStorage.length
    let clave = 0
    let purchasesStorage = []
    for (let i = 0; i < localStorage.length; i++) {
        clave = parseInt(localStorage.key(i));
        for (let i = 0; i < clave; i++) {
            purchasesStorage[i] = clave
        }
    }
    const purchaseNumber = purchasesStorage[purchasesStorage.length - 1]

    let currentValueUpdate = currentValue < 1 ? 0 : purchaseNumber

    let localDateToUpdate = currentValueUpdate + 1
    storageDetail = JSON.stringify(customerPurchaseCart);
    localStorage.setItem(`${localDateToUpdate}`, storageDetail)
}



// LOCAL STORAGE SAVE----------------------------------------------------------------------------
function alertLogin() {
    Swal.fire({
        title: 'Usuario no logueado',
        text: 'Ingrese a Mi Cuenta para registrarse y comenzar a comprar',
        icon: 'question',
        timerProgressBar: true,
        timer: 4000,
        background: "grey",
        color: "white",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false

    })

}


// MESSAGES----------------------------------------------------------------------------

function errorQuantity() {
    Swal.fire({
        title: 'Ingreso incorrecto',
        text: 'Debe ingresar al menos 1 articulo al carrito',
        icon: 'warning',
        timerProgressBar: true,
        timer: 4000,
        background: "grey",
        color: "white",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false

    })
}

function quantityOverAmount() {
    Swal.fire({
        title: 'Ingreso incorrecto',
        text: 'El monto ingresado supera al stock disponible',
        icon: 'question',
        timerProgressBar: true,
        timer: 4000,
        background: "grey",
        color: "white",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false

    })
}

function alreadyInCart() {
    Swal.fire({
        title: 'Ingreso duplicado',
        text: 'El producto ya esta en el carrito. Si desea modificar la cantidad ingrese a su carrito y modifique el stock seleccionado.',
        icon: 'question',
        timerProgressBar: true,
        timer: 4000,
        background: "grey",
        color: "white",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false

    })
}



function errorQuantitySame() {
    Swal.fire({
        title: 'Ingreso ambiguo',
        text: 'No se han registrado cambios. Ingrese un numero mayor o menor al previamente ingresado',
        icon: 'question',
        timerProgressBar: true,
        timer: 4000,
        background: "grey",
        color: "white",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false

    })
}

function successQuantityUpdate() {
    Swal.fire({
        title: 'Modificacion confirmada',
        text: 'Se ha modificado la cantidad del producto seleccionado',
        icon: 'success',
        timerProgressBar: true,
        timer: 4000,
        background: "grey",
        color: "white",
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false

    })
}


function productAddedConfirm() {
    Toastify({
        text: "Producto agregado correctamente",
        duration: 2000,
        gravity: "top",
        offset: {
            x: 2,
            y: 70
        },
        style: {
            background: "green",
        },
    }).showToast();
}

function productDeleteConfirm() {
    Toastify({
        text: "El producto se ha eliminado del carrito",
        duration: 2000,
        gravity: "top",
        offset: {
            x: 2,
            y: 70
        },
        style: {
            background: "green",
        },
    }).showToast();
}


function emptyCart() {
    Toastify({
        text: "Su carrito se ha vaciado por completo",
        duration: 2000,
        gravity: "top",
        offset: {
            x: 2,
            y: 70
        },
        style: {
            background: "green",
        },
    }).showToast();
}

function purchaseConfirmed() {
    Swal.fire({
        title: 'Compra realizada con exito',
        text: 'Su compra se ha completado. Puede pasar por "Mi Cuenta" para ver el detalle',
        icon: 'success',
        timerProgressBar: true,
        timer: 1500,
        background: "grey",
        color: "white",
        customClass: {
            confirmButton: 'btn-swall',
            cancelButton: 'btn-swall '
        },
        buttonsStyling: false
    })
}


