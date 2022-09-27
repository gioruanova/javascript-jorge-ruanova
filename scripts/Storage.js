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
    cardProd.innerHTML = `    
<div id='detail-historic' lcass="accordion" id="accordionPanelsStayOpen">
  <div class="accordion-item">
    <h2 class="accordion-header" id="PanelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#PanelsStayOpen-collapse-${clave}" aria-expanded="true" aria-controls="PanelsStayOpen">
        <p>Compra: ${clave}</p>
        <p>Total Compra: $${finalAmount.toLocaleString('en-US')}</p>
      </button>
    </h2>
  </div>
</div>
<button id="${clave}"type="button" class="btn btn-danger" onClick=deleteElementStorage(${clave})><p>Borrar registro <i class="bi bi-x-circle"></i></p></button>
`   ;
    for (const prodcutos of valor) {
      cardProd.innerHTML += `
<div id="#PanelsStayOpen-collapse-${clave}" class="accordion-collapse collapse show" aria-labelledby="PanelsStayOpen-headingOne">
  <div class="body-accordion">
    <p> <strong>${prodcutos.nombre}</strong></p>
    <p><strong>Precio Unidad:</strong> $${prodcutos.precio.toLocaleString('en-US')}</p>
    <p><strong>Cantidad:</strong>${prodcutos.cantidad}</p>
    <p><strong>Importe total: </strong> $${prodcutos.totalAmount.toLocaleString('en-US')}</p>
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
  <button "type="button" class="btn btn-warning" onClick=deleteAll()>
 Eliminar Historial
  </button>
  <a href="/">
  <button "type="button" class="btn btn-info" >
  Volver al E-Shop
   </button>
  </a>
  `
  } else {
    buttonSpace.innerHTML = `
<a href="../index.html">
<button "type="button" class="btn btn-info" >
Volver al E-Shop
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


