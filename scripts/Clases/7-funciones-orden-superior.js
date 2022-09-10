
// let arrayPaises = ["Argentina", "Brasil", "Mexico", "Peru"]


// existeArgentina = arrayPaises.find((elemento) => elemento === "Argentina");

// console.log(existeArgentina)


let arrayProductos = [
  { nombre: "Laptop1", precio: 1000, cantidad: 3 },
  { nombre: "PC", precio: 800, cantidad: 2 },
  { nombre: "Laptop2", precio: 1200, cantidad: 5 },
]


let productosEncontrados = arrayProductos.filter((elemento)=>elemento.nombre =="Laptop")


console.log(productosEncontrados)