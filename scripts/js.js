let productQuantity = parseInt(prompt("Ingrese cantidad de productos a registrar:"))

while ((productQuantity <= 0) || (!productQuantity)) {
    productQuantity = parseInt(prompt("El valor debe ser mayor a 0 y numerico"))
}
let totalAmount = 0


// ---------------------------------------------------------------------------

for (let index = 1; index <= productQuantity; index++) {

    let productOrder = parseFloat(prompt("Ingrese el valor del primer producto " + index))
    while ((productOrder <= 0) || (!productOrder)) {
        productOrder = parseFloat(prompt("El valor debe ser mayor a 0 y numerico"))
    }
    totalAmount = totalAmount + productOrder
}
alert("El total de su pedido es: \nTotal de arituclos registrados: " + productQuantity + "\nTotal a abonar: $" + totalAmount)

// ---------------------------------------------------------------------------


let payment = parseFloat(prompt("Ingrese el total a abonar para poder calcular su vuelto:"))

while ((payment < 0 || payment != payment)) {
    payment = parseFloat(prompt("Debe ingresar al menos un valor y debe ser mayor o igual a 0"))

}
const paymentDif = totalAmount - payment
if (!payment) {
    alert('Usted no ha abonado. Adeuda el total: $' + totalAmount)
}
else if (paymentDif == 0) {
    alert('Su cuenta ha sido saldada. \nGracias.')
} else if (paymentDif < 0) {
    alert("Usted tiene un saldo acreedor de $" + Math.abs(paymentDif) + ". \nGracias.")
} else {
    alert("Lamentablemente el monto no ha sido cubierto. \nUsted todavia debe abonar un total de $" + paymentDif + ". \nGracias.")
}


// ---------------------------------------------------------------------------
console.log("Total productos= $" + productQuantity)
console.log("Total a a pagar= $" + totalAmount)
console.log("Total del pago= $" + payment)
console.log("Diferencia= $" + (totalAmount - payment))
// ---------------------------------------------------------------------------


let newRequest = prompt("Algo mas en que lo pueda ayudar?\n(pista: elegir 'a' para finalizar)\n a. No gracias.\nb. Dejame pensar.\nv. No estoy seguro.")
while (newRequest != "a") {
    switch (newRequest) {
        case "a":
            alert("Gracias hasta luego!");
            break;
        case "b":
            alert("Ok, te dejo pensar, pero apurate que tengo que seguir con el curso de JS.")
            break;
        case "c":
            alert("Ya soy Frontend developer SR. Ya pensaste?")
            break;
        default:
            alert('Disculpe no comprendo')
    }
    newRequest = prompt("Algo mas en que lo pueda ayudar?\n(pista: elegir 'a' para finalizar)\n a. No gracias.\nb. Dejame pensar.\nv. No estoy seguro.")
}




