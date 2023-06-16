const buttons = document.querySelectorAll(".btnEdit");
const btnTambah = document.querySelector(".btn-tambah");
const btn = document.querySelectorAll(".close");
const dropdownKota = document.getElementById('dropdownKota');

function openModal(target) {
    document.getElementById(target).style.display = "flex";
}

function closeModal(target) {
    document.getElementById(target).style.display = "none";
}

function filterTableByKota() {
    const selectedKota = dropdownKota.value;
    const rows = document.querySelectorAll('table tbody tr');
    
    // console.log("Nilai selectedKota:", selectedKota);
    
    rows.forEach(row => {
        const kotaCell = row.querySelector('td:nth-child(4)');
        const kota = kotaCell.textContent.trim();

        // console.log("Nilai kota:", kota);

        if (selectedKota === "Semua" || kota === selectedKota) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

(function() {
    dropdownKota.addEventListener('change', filterTableByKota);

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