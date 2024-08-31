//iMPORTS
// import { url } from "../script.js";

//GET ELEMENTS
const apiUrl = "https://v2.api.noroff.dev/square-eyes";
const addToCartParentEL = document.querySelector(".cartFunction");
const cartEl = document.querySelector("#cart");
const menuCartEl = document.querySelector("#top-cart");
const bodyEl = document.querySelector("body");
const closeEL = document.querySelector(".cartTab .close");
const calTotalEl = document.querySelector(".subTotal");

const checkOutBtn = document.querySelector("#CO");
checkOutBtn.disabled = true;
checkOutBtn.classList.add("disabled");

let listCartHTML = document.querySelector(".cartList");
let cartCounter = document.querySelector("#counter");
let menuCounter = document.querySelector("#menuCounter");
let products = [];
let cartItems = [];

//EVENT LISTENERS

//goToCheckout - Not enough time to write functionality to get items from shopping cart to check-out. Probably simple, but not enough time to figure it out.
// goToCheckOut.addEventListener("click", () => {
//   checkOutPage();
// });

// function checkOutPage() {
//   window.location.href = "../../pages/checkout.html";
// }

//cart-toggle
cartEl.addEventListener("click", () => {
  bodyEl.classList.toggle("showCart");
  renderTotal();
  disableCheckOut();
});
menuCartEl.addEventListener("click", () => {
  bodyEl.classList.toggle("showCart");
  renderTotal();
  disableCheckOut();
});
//close cart
closeEL.addEventListener("click", () => {
  bodyEl.classList.toggle("showCart");
});
//add to cart
addToCartParentEL.addEventListener("click", (event) => {
  let locateClick = event.target;
  if (locateClick.classList.contains("PushToCart")) {
    let product_id = locateClick.parentElement.dataset.id;
    placeInCart(product_id);
  }
});

//remove from cart
listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    removeFromCart(product_id, type);
  }
});

//REMOVE FROM CART
const removeFromCart = (product_id, type) => {
  let positionItemInCart = cartItems.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cartItems[positionItemInCart];
    switch (type) {
      case "plus":
        cartItems[positionItemInCart].quantity =
          cartItems[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cartItems[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cartItems[positionItemInCart].quantity = changeQuantity;
        } else {
          cartItems.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  renderCart();
  addCartToStorage();
  renderTotal();
  disableCheckOut();
};

//ADD TO CART

const placeInCart = (product_id) => {
  let locateThisProductInCart = cartItems.findIndex(
    (value) => value.product_id === product_id
  );
  if (cartItems.length <= 0) {
    cartItems = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (locateThisProductInCart < 0) {
    cartItems.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    alert("Product is already in cart!");
  }
  renderCart();
  addCartToStorage();
  renderTotal();
  disableCheckOut();
};

//ADD CART TO LOCALSTORAGE
const addCartToStorage = () => {
  localStorage.setItem("inCart", JSON.stringify(cartItems));
};

//RENDER CART
const renderCart = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cartItems.length > 0) {
    cartItems.forEach((cartItems) => {
      totalQuantity = totalQuantity + cartItems.quantity;
      const newCart = document.createElement("div");
      newCart.classList.add("cartItem");
      newCart.dataset.id = cartItems.product_id;
      let positionProduct = products.findIndex(
        (vv) => vv.id === cartItems.product_id
      );
      let info = products[positionProduct];
      newCart.innerHTML = `<div class="movie">
                          <a href ="../pages/movie_details2.html?id=${info.id}">   
                          <img src="${info.image.url}" alt=""></a>
                          <div class="minus"> X </div>
                          </div>
                          <div class="title">${info.title}</div>
                          <div class="price"><b>Price:</b>Kr ${info.discountedPrice}</div>
                          `;
      listCartHTML.appendChild(newCart);
    });
  }
  cartCounter.innerText = totalQuantity;
  menuCounter.innerText = totalQuantity;
};

//CALC AND RENDER SUBTOTAL
function renderTotal() {
  let tPrice = 0,
    tItems = 0;

  cartItems.forEach((cartItems) => {
    let pP2 = products.findIndex((val) => val.id === cartItems.product_id);
    let cInfo = products[pP2];

    tPrice += cInfo.discountedPrice;
    tItems += cartItems.quantity;
  });

  calTotalEl.innerHTML = `Subtotal (${tItems} items): Kr ${tPrice.toFixed(2)}`;
}

//ENABLE / DISABLE CHECK-OUT BUTTON
function disableCheckOut() {
  let getArray = JSON.parse(localStorage.getItem("inCart"));

  if (getArray.length <= 0) {
    checkOutBtn.disabled = true;
    checkOutBtn.classList.add("disabled");
  } else if (getArray.length > 0) {
    checkOutBtn.disabled = false;
    checkOutBtn.classList.remove("disabled");
  }
}

export async function initialize() {
  const apiCall = await fetch(apiUrl);
  const apiJSON = await apiCall.json();
  const apiProducts = apiJSON.data;
  products = apiProducts;

  //GET CART FROM LOCALSTORAGE
  if (localStorage.getItem("inCart")) {
    cartItems = JSON.parse(localStorage.getItem("inCart"));
    renderCart();
  }
  //   console.log("apiProducts: ", apiProducts);
}

initialize();
