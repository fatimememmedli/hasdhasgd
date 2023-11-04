let id = new URLSearchParams(location.search).get("id");
let detailBox = document.querySelector(".detail-box");
let url = "http://localhost:3000/singers";
console.log(id);
axios(url).then((res) => {
  let data = res.data;
  let detailElement = data.find((elem) => elem.id == id);
  console.log(detailElement);
  detailBox.innerHTML = `
  <div class="card" style="width: 37%">
        <div class="detail-image">
          <img
            src="${detailElement.imageLink}"
            class="card-img-top"
            alt="..."
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">${detailElement.name}</h5>
          <p class="card-text">
            ${detailElement.name} is <b>
            ${detailElement.nationality}
            </b>
          </p>
          <p>AGE: ${detailElement.age}</p>
          <p>GENRE: ${detailElement.genre}</p>
          <a href="./singer.html" class="btn btn-outline-primary">Home</a>
        </div>
      </div>
  `;
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
