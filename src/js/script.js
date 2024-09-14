const btnCart = document.querySelector(".carrito"),
  containerCart = document.querySelector(".producto");

btnCart.addEventListener("click", () => {
  containerCart.classList.toggle("hidden-cart");
});

/* ======================================== */
const cartInfo = document.querySelector(".cart-product"),
  rowProduct = document.querySelector(".row-product"),
  // lista de todos los contenedores de productos
  productList = document.querySelector(".general");

let allProducts = [];

// Contadores de total
const valorTotal = document.querySelector("#total"),
  countProducts = document.querySelector("#counter");

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      subtitle: product.querySelector("span").textContent,
      title: product.querySelector("h4").textContent,
      price: product.querySelector("p").textContent,
    };

    const exits = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (exits) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });

      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
  }
});

// remove
rowProduct.addEventListener("click", (e) => {
  if ( e.target.classList.contains("close") ) {
    const product = e.target.parentElement;
    const title = product.querySelector(".row-product").innerText;
    // el problema es que no se cual es su elemento padre de close para que pueda acceder a ello
    allProducts = allProducts.filter(
      product => product.title !== title
    );

  }
  showHTML();
  // revisar y resolver esto!!!!!
});


// Funciones para mostrar HTML

const showHTML = () => {
  //Limpiar HTML
  rowProduct.innerHTML = "";

  let total = 0,
    totalOffProducts = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
    <div class="flex justify-between items-center">
      <div>
        <h5 class="text-sm">${product.title}</h5>
          <article class="flex gap-4 mt-2">
            <span class="text-[#BB4017]">${product.quantity}</span>
              <p class="font-normal text-[#a47363]">@ ${product.price}</p>
              <p class="text-[#a47363]">${product.price}</p>
          </article>
      </div>
      <div>
        <img src="../assets/images/x-circle.svg" alt="x-circle" />
      </div>
    </div>
    `;

    rowProduct.append(containerProduct);

    total = total + parseInt( product.quantity * product.price.slice(1) );
    totalOffProducts = totalOffProducts + product.quantity;
  });

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOffProducts;
};
