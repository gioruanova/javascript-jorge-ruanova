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
<h2 class="animate__animated animate__fadeInDown"> <i class="bi bi-person-circle"></i> My Account</h2>
<p class="salute animate__animated animate__fadeInDown">Bienvenido <b>${nameUserSession} (${mailUserSession})</b> a su cuenta</p>
<p class="text animate__animated animate__fadeInDown">A continuacion podra ver el historial de sus operaciones realizadas:</p>
`
const filledStore = `
<h2 class="animate__animated animate__fadeInDown"> <i class="bi bi-person-circle"></i> My Account</h2>
<p class="salute animate__animated animate__fadeInDown">Bienvenido <b>${nameUserSession} (${mailUserSession})</b> a su cuenta</p>
<p class="text animate__animated animate__fadeInDown">Usted no tiene historial de compras</p>
`
// =============STORE VALIDATION  LOGIN AND HISTORY =============
currentHistory < 1 ? true : false
let validationInject = currentHistory ? emptyStore : filledStore
logueado ? startExperience() : printForm()

// =============IMPRIMIR HISTORIAL COMPRAS=============
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
  deleteRecord()


}

// =============DELETE ALL LOCALSTORAGE=============


function deleteAll() {
  localStorage.clear();
  deleteAllMessage()

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
  const spinnerLoading = document.getElementById("detail-historic-purchase");

  spinnerLoading.innerHTML = `
  <div>    
  <img src="../imgs/spinner.gif"/>
  </div>    
  `


  setTimeout(function () {
    spinnerLoading.innerHTML = ""
    printStorage()
    createButton()

    createLogOffButton()
  }, 1500)

}
// ===============FORM PROCESS===============
let validationLog;
let nombre
let mail

function printForm() {
  const spinnerLoading = document.getElementById("detail-historic-purchase");

  spinnerLoading.innerHTML = `
  <div>    
  <img src="../imgs/spinner.gif"/>
  </div>    
  `

  setTimeout(function () {
    spinnerLoading.innerHTML = ""

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
  }, 1500)



}

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
  swalFormLogoIn()
}

function logOut() {
  sessionStorage.clear()
  swalFormLogout()
}

// MESSAGES----------------------------------------------------------------------------
function swalFormLogout() {
  const delayInMilliseconds = 2000
  Swal.fire({
    title: 'Deslogueando del sistema',
    text: 'Gracias. Vuelva pronto',
    icon: 'info',
    timerProgressBar: true,
    timer: 2000,
    background: "grey",
    color: "white",
    customClass: {
      confirmButton: 'btn-swall',
      cancelButton: 'btn-swall'
    },
    buttonsStyling: false
  })
  setTimeout(function () {
    reloadPage()
  }, delayInMilliseconds);

}


function swalFormLogoIn() {
  const delayInMilliseconds = 3000

  Swal.fire({
    title: 'Validando datos',
    text: 'Aguarde unos instantes mientras validamos sus credenciales',
    icon: 'info',
    timerProgressBar: true,
    timer: 2000,
    background: "grey",
    color: "white",
    customClass: {
      confirmButton: 'btn-swall',
      cancelButton: 'btn-swall '
    },
    buttonsStyling: false
  })
  setTimeout(function () {
    reloadPage()
  }, delayInMilliseconds);

}


function deleteRecord() {
  const delayInMilliseconds = 1500
  Toastify({
    text: "Registro eliminado exitosamente",
    duration: 1500,
    gravity: "top",
    offset: {
      x: 2,
      y: 70
    },
    style: {
      background: "green",
    },
  }).showToast();
  setTimeout(function () {
    printStorage()
    createButton()
    reloadPage()
  }, delayInMilliseconds);
}

function deleteAllMessage() {
  const delayInMilliseconds = 2000
  Toastify({
    text: "Historial eliminado",
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
  setTimeout(function () {
    printStorage()
    createButton()
    reloadPage()
  }, delayInMilliseconds);
}