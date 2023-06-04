const iconEye = document.querySelector("form .input-form .showPassword i");
let password = document.querySelectorAll("form .input-form input[name=password]");

function changeType(){
    if(iconEye.matches('.fa-regular') == true){
        iconEye.classList.remove('fa-regular');
        iconEye.classList.add('fa-solid');
        iconEye.classList.add('fa-fade');
        password[0].type = 'text';
    } else if (iconEye.matches('.fa-solid') == true){
        iconEye.classList.remove('fa-solid');
        iconEye.classList.remove('fa-fade');
        iconEye.classList.add('fa-regular');
        password[0].type = 'password';
    }
    // console.log(iconEye.matches('.fa-regular'))
}

(function(){

    iconEye.addEventListener('click', () => {
        changeType();
    });

})();