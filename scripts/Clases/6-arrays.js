// -------------ARRYAS

// let arrayPaises = ["Argentina", "Venezuela", "Colombia", "Mexico"];

// for (let index = 0; index < arrayPaises.length; index++) {
//     console.log("Index: " + index + " : " + arrayPaises[index])
// }


// |||||||||||||||||||||||||||||||||||||||||
//AGREGAR:

// let arrayNombres = ["Perdo", "Juan", "David", "Luis"];
// console.log(arrayNombres)

// // ARGEGAR AL FINAL: >>>>>> PUSH 
// let nombre = "Jorge"
// arrayNombres.push(nombre)

// // ARGEGAR AL PRINCIPIO: >>>>>> UNSHIFT 
// arrayNombres.unshift("Carlos")

// QUITAR: 

// let arrayNombres = ["Perdo", "Juan", "David", "Luis"];

// // //ELIMINA EL ULTIMO >>>>>> POP
// // arrayNombres.pop(arrayNombres)
// // console.log(arrayNombres)

// // //ELIMINA EL PRIMERO >>>>>> SIHFT
// // arrayNombres.shift(arrayNombres)
// // console.log(arrayNombres)

//ELIMINA VARIOS ELEMENTOS >>>>>> SIHFT

// let arrayProductos = ["Laptop", "PC", "Celular"]

// arrayProductos.splice(0, 2)
// console.log(arrayProductos)


//CONCATENAR ARRAYS >>>>>>> .concat

// let arrayProductos = ["Laptop", "PC", "Celular"];
// let arrayProductosDos = ["iphone", "Ipad", "Samsung"];

// let arrayCombinado = arrayProductos.concat(arrayProductosDos)

// console.log(arrayProductos)
// console.log(arrayProductosDos)

// console.log(arrayCombinado)


// ===================CONCATENAR TODOS LOS ELEMENTOS DE UN ARRAY===================

// let arrayProductos = ["Laptop", "PC", "Celular"];

// let arrayConcatenado = arrayProductos.join("|")
// console.log(arrayConcatenado)

// let arrayProductos = ["Laptop", "PC", "Celular"];

// let porcionArray = arrayProductos.slice(0, 2)

// console.log(porcionArray)


// ===================CONOCER EL INDEX DE ELEMENTOS DE UN ARRAY===================
// let arrayProductos = ["Laptop", "PC", "Celular","Laptop"];
// console.log(arrayProductos.indexOf("Laptop"))
// console.log(arrayProductos.indexOf("Celular"))



// ===================CONOCER SI UN ELEMENTO EXISTE EN EL ARRAY===================
// let arrayProductos = ["Laptop", "PC", "Celular","Laptop"];

// console.log(arrayProductos.includes("Laptop"))
// console.log(arrayProductos.includes("Celular barato"))


// ===================INVIERTE UN ARREGLO==================
// let arrayProductos = ["Laptop", "PC", "Celular"];

// //Reverse es destructivo, modifica el arreglo original
// console.log(arrayProductos)

// console.log(arrayProductos.reverse())



// ============FOR OF============

// let arrayProductos = ["Laptop", "PC", "Celular"];


// for (let producto of arrayProductos) {
//     console.log(producto)

// }

// ============MODIFICAR ELEMENTO EXISTENTE============

// let arrayProductos = ["Laptop", "PC", "Celular"];

// console.log (arrayProductos)

// arrayProductos[0] = "Mac"

// console.log (arrayProductos)


// ============ELIMINAR UN ELEMENTO ESPECIFICO DE UN ARRAY============

// const nombres = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa",]

// function eliminarElemento(nombre) {
//     let index = nombres.indexOf(nombre)
//     if (index != -1) {
//         nombres.splice(index, 1)
//     } else {
//         alert("Nombre no encontrado")
//     }
// }

// let valorAEliminar = prompt("Ingrese un Nombre")
// eliminarElemento(valorAEliminar)
// console.log(nombres)



// ============EJEMPLO COMPLETO (ARREGLOS DE OBJETOS)============

class Producto {
    constructor(nombre, precioCompra, precioVenta, cantidad) {
        this.nombre = nombre.toUpperCase();
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidad = cantidad;
    }

    calcularCosto = () => this.cantidad * this.precioCompra
}


function agregarProductos() {
    let productos = [];
    let numeroProductos = parseInt(prompt("Ingrese cantidad de productos a ingresar"));

    for (let index = 0; index < numeroProductos; index++) {
        let nombre = prompt("Ingrese nombre del producto");
        let precioCompra = parseFloat(prompt("Ingrese el precio de compra"));
        let precioVenta = parseFloat(prompt("Ingrese el precio de venta"));
        let cantidad = parseInt(prompt("Ingrese la cantidad a comprar"));

        let productoARegistrar = new Producto(nombre, precioCompra, precioVenta, cantidad);

        productos.push(productoARegistrar)

    }
    return productos
}

function mostrarProductos(productos) {
    for (const producto of productos) {
      console.log(producto);
      console.log(producto.nombre);
    }
  }
  
  function calcularCosto(productos) {
    let sumatoriaCosto = 0;
    for (const producto of productos) {
      sumatoriaCosto += producto.calcularCosto();
    }
    return sumatoriaCosto;
  }
  
  function main() {
    let productos = agregarProductos();
    mostrarProductos(productos);
    let costoAlmacen = calcularCosto(productos);
    alert("El costo total del almacén es: " + costoAlmacen);
  }
  
  main();