// =============STORAGE AND LOGIN VALIDATION=============
const headerComponent = document.getElementById("initialHeader");
const logOffGenerator = document.getElementById("logOffSection");
let currentHistory = localStorage.length
let logOffButton = `<a href="#"><button type="button" class="btn btn-danger" onclick="logOut()"><i class="bi bi-escape"></i>
<p>Cerrar</p>
</button></a>`

let inputNombre;
let inputMail;
let formulario;
let logueado = false




function createLogOffButton() {
  logOffGenerator.innerHTML = logOffButton
}




function logInStatus() {
  nameUserSession = sessionStorage.getItem("user");
  mailUserSession = sessionStorage.getItem("email");
  (nameUserSession != null) ? logueado = true : logueado = false
}
logInStatus()

// =============INJECT HTML VARIABLES=============
const emptyStore = `
<h2> <i class="bi bi-person-circle"></i> My Account</h2>
<p class="salute">Bienvenido <b>${nameUserSession} (${mailUserSession})</b> a su cuenta</p>
<p class="text">A continuacion podra ver el historial de sus operaciones realizadas:</p>
`
const filledStore = `
<h2> <i class="bi bi-person-circle"></i> My Account</h2>
<p class="salute">Bienvenido <b>${nameUserSession} (${mailUserSession})</b> a su cuenta</p>
<p class="text">Usted no tiene historial de compras</p>
`

// =============STORE VALIDATION RESULT=============
currentHistory < 1 ? true : false
let validationInject = currentHistory ? emptyStore : filledStore
logueado ? startExperience() : printForm()




// =============IMPRIMIR HISTORIAL=============
function printStorage() {
  const contenedorProductos = document.getElementById("detail-historic-purchase");



  headerComponent.innerHTML = validationInject

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
  <i class="bi bi-file-earmark-x"></i>
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
  createLogOffButton()
}


// ===============FORM PROCESS===============



let validationLog;


function printForm() {
  headerComponent.innerHTML = `

  <h2 class="form-main-title"> <i class="bi bi-person-circle"></i>Registro</h2>
<p class="salute">Registrese para comenzar a operar:</p>

  <form action="" id="formulario">
  
  <input type="text" name="fname" placeholder="Su nombre" id="inputNombre"><br>
  
  <br>
  <input type="email" name="lname" placeholder="Su email" id="inputMail"><br><br>
  
  <input class="btn btn-primary"type="submit" value="Login" id>
  </form>
  `
  inicializarElementos();
  inicializarEventos();
}

let nombre
let mail


function inicializarElementos() {
  formulario = document.getElementById("formulario");
  inputNombre = document.getElementById("inputNombre");
  inputMail = document.getElementById("inputMail");



}

function inicializarEventos() {
  formulario.onsubmit = (event) => validarFormulario(event);
}
function validarFormulario() {
  nombre = inputNombre.value;
  mail = inputMail.value;



  if (nombre == "" || mail == "") {
    alert('Debe completar todos los campos para continuar')
  } else {
    recordUserSession()
  }

}



function recordUserSession() {
  sessionStorage.setItem("user", nombre)
  sessionStorage.setItem("email", mail)
  alert('Logueando....')
}


function logOut() {
  sessionStorage.clear()
  alert('Gracias. Vuevla pronto!')
  reloadPage()
}