let mealsBox = document.querySelector(".cards");
let urlMeals = "http://localhost:3000/meals";

axios(urlMeals).then((res) => {
  let data = res.data;
  data.forEach((meal) => {
    mealsBox.innerHTML += `
    <div class="col-3 mb-5">
          <div class="card card-main" style="width: 18rem">
            <div class="card-image">
              <img
                src="${meal.imageLink}"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">${meal.name}</h5>
              <p class="card-text">
                Price: <b> ${meal.price}</b>
              </p>
              <a
                href="./detailMail.html?id=${meal.id}"
                class="btn btn-outline-primary"
                >Detail</a
              >
              <button type="button" class="meal-delete-btn btn btn-outline-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button name=${meal.id} type="button" class="basket-btn btn btn-outline-primary">
                <i class="fa-solid fa-basket-shopping"></i>
              </button>
              <button type="button" class="btn btn-outline-danger">
                  <i  name="${meal.id}" class="fav-icon fa-regular fa-heart"></i>
                </button>
            </div>
          </div>
        </div>
    `;
  });

  let basketBtns = document.querySelectorAll(".basket-btn");
  //   console.log(basketBtns);
  let basketArr = [];
  let localBasket = JSON.parse(localStorage.getItem("basket"));
  if (localBasket) {
    basketArr = [...localBasket];
  }

  for (let basketbtn of basketBtns) {
    basketbtn.addEventListener("click", function () {
      console.log("salam");
      if (basketArr.find((elem) => elem.id == this.name)) {
        basketArr[basketbtn.name - 1].quantity++;
        localStorage.setItem("basket", JSON.stringify(basketArr));
      } else {
        data.forEach((elem) => {
          if (elem.id == this.name) {
            elem.quantity = 1;
            basketArr.push(elem);
            localStorage.setItem("basket", JSON.stringify(basketArr));
          }
        });
      }
    });
  }

  let favIcons = document.querySelectorAll(".fav-icon");
  let favMealArr = [];
  console.log(favIcons);
  let localFavArr = JSON.parse(localStorage.getItem("favMeal"));
  if (localFavArr) {
    favMealArr = [...localFavArr];
  }

  for (let faviconn of favIcons) {
    for (let item of favMealArr) {
      if (faviconn.getAttribute("name") == item.id) {
        faviconn.classList.replace("fa-regular", "fa-solid");
      }
    }
  }

  // console.log(favIcons);
  for (let favicon of favIcons) {
    console.log(favicon);
    favicon.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      console.log("salam");

      // let result = data.find((elem) => elem.id == favicon.getAttribute("name"));
      // favArr.push(result);
      // localStorage.setItem("fav", JSON.stringify(favArr));
      // favicon.classList.replace("fa-regular", "fa-solid");

      if (favicon.classList.contains("fa-solid")) {
        favicon.classList.replace("fa-solid", "fa-regular");
        favMealArr = favMealArr.filter(
          (elem) => elem.id != this.getAttribute("name")
        );
        localStorage.setItem("favMeal", JSON.stringify(favMealArr));
        // wishlistCount.textContent--;
      } else {
        let result = data.find(
          (elem) => elem.id == favicon.getAttribute("name")
        );
        // wishlistCount.textContent++;
        favMealArr.push(result);
        // wishlistCount.textContent++;
        localStorage.setItem("favMeal", JSON.stringify(favMealArr));
        favicon.classList.replace("fa-regular", "fa-solid");
      }
    });
  }
});
let toBeLogin = document.querySelector(".to-be-login");
let doneLogin = document.querySelector(".done-login");
let dontRegister = document.querySelector(".dont-register");
let logOutIcon = document.querySelector(".logOutIcon");
let localLoginArr = JSON.parse(localStorage.getItem("login"));
console.log(localLoginArr);
if (localLoginArr) {
  toBeLogin.classList.replace("d-block", "d-none");
  doneLogin.classList.replace("d-none", "d-block");
  dontRegister.classList.replace("d-block", "d-none");
  logOutIcon.classList.remove("d-none", "d-block");
  doneLogin.textContent = localLoginArr.username;
}
logOutIcon.addEventListener("click", function () {
  localStorage.removeItem("login");
});
