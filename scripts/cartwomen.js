const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;

const templateCart = document.getElementById("template-cart").content;
const templateFooter = document.getElementById("template-footer").content;
const fragment = document.createDocumentFragment();
let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  if (localStorage.getItem("carrito")) {
    cart = JSON.parse(localStorage.getItem("carrito"));
    showCart();
  }
});

cards.addEventListener("click", (e) => {
  addcCart(e);
});

items.addEventListener("click", (e) => {
  btnAction(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("apiwomen.json");
    const data = await res.json();
    showCards(data);
  } catch (error) {}
};

const showCards = (data) => {
  data.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.title;
    templateCard.querySelector("p").textContent = product.precio;
    templateCard.querySelector("img").setAttribute("src", product.thumbnailUrl);
    templateCard.querySelector(".btn-dark").dataset.id = product.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addcCart = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCart(e.target.parentElement);
  }

  e.stopPropagation();
};

const setCart = (obj) => {
  const product = {
    id: obj.querySelector(".btn-dark").dataset.id,
    title: obj.querySelector("h5").textContent,
    precio: obj.querySelector("p").textContent,
    cantidad: 1,
  };
  if (cart.hasOwnProperty(product.id)) {
    product.cantidad = cart[product.id].cantidad + 1;
  }

  cart[product.id] = { ...product };

  showCart();
};

const showCart = () => {
  items.innerHTML = "";

  Object.values(cart).forEach((product) => {
    templateCart.querySelector("th").textContent = product.id;
    templateCart.querySelectorAll("td")[1].textContent = product.cantidad;
    templateCart.querySelectorAll("td")[0].textContent = product.title;
    templateCart.querySelector(".btn-info").dataset.id = product.id;
    templateCart.querySelector(".btn-danger").dataset.id = product.id;
    templateCart.querySelector("span").textContent =
      product.cantidad * product.precio;

    const clone = templateCart.cloneNode(true);
    fragment.appendChild(clone);
  });

  items.appendChild(fragment);
  showFooter();
  localStorage.setItem("carrito", JSON.stringify(cart));
};

const showFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(cart) == 0) {
    footer.innerHTML = `<th scope="row" colspan="5"> Carrito vacío</th> `;

    return;
  }

  const ncant = Object.values(cart).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nprecio = Object.values(cart).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  console.log(nprecio);

  templateFooter.querySelectorAll("td")[0].textContent = ncant;
  templateFooter.querySelector("span").textContent = nprecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnEmptyCart = document.getElementById("emptyCart");

  btnEmptyCart.addEventListener("click", () => {
    cart = {};
    showCart();
  });
};

const btnAction = (e) => {
  if (e.target.classList.contains("btn-info")) {
    console.log(cart[e.target.dataset.id]);
    const product = cart[e.target.dataset.id];

    product.cantidad = cart[e.target.dataset.id].cantidad + 1;
    cart[e.target.dataset.id] = { ...product };
    showCart();
  }

  if (e.target.classList.contains("btn-danger")) {
    const product = cart[e.target.dataset.id];

    product.cantidad = cart[e.target.dataset.id].cantidad - 1;

    if (product.cantidad === 0) {
      delete cart[e.target.dataset.id];
    }

    showCart();
  }

  e.stopPropagation();
};
