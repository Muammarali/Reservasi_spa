let password = document.querySelectorAll("form .input-form input[name=password]");
let retypepassword = document.querySelectorAll("form .input-form input[name=retypepassword]");
const iconValid = document.querySelector("form .input-form .isValid")
const iconRetypeValid = document.querySelector("form .input-form .isRetypeValid")
const iconRetypeNotValid = document.querySelector("form .input-form .isRetypeNotValid")

console.log(iconValid)

function checkValid(password){
    if (password[0].value.length > 1){
        iconValid.style.display = "block";
    } else {
        iconValid.style.display = "none";
    }
}

function checkValidity(password, retype){
    if (password[0].value == retype[0].value){
        if(password[0].value.length != 0 && retype[0].value.length != 0){
            iconRetypeValid.style.display = "block";
            iconRetypeNotValid.style.display = "none";
        }   
        // } else{
        //     iconRetypeNotValid.style.display = "none";
        //     iconRetypeValid.style.display = "none";
        // }
        
    } else if (password[0].value != retype[0].value && retype[0].value != 0){
        iconRetypeNotValid.style.display = "block";
        iconRetypeValid.style.display = "none";
    } else{
        iconRetypeNotValid.style.display = "none";
        iconRetypeValid.style.display = "none";
    }
    console.log(retype[0].value)
}

(function(){

    password[0].addEventListener('keyup', () => {
        checkValid(password);
    });

    retypepassword[0].addEventListener('keyup', () => {
        checkValidity(password, retypepassword)
    })
})();