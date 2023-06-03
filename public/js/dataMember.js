const modalBtn = document.getElementById("modalBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("myModal");
const modalClose = document.getElementById("modalClose");

console.log(modalBtn);

(function() {
    modalBtn.addEventListener('click', () => {
        modalOverlay.style.display = "block";
        modal.style.display = "block";
    })

    modalClose.addEventListener('click', () => {
        modalOverlay.style.display = "none";
        modal.style.display = "none";
    })

    window.addEventListener('click', () => {
        if (event.target == modalOverlay) {
            modalOverlay.style.display = "none";
            modal.style.display = "none";
        }
    })
})();