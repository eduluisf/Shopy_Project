// este codigo es una maquina registradora de ventas, donde se  pide el nombre del prodcuto, precip, iva, y descuento;

// Dividir entre 100 para sacar el porcentaje
const porcentaje = (a) => a / 100;
// objeto que emitira la factura si se permite la compra

let boton = document.getElementsByClassName("btn-buy");

for (var i = 0; i < boton.length; i++) {
  boton[i].addEventListener("click", createTable, false);
}
class compraObj {
  constructor(id, nombre, precioini) {
    this.id = id;
    this.nombre = nombre;
    this.precioini = parseFloat(precioini);
  }

  //operacion iva
  ivaope() {
    this.iva = porcentaje(19) * this.precioini;
  }

  // calculo descuento
  descuentofinalismo() {
    this.descuentofinal = this.precioini * porcentaje(this.descuento);
  }

  // calculo precio final
  precioFinalismo() {
    this.preciofinal = this.precioini + this.iva - this.descuentofinal;
  }
}

const arrayobj = [];
var numeroObjVendidos = 0;
var dineroVentas = 0;

function buy() {
  let nombre = "Tshirt";
  let precioini = 150;
  const obj1 = new compraObj(arrayobj.length + 1, nombre, precioini);
  arrayobj.push(obj1);
  console.log(arrayobj);
  numeroObjVendidos++;
  dineroVentas += precioini;
}

// funcion para llamarse desde botones
var cart = document.createElement("table");
var cartTotal = document.createElement("table");
var rowtotal = document.createElement("tr");
var columntotal = document.createElement("td");
var btnBuyall = document.createElement("BUTTON");

rowtotal.appendChild(columntotal);
document.getElementById("tablecarttotal").appendChild(rowtotal);
btnBuyall.innerText = "Comprar";

function showbtn(cant) {
  if (cant > 0) document.getElementById("btnBuy").appendChild(btnBuyall);
}

function createTable() {
  buy();
  for (const cartproducts of arrayobj) {
    var row = document.createElement("tr");
    var column = document.createElement("td");
    column.innerText = cartproducts.id;
    row.appendChild(column);
    var column2 = document.createElement("td");
    column2.innerText = cartproducts.nombre;
    row.appendChild(column2);
    var column3 = document.createElement("td");
    column3.innerText = cartproducts.precioini;
    row.appendChild(column3);
  }
  cart.appendChild(row);
  columntotal.innerText = dineroVentas;
  document.getElementById("tablecart").appendChild(cart);
  showbtn(dineroVentas);
}
