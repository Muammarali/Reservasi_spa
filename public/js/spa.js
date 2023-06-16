var currentPage = window.location.pathname;
var maskerButton = document.querySelector('.pindah .btn-masker');
var scrubButton = document.querySelector('.pindah .btn-scrub');
const buttons = document.querySelectorAll(".btnEdit");
const btnTambah = document.querySelector(".btn-tambah");
const btn = document.querySelectorAll(".close");

if (currentPage.includes('/spaMasker')) {
  maskerButton.classList.add('active');
} else if (currentPage.includes('/spaScrub')) {
  scrubButton.classList.add('active');
}

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

    btnTambah.addEventListener("click", () => {
        var target = btnTambah.getAttribute("data-target");
        openModal(target);
    });

})();