
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


function capitalizedText(value1) {
    let capitalized = ""
    capitalized = value1.charAt(0).toUpperCase() + value1.slice(1)
    return capitalized;
}




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
    console.log('-------------------|---------------------')
}

//  FUNCTION PRINT SHIPPING

function printShipping() {
    const shippingOne = shippingQuestions();
    console.log("Sus productos (" + productQuantity + ") por un total de $" + totalAmount.toLocaleString('en-US') + "\nSeran entregados en la direccion: \n" + capitalizedText(shippingOne.address) + " " + shippingOne.number + "\n" + capitalizedText(shippingOne.city) + ", " + (shippingOne.country).toUpperCase() + "\n(CP: " + shippingOne.zipcode + ")");

    alert("Sus productos (" + productQuantity + ") por un total de $" + totalAmount.toLocaleString('en-US') + "\nseran entregados en la direccion: \n" + capitalizedText(shippingOne.address) + " " + shippingOne.number + "\n" + capitalizedText(shippingOne.city) + ", " + (shippingOne.country).toUpperCase() + "\n(CP: " + shippingOne.zipcode + ")")
}


// OBJECT CREATION------------------------------
function shippingAddress(address, number, city, country, zipcode) {
    this.address = address;
    this.number = number;
    this.city = city;
    this.country = country;
    this.zipcode = zipcode;

}

function whileShippingText(var1) {
    while ((!var1)) {
        var1 = prompt(("Debe ingresar al menos un dato"))
    }
    return var1
}
function whileShippingNumber(var1) {
    while ((!var1) || (var1 <= 0)) {
        var1 = parseInt(prompt(("Debe ingresar al menos una numeracion")))
    }
    return var1
}


function shippingQuestions() {
    let address = prompt("Ingrese su direccion");
    address = whileShippingText(address);
    let number = prompt("Ingrese la numeracion");
    number = whileShippingNumber(number);
    let city = prompt("Ingrese la ciudad");
    city = whileShippingText(city);
    let country = prompt("ingrese el pais");
    country = whileShippingText(country);
    let zipcode = parseInt(prompt("Ingrese su CP"));
    zipcode = whileShippingNumber(zipcode);

    const newShipping = new shippingAddress(
        address, number, city, country, zipcode
    );
    return newShipping;
    ;
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
    alert('Usted no ha abonado. El envio no puede completarse. Adeuda el total: $' + totalAmount.toLocaleString('en-US'))
    dato = 'Saldo deudor de'
    printBilling()
}
else if (paymentDif == 0) {
    alert('Su cuenta ha sido saldada.\nA continuacion procederemos a generar el envio del producto')
    dato = 'Su cuenta esta en'
    printBilling()
    printShipping()

} else if (paymentDif < 0) {
    alert("Su cuenta ha sido saldada.\nA continuacion procederemos a generar el envio del producto.\n(usted tiene un saldo acreedor de $" + Math.abs(paymentDif).toLocaleString('en-US') + ".")
    dato = 'Saldo acreedor de'
    printBilling()
    printShipping()


} else {
    alert("Lamentablemente el monto no ha sido cubierto.\nEl envio no puede completarse.  \nUsted todavia debe abonar un total de $" + paymentDif.toLocaleString('en-US') + ". \nGracias.")
    dato = 'Saldo pendiente de'
    printBilling()
}




//---------



