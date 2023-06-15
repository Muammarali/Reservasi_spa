const buttons = document.querySelectorAll(".btnEdit");
const buttonsReject = document.querySelectorAll(".btnReject");
const btn = document.querySelectorAll(".close");

console.log(buttonsReject)

function openModal(target) {
    console.log(target)
    document.getElementById(target).style.display = "flex";
}

function closeModal(target) {
    document.getElementById(target).style.display = "none";
}

(function() {

    buttons.forEach(function(button) {
        console.log(button)
        button.addEventListener("click", function() {
            let target = button.getAttribute("data-target");
            openModal(target);
        });
    });

    buttonsReject.forEach(function(button) {
        console.log(button)
        button.addEventListener("click", function() {
            let target = button.getAttribute("data-target");
            openModal(target);
        });
    });

    console.log(btn)

    btn.forEach(function(button) {
        button.addEventListener("click", function() {
            let target = button.getAttribute("data-target");
            closeModal(target);
        });
    });

})();
