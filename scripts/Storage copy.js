// =============IMPRIMIR HISTORIAL=============
function printStorage() {
  const contenedorProductos = document.getElementById("detail-historic-purchase");
  function sorting(a, b) {
    return a > b ? 1 : a > b ? -10 : 0;
  }
  const localStorageStored = Object.entries(localStorage).sort((first, second) => sorting(first[0], second[0]))
  const iterableObj = Object.fromEntries(localStorageStored)
  for (property in iterableObj) {
    let clave = property
    let valor = JSON.parse(iterableObj[property])
    for (const valores of valor) {
      finalAmount = valor.reduce(
        (acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0
      );
    }
    let cardProd = document.createElement("div");
    cardProd.className = "card-compra"
    cardProd.innerHTML = `    
    
    <div class="header-resumen">
        <div class="left-header">
        <p><b>Compra: </b>${clave}</p>
            <div class="amount-detail">
            <p><b>Total Compra:</b></p>
            <p>$${finalAmount.toLocaleString('en-US')}</p>
            </div>
        </div>
            <button id="${clave}"type="button" class="btn btn-danger" onClick=deleteElementStorage(${clave}) title="Eliminar registro""><i class="bi bi-trash"></i></button>
    </div>
`   ;
    
for (const prodcutos of valor) {
      cardProd.innerHTML += `
<div class="compra-detail-content">
<p class="product-name">${prodcutos.nombre}</p>
<div class="flex-panels">
<div class="left-panel-detail">
<p><strong>Precio Unidad:</strong> $${prodcutos.precio.toLocaleString('en-US')}</p>
<p class="quantity">${prodcutos.cantidad}</p>
</div>
<div class="right-panel-detail">
<p>$${prodcutos.totalAmount.toLocaleString('en-US')}</p>
</div>
</div>
</div>

  `
    }
    contenedorProductos.append(cardProd)
  }
}


// =============DELETE LOCALSTORAGE BY ID=============
function deleteElementStorage(idToDelete) {
  localStorage.removeItem(idToDelete);
  alert('Su registro se ha borrado')
  printStorage()
  createButton()
  reloadPage()
}

// =============DELETE ALL LOCALSTORAGE=============
let currentHistory = localStorage.length

currentHistory < 1 ? true : false

function deleteAll() {
  localStorage.clear();
  alert('Se ha borrado su historial')
  printStorage()
  createButton()
  reloadPage()
}

// =============UPDATE BUTTON=============
function createButton() {
  const buttonSpace = document.getElementById("buttonGenerator");
  if (currentHistory) {
    buttonSpace.innerHTML = `
  <button "type="button" class="btn btn-warning" onClick=deleteAll() title="Borrar historial">
  <i class="bi bi-check2-circle"></i>
  </button>
  <a href="/">
  <button "type="button" class="btn btn-info" title="Volver a la tienda">
  <i class="bi bi-house-door"></i>
   </button>
  </a>
  `
  } else {
    buttonSpace.innerHTML = `
<a href="../index.html">
<button "type="button" class="btn btn-info" title="Volver a la tienda">
<i class="bi bi-house-door"></i>
 </button>
</a>
    `
  }
}


// =============RELOAD AND REFRESH=============
function reloadPage() {
  location.reload()
}

// =============STARTING FUNCTIONS=============
function startExperience() {
  createButton()
  printStorage()
}

startExperience()

let logueado = false


logueado ? console.log('Logueado con exito') : console.log('Debe loguearse para poder utilizar el servicio')


