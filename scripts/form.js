const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const formLogin = document.getElementById("formLogin");

const par = document.getElementById("textLoginAlert");
const bc = document.getElementById("submitRegister");
const alertRegister = () => {
  Swal.fire({
    title: "Registro realizado",
    allowOutsideClick: false,
    stopKeydownPropagation: false,
  });
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  let warnings = "";
  par.innerHTML = "";
  enter = false;
  if (name.value.length < 3) {
    warnings += "Name not valid <br>";
    console.log("f");
  }
  let rgxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  if (!rgxEmail.test(email.value)) {
    warnings += "e-mail not valid <br>";
    enter = true;
  }

  if (password.value.length < 8) {
    warnings += "pass not valid <br>";
    enter = true;
  }

  if (enter) {
    par.innerHTML = warnings;
  } else {
    alertRegister();
    par.innerHTML = "We send you a email! <br>";
  }
});
