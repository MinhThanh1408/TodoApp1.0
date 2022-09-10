const formSignIn = document.querySelector('#form-SignIn');
const userEmail = document.querySelector('#user-email');
const userPassword = document.querySelector('#user-password');

function showError(input, message){
    var formGroup = input.parentElement;
    var errorMessage = formGroup.querySelector('.form-message');
    
    formGroup.classList.add('error');
    errorMessage.innerText = message;
};

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

function showSuccess(input){
    var formGroup = input.parentElement;
    var errorMessage = formGroup.querySelector('.form-message');
    
    formGroup.classList.remove('error');
    errorMessage.innerText ="";
};

function checkEmpty(listInput){
    var isEmpty = false;
    listInput.forEach(input =>{
        input.value = input.value.trim();

        if(!input.value){
            showError(input,'*Compulsory*');
            isEmpty = true;
        }
    });
    return isEmpty;
}
function checkEmail(input){
    const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    input.value = input.value.trim();
    var isEmail = EMAIL_REGEX.test(input.value);
    isEmail ? showSuccess(input) : showError(input,'*Syntax error*');
    return isEmail;
}
function checkPassword(input, minLength, maxLength){
    input.value=input.value.trim();
    if(input.value.length < minLength){
        showError(input,`*Long than ${minLength} character*`);
        return false;
    }
    if(input.value.length > maxLength ){
        showError(input,`*Short than ${maxLength} character*`);
        return false;
    }
    showSuccess(input);
    return true;
}

function checkAccount(userEmail, userPassword){
    if(userEmail.value.trim() === localStorage.getItem('email') && userPassword.value.trim() === localStorage.getItem('password')){
        return true;
    }else{
        showError(userEmail, '*Maybe the email is incorrect*');
        showError(userPassword, '*Maybe the password is incorrect*');
        return false;
    }
}

function setCookieData(email, password){
    document.cookie = "userEmail=" + email.value;
    //"; path=http://127.0.0.1:5500/";
    document.cookie = "userPassword=" + password.value
    //"; path=http://127.0.0.1:5500/";
}

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

function checkRemember(){
    var isRemember = document.querySelector('#remember');
    if(isRemember.checked){
        setCookieData(userEmail, userPassword);
        document.cookie = "remember=true";
    }else{
        document.cookie = "remember=false";
    }

}

function getCookieData(){
    document.querySelector("#user-email").value = getCookie("userEmail");
    document.querySelector("#user-password").value = getCookie("userPassword");
}

function removeCookieData(){
    document.querySelector('#user-email').value = "";
    document.querySelector("#user-password").value = "";
}

function reloadData(){
    if(getCookie('remember') == 'true'){
        getCookieData();   
        document.querySelector("#remember").checked=true;
        document.querySelector("#button-SignIn").disabled=true;
        document.querySelector("#button-LogOut").disabled=false;
    }
    if(getCookie('remember') == 'false'){
        removeCookieData();
        document.querySelector("#button-LogOut").disabled = true;
    }
}


function logOutAccount(){
    formSignIn.addEventListener('click', function(e){
        document.cookie ='remember=false';
        document.cookie = "SignInSucces=false";
        reloadData();
    })
    
}

function signInAccount(){
formSignIn.addEventListener('submit',function(e){
    e.preventDefault();// Hủy thao tác submit mặc định

    var isEmail = checkEmail(userEmail);
    var isPassword = checkPassword(userPassword,6 ,12);
    var isEmpty = checkEmpty([userEmail,userPassword]);
    var isUserAccount = checkAccount(userEmail,userPassword);

    if( isEmpty || !isEmail || !isPassword || !isUserAccount){
        alert('Error');
    }else{
        checkRemember();
        document.cookie = "SignInSucces=true";
        alert('Finish');

        window.location.href = "http://127.0.0.1:5500/TodoList.html";
    }
})
}
