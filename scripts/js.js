const productQuantity = parseInt(prompt("Ingrese cantidad de productos a registrar:"))
let totalAmount = 0

for (let index = 1; index <= productQuantity; index++) {
    const productOrder = parseFloat(prompt("Ingrese el valor del primer producto " + index))
    totalAmount = totalAmount + productOrder
}

if (!productQuantity) {
    alert('Debe ingresar al menos 1 producto')
}
else if (productQuantity == 0) {
    alert('Debe ingresar al menos 1 producto')
} else {
    alert("El total de su pedido es: \nTotal de arituclos registrados: " + productQuantity + "\nTotal a abonar: $" + totalAmount)
}


if (!productQuantity) {
    ""
} else if (productQuantity == 0) {
    ""
} else {
    const payment = parseInt(prompt("Ingrese el total a abonar para poder calcular su vuelto:"))
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

}

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




