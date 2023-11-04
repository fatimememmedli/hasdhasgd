let registerUsernameInp = document.querySelector(".register-username");
let registerEmailInp = document.querySelector(".register-email");
let registerPassInp = document.querySelector(".register-password");
let error = document.querySelector(".sameUsername");
let registerForm = document.querySelector(".register-form");
let registerBalance = document.querySelector(".register-balance");
let userURL = "http://localhost:3000/users";
let registerBtn = document.querySelector(".register-btn");
// registerUsernameInp.addEventListener("submit", function (e) {
//   e.preventDefault();
// });
// console.log("salam");
registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  //   console.log(registerUsernameInp.value);
  // axios(userURL).then((res) => {
  // let data = res.data;
  // console.log(data);
  // });
  // axios.post(userURL, {
  //   email: registerEmailInp.value,
  //   username: registerUsernameInp.value,
  //   password: registerPassInp.value,
  //   balance: registerBalance.value,
  //   order: [{}],
  // });
  // registerUsernameInp.value = "";
  // registerEmailInp.value = "";
  // registerPassInp.value = "";
  // document.location.href = "login.html";

  if (registerUsernameInp.value.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Username must be greater than 3!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }
  if (
    registerUsernameInp.value.length == 0 ||
    registerBalance.value.length == 0 ||
    registerEmailInp.value.length == 0 ||
    registerPassInp.value.length == 0
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "İnput is empty!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  } else {
    if (registerBalance.value > 0) {
      axios(userURL).then((res) => {
        let data = res.data;
        data.forEach((elem) => {
          if (elem.username == registerUsernameInp.value) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "This username is already used!",
              footer: '<a href="">Try another username!</a>',
            });
            document.location.href = "register.html";
          } else {
            axios.post(userURL, {
              email: registerEmailInp.value,
              username: registerUsernameInp.value,
              password: registerPassInp.value,
              balance: +registerBalance.value,
              order: [{}],
            });

            document.location.href = "login.html";
          }
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "the balance cannot be negative!",
        footer: '<a href="">Try another username!</a>',
      });
    }
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
