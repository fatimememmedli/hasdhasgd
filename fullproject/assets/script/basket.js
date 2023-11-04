let localBasketArr = JSON.parse(localStorage.getItem("basket"));
let totalPriceBox = document.querySelector(".totalPrice");
let totalPriceValue = document.querySelector(".totalPriceValue");
let toBeLogin = document.querySelector(".to-be-login");
let doneLogin = document.querySelector(".done-login");
let balance = document.querySelector(".balance");
let dontRegister = document.querySelector(".dont-register");
let logOutIcon = document.querySelector(".logOutIcon");
console.log(localBasketArr);
let basketArr = [];
if (localBasketArr) {
  basketArr = [...localBasketArr];
}

let FavTable = document.querySelector(".FavTable");
basketArr.forEach((elem) => {
  FavTable.innerHTML += `
  <tr>
            <th scope="row">${elem.id}</th>
            <td>${elem.name}</td>

            <td>
              <div class="fav-image">
                <img src="${elem.imageLink}" alt="" />
              </div>
            </td>
            <td>${Math.round(elem.price * elem.quantity)}</td>
            <td>${elem.quantity}</td>

            <td>
              <button name="${
                elem.id
              }" type="button" class="increase-btn btn btn-success">+</button>
            </td>
            <td>
              <button name="${
                elem.id
              }" type="button"  class="decrease-btn btn btn-danger">-</button>
            </td>
            <td>
              <button type="button" name="${
                elem.id
              }" class="basket-delete-button btn btn-outline-danger">
                <i
                  name="${elem.id}"
                  class="fav-delete-button fa-solid fa-trash"
                ></i>
              </button>
            </td>
          </tr>
          
  `;
});
let increaseBtns = document.querySelectorAll(".increase-btn");
let total = 0;

for (let element of basketArr) {
  total += element.price * element.quantity;
}

console.log(Math.round(total));
totalPriceValue.textContent = Math.round(total);
for (let increaseBtn of increaseBtns) {
  increaseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentElement.previousElementSibling.textContent++;
    console.log(this.parentElement.previousElementSibling.textContent);
    // console.log(basketArr[this.name - 1]);
    this.parentElement.previousElementSibling.previousElementSibling.textContent =
      Math.round(
        basketArr[this.name - 1].price *
          this.parentElement.previousElementSibling.textContent
      );

    basketArr[this.name - 1].quantity =
      this.parentElement.previousElementSibling.textContent;

    localStorage.setItem("basket", JSON.stringify(basketArr));
    let total = 0;

    for (let element of basketArr) {
      total += element.price * element.quantity;
    }

    console.log(Math.round(total));
    totalPriceValue.textContent = Math.round(total);

    // localBasketArr.forEach((elem) => {
    //   // console.log(this.name);
    //   if (elem.id == this.name) {
    //     localBasketArr[this.name - 1].quantity++;
    //     localStorage.setItem("basket", JSON.stringify(localBasketArr));
    //   }
    // });
  });
}
let decreaseBtns = document.querySelectorAll(".decrease-btn");
console.log(decreaseBtns);
for (let decreaseBtn of decreaseBtns) {
  decreaseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (
      this.parentElement.previousElementSibling.previousElementSibling
        .textContent > 1
    ) {
      this.parentElement.previousElementSibling.previousElementSibling
        .textContent--;

      this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent =
        Math.round(
          basketArr[this.name - 1].price *
            this.parentElement.previousElementSibling.previousElementSibling
              .textContent
        );

      basketArr[this.name - 1].quantity =
        this.parentElement.previousElementSibling.previousElementSibling.textContent;
      localStorage.setItem("basket", JSON.stringify(basketArr));
      let total = 0;

      for (let element of basketArr) {
        total += element.price * element.quantity;
      }

      console.log(Math.round(total));
      totalPriceValue.textContent = Math.round(total);
    }
  });
}
let removeAllBtn = document.querySelector(".remove-all");
removeAllBtn.addEventListener("click", function () {
  localStorage.removeItem("basket");
  FavTable.remove();
  totalPriceValue.textContent = 0;
});
let basketDeleteBtns = document.querySelectorAll(".basket-delete-button");
console.log(basketDeleteBtns);
for (let basketdeletebtn of basketDeleteBtns) {
  basketdeletebtn.addEventListener("click", function () {
    basketArr = basketArr.filter((elem) => elem.id != this.name);
    localStorage.setItem("basket", JSON.stringify(basketArr));
    this.parentElement.parentElement.remove();
    let total = 0;

    for (let element of basketArr) {
      total += element.price * element.quantity;
    }

    console.log(Math.round(total));
    totalPriceValue.textContent = Math.round(total);
  });
}
let balanceSpan = document.querySelector(".balanceSpan");
let localLoginArr = JSON.parse(localStorage.getItem("login"));
console.log(localLoginArr);
// let loginArr = [...localLoginArr];
let orderBtn = document.querySelector(".order-btn");
if (localLoginArr) {
  balance.classList.replace("d-none", "d-block");
  // console.log(localLoginArr.balance);
  balanceSpan.textContent = localLoginArr.balance;
  toBeLogin.classList.replace("d-block", "d-none");
  doneLogin.classList.replace("d-none", "d-block");
  dontRegister.classList.replace("d-block", "d-none");
  logOutIcon.classList.remove("d-none", "d-block");
  doneLogin.textContent = localLoginArr.username;
}
let userURL = "http://localhost:3000/users/";

console.log(basketArr);

orderBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (doneLogin.classList.contains("d-block")) {
    balance.classList.replace("d-none", "d-block");
    console.log("salam");
    balanceSpan.textContent = localLoginArr.balance;

    if (+balanceSpan.textContent > +totalPriceValue.textContent) {
      //get user by id
      axios(userURL).then((res) => {
        let data = res.data;
        console.log("test data", data);
        data.forEach((element) => {
          if (element.id == localLoginArr.id) {
            axios.patch(userURL + `${element.id}`, {
              orders: [
                ...element.orders,
                {
                  id: Math.random().toString(16).slice(2),
                  orderDate: new Date(),
                  totalPrice: Number(totalPriceValue.textContent),
                },
              ],
            });
          }
        });
      });
      // console.log("salam");
      localStorage.removeItem("basket");
      FavTable.remove();
      balanceSpan.textContent =
        balanceSpan.textContent - totalPriceValue.textContent;
      // totalPriceValue.textContent = 0;
      axios.patch(userURL + `${localLoginArr.id}`, {
        balance: Number(balanceSpan.textContent),
      });
      localLoginArr.balance = balanceSpan.textContent;
      localStorage.setItem("login", JSON.stringify(localLoginArr));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Balance is not enough!",
        footer: '<a href="">Decrease basket item!</a>',
      });
    }
  } else {
    document.location.href = "login.html";
  }
});

logOutIcon.addEventListener("click", function () {
  localStorage.removeItem("login");
});
