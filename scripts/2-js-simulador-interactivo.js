// MESSAGES: PRODUCTS QUANTITY---
const productQuantityText = 'Ingrese cantidad de productos a registrar:'
const errorInputMessage = 'Ingrese cantidad de productos a registrar.\n(el valor debe ser mayor a 0 y numerico)'

// MESSAGES: PRODUCT AMOUNT---
const inputValueMessage = 'Ingrese el valor del producto '
const errorInputValueMessage = 'Ingrese el valor del producto.\n(el valor debe ser mayor a 0 y numerico) '

// MESSAGES: PAYMENTS---
const paymentMessage = 'Ingrese el total a abonar para poder calcular su vuelto:'
const paymentErrorMessage = 'Debe ingresar al menos un valor y debe ser mayor o igual a 0\n (por lo menos $1 trata de pagar)'
// ---------------------------------------------------------------------------------------------

// FUNCTION MESSAGES
function messageGenerator(message, value, messageselector) {
    switch (messageselector) {
        case "onlyMessage":
            return prompt(message);
            break;
        case "messageWithValue":
            return prompt(message + value);
            break;

        default:
            return "";
            break;
    }
}

// FUNCTION CALC
function calculations(amount1, amount2, opeation) {
    switch (opeation) {
        case "+":
            return amount1 + amount2;
            break;
        case "-":
            return amount1 - amount2;;
            break;

        default:
            return "ERROR";
            break;
    }
}

// FUNCTION AUTO WHILE
function whileAutomation(var1, var2, var3, var4) {
    while ((var1 <= 0) || (!var1)) {
        var1 = parseInt(messageGenerator(var2, var3, var4))
    }
    return var1
}

//  FUNCTION PRINT DETAIL
function printBilling() {
    console.log("Total productos: " + productQuantity + " - " + "Total a a pagar: $" + totalAmount.toLocaleString('en-US'))
    console.log('----------------------------------------')
    console.log("Total del pago: $" + payment.toLocaleString('en-US') + " - " + dato + " $" + Math.abs(totalAmount - payment).toLocaleString('en-US'))

}


// PROD QUANTITY---------------------------------------------------------------------------------------------
let productQuantity = 0
productQuantity = parseInt(messageGenerator(productQuantityText, "", "onlyMessage"))
productQuantity = whileAutomation(productQuantity, errorInputMessage, "", "onlyMessage")


// PROD AMOUNT---------------------------------------------------------------------------
let totalAmount = 0
for (let index = 1; index <= productQuantity; index++) {
    let productOrder = parseFloat(messageGenerator(inputValueMessage, index, "messageWithValue"))
    productOrder = whileAutomation(productOrder, errorInputValueMessage, "", "onlyMessage")
    totalAmount = calculations(totalAmount, productOrder, "+")
}
alert("El total de su pedido es: \nTotal de arituclos registrados: " + productQuantity + "\nTotal a abonar: $" + totalAmount.toLocaleString('en-US'))


// PAYMENT---------------------------------------------------------------------------
let payment = 0
payment = parseFloat(messageGenerator(paymentMessage, "", "onlyMessage"))
payment = whileAutomation(payment, paymentErrorMessage, "", "onlyMessage")
const paymentDif = calculations(totalAmount, payment, "-")


let dato = ""
if (!payment) {
    alert('Usted no ha abonado. Adeuda el total: $' + totalAmount.toLocaleString('en-US'))
    dato = 'Saldo deudor de'
}
else if (paymentDif == 0) {
    alert('Su cuenta ha sido saldada. \nGracias.')
    dato = 'Su cuenta esta en'

} else if (paymentDif < 0) {
    alert("Usted tiene un saldo acreedor de $" + Math.abs(paymentDif).toLocaleString('en-US') + ". \nGracias.")
    dato = 'Saldo acreedor de'

} else {
    alert("Lamentablemente el monto no ha sido cubierto. \nUsted todavia debe abonar un total de $" + paymentDif.toLocaleString('en-US') + ". \nGracias.")
    dato = 'Saldo pendiente de'
}



printBilling()
//---------
