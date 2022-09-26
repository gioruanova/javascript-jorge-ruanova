
const contenedorProductos = document.getElementById("detail-historic-purchase");

for (let i = 0; i < localStorage.length; i++) {
  let clave = localStorage.key(i)
  let valor = JSON.parse(localStorage.getItem(localStorage.key(i)))

  let newArray = []

  for (const productos of valor) {
    let cardProd = document.createElement("div");
    cardProd.id = `detail-historic`;

    cardProd.innerHTML = `





    <p class="title-purchase">Compra ${clave}</p>
  <div class="totalamount-account">
  
<div>
<p>${productos.nombre}</p>
<div class="sub-detail">
<p>$${productos.precio.toLocaleString('en-US')}</p>
<p>${productos.cantidad}</p>
</div>
</div>
  <div>
  <p>$${productos.totalAmount.toLocaleString('en-US')}</p>
  </div>
  </div>


    `
    contenedorProductos.append(cardProd);
}

  
  
  








};













function deleteStorage() {
  localStorage.clear()
  contenedorProductos.innerHTML = "Sus registros se encuentran vacios:"
  alert('Registros eliminados')
}