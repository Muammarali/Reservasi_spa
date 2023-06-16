const buttons = document.querySelectorAll(".btnEdit");
const btn = document.querySelectorAll(".close");

function openModal(target) {
    document.getElementById(target).style.display = "flex";
}

function closeModal(target) {
    document.getElementById(target).style.display = "none";
}

(function() {

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var target = button.getAttribute("data-target");
            openModal(target);
            console.log(button)
        });
    });


    btn.forEach(function(button) {
        button.addEventListener("click", function() {
            var target = button.getAttribute("data-target");
            closeModal(target);
        });
    });

})();