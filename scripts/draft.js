let catalogoDisponible = [
    { id: 1, nombre: "PC Gamer", precio: 148000, cant: 10, stock: true },
    { id: 2, nombre: "Laptop", precio: 89500, cant: 20, stock: true },
    { id: 3, nombre: "Gabinete", precio: 34200, cant: 20, stock: true },
    { id: 4, nombre: "Iphone X", precio: 190000, cant: 20, stock: true },
    { id: 5, nombre: "Samsung X", precio: 120000, cant: 20, stock: true },
    { id: 6, nombre: "Iphone 14", precio: 400000, cant: 0, stock: false },
    { id: 7, nombre: "Camara seguridad", precio: 17800, cant: 0, stock: false },
    { id: 8, nombre: "Monitor Curvo", precio: 130000, cant: 10, stock: true },
    { id: 9, nombre: "Teclado Retroiluminado", precio: 170000, cant: 5, stock: true },
    { id: 10, nombre: "Disco SSD 2TB", precio: 45000, cant: 30, stock: true },
    { id: 11, nombre: "Geforce RTX", precio: 92000, cant: 2, stock: true },
    { id: 12, nombre: "GoPro Hero 10 Black", precio: 143000, cant: 10, stock: true },
]
const contenedorProductos = document.getElementById("contenedor-productos");
contenedorProductos.innerHTML = "buscar"

function updateResult(query) {
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
        <input type="number" class="tentacles" id=${value2} name="tentacles" min="1" max="${value3}" value="0">`
        }
        return value1
    }




    const detalle = catalogoDisponible.filter(obj => obj.nombre.toLowerCase().includes(query.toLowerCase())).map(obj => (`
    <div class="card">
        <div class="card-body">
        <div class="image-container">
        
        </div>
        <div class="product-description">
        <i class="card-text-title"><i>${obj.nombre}</i></i>
        <p class="card-text"><b>${obj.precio.toLocaleString('en-US')}</b></p>
        ${stockWordingShow(obj.cant)}
        <p class="card-text-stock-mising"><b>${stockWording(obj.stock)}</b></p>
   <div class="wrapper-cant">
   ${quantitySelector(obj.stock, obj.id_product, obj.cant)}
   </div>
        
   </div>
        </div>
    </div>`));

    if (query == "") {
        contenedorProductos.innerHTML = "buscar"
    } else {
        contenedorProductos.innerHTML = ""
        detalle.map(e => {
            let detalle2 = e
            contenedorProductos.innerHTML += `<div>${detalle2}</div>`
        })
    }



}