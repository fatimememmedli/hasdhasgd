let idMeal = new URLSearchParams(location.search).get("id");
let detailBox = document.querySelector(".detail-box");
console.log(idMeal);
let mealURL = "http://localhost:3000/meals";
axios(mealURL).then((res) => {
  let data = res.data;
  console.log(data);
  let meal = data.find((elem) => elem.id == idMeal);

  detailBox.innerHTML = `
    <div class="card" style="width: 37%">
          <div class="detail-image">
            <img
              src="${meal.imageLink}"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h5 class="text-center card-title"> ${meal.name}</h5>
            <p class="text-center card-text">
              PRICE:${meal.price}

            </p>
            <p>Ingredients </p>
            <div class="ingredients mb-3">
          </div>
          </div>
          <div class="py-2 px-3">
          <a href="./singer.html" class="btn btn-outline-primary me-2">Home</a>

          <button type="button" class="btn btn-outline-danger me-2">
                  <i  name="${meal.id}" class="fav-icon fa-regular fa-heart"></i>
                </button>
                <button name=${meal.id} type="button" class="basket-btn btn btn-outline-primary">
            <i class="fa-solid fa-basket-shopping"></i>
          </button>
          </div>
        </div>
    `;

  let favicon = document.querySelector(".fav-icon");
  console.log(favicon);
  let favMealArr = [];
  let localFavArr = JSON.parse(localStorage.getItem("favMeal"));
  if (localFavArr) {
    favMealArr = [...localFavArr];
  }
  for (let item of favMealArr) {
    if (favicon.getAttribute("name") == item.id) {
      favicon.classList.replace("fa-regular", "fa-solid");
    }
  }
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
      let result = data.find((elem) => elem.id == favicon.getAttribute("name"));
      // wishlistCount.textContent++;
      favMealArr.push(result);
      // wishlistCount.textContent++;
      localStorage.setItem("favMeal", JSON.stringify(favMealArr));
      favicon.classList.replace("fa-regular", "fa-solid");
    }
  });

  let basketbtn = document.querySelector(".basket-btn");
  //   console.log(basketBtns);
  let basketArr = [];
  let localBasket = JSON.parse(localStorage.getItem("basket"));
  if (localBasket) {
    basketArr = [...localBasket];
  }

  basketbtn.addEventListener("click", function () {
    console.log("salam");
    console.log(data);

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

  let ingredientsBox = document.querySelector(".ingredients");

  for (let ing of meal.ingredients) {
    ingredientsBox.innerHTML += `
    <div class="ing-item">${ing}</div>
    
    `;
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
