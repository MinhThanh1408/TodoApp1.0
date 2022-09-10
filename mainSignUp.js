const formSignUp = document.querySelector("#form-SignUp");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-password");
const confirmPassword = document.querySelector("#confirm-password");
const genderMale = document.querySelector("#male");
const genderFemale = document.querySelector("#female");
const genderOrther = document.querySelector("#orther");
var userGender = "";

const accountUser = {
  email:"", 
  password:"",
};

function getCookie(name){
  var nameSearchCookie = name + "=";
  var decodeCookie = decodeURIComponent(document.cookie);
  var ca = decodeCookie.split(';');
  for (var i=0; i< ca.length; i++){
      var c = ca[i];
      while (c.charAt(0)==" "){
          c = c.substring(1);
      }
      if(c.indexOf(nameSearchCookie) == 0){
          return c.substring(name.length+1, c.length);
      }
  } 
  return "";
}

function reloadData(){
  if(getCookie('SignInSucces') == 'true'){
      alert('Ban da dang nhap');
      window.location.href = "http://127.0.0.1:5500/SignIn.html";
  }else{
    alert('Moi ban dang ki');
  }

}



function setAccountUser(accountUser){
  localStorage.setItem("email", accountUser.email);
  localStorage.setItem("password", accountUser.password);
}

function getAccountUser(){
  const AccountUser = new Object();
  AccountUser.email = localStorage.getItem("email");
  AccountUser.password = localStorage.getItem("password");
  return AccountUser;
}



function showError(input, message) {
  var formGroup = input.parentElement;
  var errorMessage = formGroup.querySelector(".form-message");

  formGroup.classList.add("error");
  errorMessage.innerText = message;
}

function showSuccess(input) {
  var formGroup = input.parentElement;
  var errorMessage = formGroup.querySelector(".form-message");

  formGroup.classList.remove("error");
  errorMessage.innerText = "";
}

function checkEmpty(listInput) {
  var isEmpty = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();

    if (!input.value) {
      showError(input, "*Compulsory*");
      isEmpty = true;
    }
  });
  return isEmpty;
}
function checkEmail(input) {
  const EMAIL_REGEX =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  input.value = input.value.trim();
  var isEmail = EMAIL_REGEX.test(input.value);
  isEmail ? showSuccess(input) : showError(input, "*Syntax error*");
  console.log(isEmail);
  return isEmail;
}
function checkName(input) {
  const FULLNAME_REGEX = /^([a-zA-Z]{1,10})((\s{1}[a-zA-Z]{1,10}){1,4})$/;
  input.value = input.value.trim();
  var isFullName = FULLNAME_REGEX.test(input.value);
  isFullName ? showSuccess(input) : showError(input, "*Not a full name*");
  return isFullName;
}
function checkPassword(input, minLength, maxLength) {
  input.value = input.value.trim();
  if (input.value.length < minLength) {
    showError(input, `*Long than ${minLength} character*`);
    return false;
  }
  if (input.value.length > maxLength) {
    showError(input, `*Short than ${maxLength} character*`);
    return false;
  }
  showSuccess(input);
  return true;
}
function checkMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "*Not match password*");
    return false;
  }
  if (password.value === confirmPassword.value) {
    showSuccess(confirmPassword);
    return true;
  }
}
function checkGender(male, female, orther) {
  if (!male.checked && !female.checked && !orther.checked) {
    userGender = "";
    showError(male.parentElement.parentElement, "*Compulsory*");
    return true;
  }
  if (male.checked) {
    userGender = male.value;
    showSuccess(male.parentElement.parentElement);
    return false;
  }
  if (female.checked) {
    userGender = female.value;
    showSuccess(female.parentElement.parentElement);
    return false;
  }
  if (orther.checked) {
    userGender = orther.value;
    showSuccess(orther.parentElement.parentElement);
    return false;
  }
}

formSignUp.addEventListener("submit", function (e) {
  e.preventDefault(); // Hủy thao tác submit mặc định

  var isEmail = checkEmail(userEmail);
  var isFullName = checkName(userName);
  var isPassword = checkPassword(userPassword, 6, 12);
  var isMatchPassword = checkMatch(userPassword, confirmPassword);
  var isEmpty = checkEmpty([
    userEmail,
    userName,
    userPassword,
    confirmPassword,
  ]);
  var isEmptyGender = checkGender(genderMale, genderFemale, genderOrther);
  if (isEmpty || !isEmail || !isFullName || !isPassword || !isMatchPassword || isEmptyGender) {
    alert("Error");
  } else {
    alert("Finish");
    var storeAccount = new Object();
    storeAccount.email = userEmail.value;
    storeAccount.password = userPassword.value;
    setAccountUser(storeAccount);
    window.location.href = "http://127.0.0.1:5500/SignIn.html";
  }
});
