let usernameInp = document.querySelector(".login-username");
let passInp = document.querySelector(".login-password");
let userURL = "http://localhost:3000/users";
let loginBtn = document.querySelector(".login-btn");
// document.location.href= "loginhtml"

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios(userURL).then((res) => {
    let data = res.data;
    console.log(data);
    // console.log(usernameInp.value);
    data.forEach((elem) => {
      //   console.log(elem.email);
      if (
        elem.username == usernameInp.value &&
        elem.password == passInp.value
      ) {
        let obj = {};
        obj.username = usernameInp.value;
        obj.password = passInp.value;
        obj.balance = elem.balance;
        obj.email = elem.email;
        obj.id = elem.id;
        console.log(obj);
        document.location.href = "basket.html";
        localStorage.setItem("login", JSON.stringify(obj));
      }
    });
  });
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
