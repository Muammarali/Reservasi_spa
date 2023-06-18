
const optionMasker = document.getElementById('dropdownMasker');
const optionScrub = document.getElementById('dropdownScrub');
const optionBodyM = document.getElementById('dropdownOil');
const optionRefleksi = document.getElementById('checkboxRefleksi');

console.log(optionRefleksi);

(function() {
    optionMasker.addEventListener('change', () => {
        if (optionMasker.value.length != 0){
            optionBodyM.setAttribute('disabled', 'disabled');
            optionRefleksi.setAttribute('disabled', 'disabled');
        } else{
            optionBodyM.removeAttribute('disabled');
            optionRefleksi.removeAttribute('disabled');
        }
        console.log(optionMasker.value.length)
    });

    optionScrub.addEventListener('change', () => {
        if (optionScrub.value.length != 0){
            optionBodyM.setAttribute('disabled', 'disabled');
            optionRefleksi.setAttribute('disabled', 'disabled');
        } else{
            optionBodyM.removeAttribute('disabled');
            optionRefleksi.removeAttribute('disabled');
        }
    });

    optionBodyM.addEventListener('change', () => {
        if (optionBodyM.value.length != 0){
            optionMasker.setAttribute('disabled', 'disabled');
            optionScrub.setAttribute('disabled', 'disabled');
            optionRefleksi.setAttribute('disabled', 'disabled');
        } else{
            optionMasker.removeAttribute('disabled');
            optionScrub.removeAttribute('disabled');
            optionRefleksi.removeAttribute('disabled');
        }
    });

    optionRefleksi.addEventListener('change', () => {
        if (optionRefleksi.checked){
            optionMasker.setAttribute('disabled', 'disabled');
            optionScrub.setAttribute('disabled', 'disabled');
            optionBodyM.setAttribute('disabled', 'disabled');
            
        } else{
            optionMasker.removeAttribute('disabled');
            optionScrub.removeAttribute('disabled');
            optionBodyM.removeAttribute('disabled');
        }
        console.log(optionRefleksi.value)
    });
    
})();